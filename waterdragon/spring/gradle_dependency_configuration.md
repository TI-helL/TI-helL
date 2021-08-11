# gradle depencency configuration
gradle을 사용하여 프로젝트에 의존성을 설정할때 특정 범위를 설정해 줄수 있고 이 범위는 gradle dependency configuration이라고 함

- implementation: 의존 라이브러리 수정시 본 모듈까지만 재빌드

    - 본 모듈을 의존하는 모듈은 해당 라이브러리의 api 를 사용할 수 없음

- api: 의존 라이브러리 수정시 본 모듈을 의존하는 모듈들도 재빌드

    - 본 모듈을 의존하는 모듈들도 해당 라이브러리의 api 를 사용할 수 있음

- compileOnly: compile 시에만 빌드하고 빌드 결과물에는 포함하지 않음

    - runtime 시 필요없는 라이브러리인 경우 (runtime 환경에 이미 라이브러리가 제공되고 있는가 하는 등의 경우)

    - 참고: https://blog.gradle.org/introducing-compile-only-dependencies

- runtimeOnly: runtime 시에만 필요한 라이브러리인 경우

- annotationProcessor: annotation processor 명시 (gradle 4.6)

    - 참고: https://docs.gradle.org/4.6/release-notes.html, 
https://blog.gradle.org/incremental-compiler-avoidance#about-annotation-processors 

    - Annotation processing 이 필요없다고 예측되는 경우 빌드 제외

- compile : 의존하는 모든 모듈을 재빌드 (deprecated)