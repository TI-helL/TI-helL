# ConfigMap
k8s 위에서 Spring cloud를 구축하다보니 pod에서 사용하는 환경변수들이 많이 겹치는 현상이 발생했다. 마이크로 서비스의 수가 증가하면서 설정해야하는 환경변수의 수고 급격히 증가하였고 이에 따라 관리가 어려워 졌다. <br>
configmap은 키-값 쌍으로 기밀이 아닌 데이터를 저장하는 데 사용하는 API 오브젝트이다. 파드는 볼륨에서 환경 변수, 커맨드-라인 인수 또는 구성 파일로 configmap을 사용할 수 있다.  
configmap은 spec이 있는 대부분의 쿠버네티스 오브젝트와 달리, 컨피그맵에는 data 및 binaryData 필드가 있다. 이러한 필드는 키-값 쌍을 값으로 허용한다. 다음은 configmap의 예시이다.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: game-demo
data:
  # 속성과 비슷한 키; 각 키는 간단한 값으로 매핑됨
  player_initial_lives: "3"
  ui_properties_file_name: "user-interface.properties"

  # 파일과 비슷한 키
  game.properties: |
    enemy.types=aliens,monsters
    player.maximum-lives=5    
  user-interface.properties: |
    color.good=purple
    color.bad=yellow
    allow.textmode=true    
```

이와 같이 정의된 configmap은 pod에서 다음과 같이 사용할 수 있다.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: configmap-demo-pod
spec:
  containers:
    - name: demo
      image: alpine
      command: ["sleep", "3600"]
      env:
        # 환경 변수 정의
        - name: PLAYER_INITIAL_LIVES # 참고로 여기서는 컨피그맵의 키 이름과
                                     # 대소문자가 다르다.
          valueFrom:
            configMapKeyRef:
              name: game-demo           # 이 값의 컨피그맵.
              key: player_initial_lives # 가져올 키.
        - name: UI_PROPERTIES_FILE_NAME
          valueFrom:
            configMapKeyRef:
              name: game-demo
              key: ui_properties_file_name
      volumeMounts:
      - name: config
        mountPath: "/config"
        readOnly: true
  volumes:
    # 파드 레벨에서 볼륨을 설정한 다음, 해당 파드 내의 컨테이너에 마운트한다.
    - name: config
      configMap:
        # 마운트하려는 컨피그맵의 이름을 제공한다.
        name: game-demo
        # 컨피그맵에서 파일로 생성할 키 배열
        items:
        - key: "game.properties"
          path: "game.properties"
        - key: "user-interface.properties"
          path: "user-interface.properties"
```