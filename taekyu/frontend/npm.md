# npm 요약

node package manager

모듈을 쉽게 다운받게 해줄수 있는 도구

package.json

package.josn 파일은 프로젝트에 대한 정보를 갖고 있는 파일이다. dependencies와 같은 속성을 활용하여 프로젝트에 의존된 라이브러리를 관리한다.

dependencies

프로젝트에 사용하는 모듈을 기술하는 부분, 이 프로젝트가 어떤 모듈을 사용하는지 한눈에 볼 수 있다.

devDependencies

개발할 때만 의존하는 모듈을 관리한다.

node_modules

node_modules 디렉토리는 package.json에 설치된 모듈 뿐만 아니라, package.json에 있는 모듈이 의존하고 있는 package-lock.json 모듈도 전부 설치된 디렉토리이다.

package-lock.json

프로젝트에 설치된 모듈들의 의존성 트리를 기록하고 있으며, package-lock.josn 파일을 참고하여 node_modules 디렉토리안에 모듈을 다운받는다.

명령어

npm i(install) <패키지명>

npm i —save - dependencies에 설치함 5버전 부터는 디폴트로 —save옵션 적용(이제 안써도됨)

npm i —save-dev - devDependencies에 추가 CLI이 같은건 여기다 다운 받으면 됨

npm i -g 전역 설치

npm install —productuon - devDependencies제외하고 실제 프로덕트 용도만 설치

깃헙에 node_modules를 옮기는건 비효율적 npm install을 하면 pakage,josn파일을 참고하여 다시 node_modules가 설치된다.
