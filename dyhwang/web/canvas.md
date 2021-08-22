# CANVAS

## 랜더링 엔진

1.randering engine 에서 돔 파싱, css파싱, 레이아웃 트리 생성

2.레이아웃팅으로 위치와 사이즈를 결정, 레이어라이제이션으로 그리는 순서를 결정

트리구조의 자료구조로 모양, 위치, 순서, 크기를 담은 정보를 반환

즉 그 요소를 어떻게 그릴지는 브라우저가 결정을 한다

Canvas 역시 요소이지만 이 안을 채우는건 브라우저가 결정을 하는것이 아닌 개발자가 작성한 js코드에 의해서 내부가 어떻게 그려지는지 결정한다.

컨버스가 그림을 그리는 순서

브라우저 렌더링엔진은 캔버스의 요소를 파싱 한 후 js엔진에게 캔버스와 관련된 스크립트의 해석을 요청한다. 그럼 엔진은 해석결과를 브라우저에게 반환하고 브라우저엔진은 skia라는 2d그래픽 엔진에게 캔버스에 드로우를 요청한다.

## Canvas 애니메이션의 문제점

캔버스는 애니메이션을 목적으로 만들어짐

V-sync timeline안에 모든 드로잉을 끝내야 한다.

즉 위의 과정을 16.7ms(60fps)만에 처리해야 한다.

Requestanimationframe(draw)를 재귀적으로 호출하면서 v-sync에연동하여 애니매이션을 랜더링한다.

만약 16.7ms안에 랜더링을 못한다면 프레임이 드랍되는 문제점이 발생한다.

그래서 위의 과정들로 바쁜 메인스레드가 아닌 다른곳에서 랜더링을 하여 문제를 해결하는 방법을 도출해 내야한다.

개선을 위해서 dom, js를브라우저 입장에서 건들기 힘들다 이는 메인스레드나 싱글스레드에서 돌기때문에 건들기 힘들고

드로우 부분을 건드려야 하는데...

그림 그리는 부분을 raster thread에 위임 한 후 나중에 결과를 합친다.

메인스레드는 canvasjs를 req raster를 통해 raster thread에 페인팅을 위임한다.

## Webgl에 렌더링 위임

Opgles로 연결된 메서드에 위임되기 때문에 skia를 호출하는 횟수가 상대적으로 줄어든다.

보통 background canvas에서 그림을 그리고 normal canvas에 그결과를 blit하는형식으로 그림을 그린다.

## OffscreenCanvas

V8과 브라우저 렌더링 엔진을 바인딩 하는걸 v8바인딩이라 한다. 이 바인딩을 왔다갔다 하는 오버헤드와 gpu가속과 skia내부를 왔다갔다 하는 오버헤드가 상당히 크다

새로운 방법으로 다른 스레드에서 js와skia를 다른 스레드에서 실행시키고자 함

Webworker이 대안이 될수 있지만 canvas dom에 엑세스 할 수 없기 때문에 canvas와 돔을 분리시키고자 하였고

이게 offscreenCanvas이다. OffscreenCanvas는 돔과는 별개의 개념이므로 worker에서 실행 가능하고 기존의 canvas로직은 고치지 않고 thread만 옮겨서 그대로 수행 가능하기 때문에 기존 코드 재사용성도 좋다.

런타임플래그?

이렇게 되면 main thread는 돔 렌더링만 신경을 쓸 수 있고

Worker thread에서 캔버스 랜더링과 skia 오버헤드를 처리한다.

Skia에서 gpu가속을 쓰게되면 다시 분산이 된다.

## How?

TransferControlToOffscreen()로 오브젝트를 획득한다.

이 오브젝트는 메인과 워커 스레드를 왔다갔다 할 수 있고 돔의 캔버스 백버퍼와 연결되어 캔버스간 연결이 된다.

워커를 생성하고 워커스레드에 오브젝트를 넘겨주면

워커스레드에서는 메시지 핸들러를 생성하고 캔버스를 넘겨받아 돔 캔버스와 마찬가지로 js코드로 그림을 그릴 수 있다.

## Zero-copy

애니메이션의 문제를 해결하기 위해 백그라운드 캔버스를 사용하는 경우가 있는데 이 경우 프레젠테이션 캔버스와 백그라운드 캔버스간 버퍼 복사가 필요하다.

그래서 백그라운드 캔버스를 offscreen으로 생성한 후 워커 스레드에서 그림을 그린다음 transferToTimageBitmap을하게되면 버퍼의 포인터만 전달하여 gpu상에있는 메모리를 그대로 프레젠테이션 캔버스 버퍼에 컨포지팅 하여 빠르게 그릴 수 있다.

## Multiview Rendering

Webgl로 컨텍스트를 초기화한 offscreen캔버스를 zero-copy와 마찬가지의 방법으로 프레젠테이션 캔버스에 그려준 후 offscreen캔버스를 로테이트후 다시 다른 캔버스에 그려주면 멀티뷰 랜더링이 효율적으로 가능하다.

## Bitmaprenderer

위의 방법에서 사용되는 프레젠테이션 캔버스의 경우

Const presentationCanvas = document.getElementById(‘canvas’);

Const presentationContext = presentationCanvas.getContext(‘2d’);

의 방법으로 컨텍스트를 생성하였지만

Const presentationContext = presentationCanvas.getContext(‘bitmaprenderer’)

로 생성하게 되면

기존에 transferToImageBitmap() 으로 포인터를 받아와 drawImage를 하게되면 그리기 위한 자체적인 백버퍼를 가지고 그 백버퍼에 그려야 한다.

하지만 bitmaprenderer는 자체적인 백버퍼가 아닌 포인터를 그대로 사용하여 static한 이미지를 보여주기 때문에 효율이 개선된다.

PresentiationContext.transferFromImageBitmap(snapshot)

DrawImage의 분석이 필요. 정확히 버퍼간 복사가 어떻게 일어나는지 static bitmap을 사용하면 복사의 효율이 개선된다고 하는데 이게 어떤식으로 개선되는지 이해가 필요