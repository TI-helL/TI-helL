# 젠킨스 jkd 버전 설정하기
새로운 프로젝트의 ci 파이프라인을 작성하다가 젠킨스가 설치되어 있는 서버의 jdk 버전과 프로젝트에서 사용하는 java의 버전이 호환이 되지 않아 build가 되지 않는 문제가 발생하였다. 

## 해결하기
- 현재 jenkins의 jdk version은 11로 설정되어 있으나 어째서인지 빌드할때는 1.8을 사용중
  <img width="757" alt="스크린샷 2021-12-29 오후 9 54 43" src="https://user-images.githubusercontent.com/24540286/147665275-a6a208b6-2b0c-4313-8c03-489ec7ff8208.png">

- 빌드시 jenkins의 java version을 사용하도록 groovy 작성
```groovy
node{
    jdk = tool name: 'openjdk-11.0.1'
    env.JAVA_HOME = "${jdk}"
    echo "jdk installation path is: ${jdk}"
    ...
}
```
위와 같이 설정하면 젠킨스 빌드시 java사용 가능