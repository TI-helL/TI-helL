# Spring 5 non-blocking
Spring 5가 되면서 클라이언트의 요청에 별도의 thread를 생성하지 않고 buffer를 두어 요청을 받고 뒤에서 그 요청을 처리하는 여러개의 thread를 두는 방식을 사용한다. 약간 node.js를 따라가는 거 같은 느낌이다.

# Mono
Mono는 Spring Reactor에서 0 또는 1 개의 결과만을 처리하기 위한 객체이이며 처리 방식은 다음과 같다.

![다운로드](https://user-images.githubusercontent.com/24540286/136570139-1e4bf38b-5d60-4e12-8a53-445379680785.png)
