# Spring Cloud Data Flow Simple Stream Example
간단하게 stream application을 만들어보자

- application 추가
![스크린샷 2021-08-13 오전 10 14 01](https://user-images.githubusercontent.com/24540286/129305791-e9541e96-a73d-4bf4-92fa-de2d70b29b41.png)
![스크린샷 2021-08-13 오전 10 14 28](https://user-images.githubusercontent.com/24540286/129305808-418cd9d7-7f5b-4706-8f59-fbdc79692997.png)
![스크린샷 2021-08-12 오후 5 49 18](https://user-images.githubusercontent.com/24540286/129305845-94ab999d-6213-473f-b80c-af12019c7971.png)


- stream pipeline 생성
![스크린샷 2021-08-13 오전 10 16 15](https://user-images.githubusercontent.com/24540286/129305901-bbbb324b-0399-4031-876d-95e507cd8120.png)

- "file | file"로 싱크를 맞추는 stream pipeline 생성 
![스크린샷 2021-08-13 오전 10 16 48](https://user-images.githubusercontent.com/24540286/129305938-4e94dbba-4317-46f9-b8ff-c6be08e820d1.png)

- option 설정
![스크린샷 2021-08-13 오전 10 17 55](https://user-images.githubusercontent.com/24540286/129306024-77c84298-af28-4a59-a3a0-f103044f4b55.png)
![스크린샷 2021-08-13 오전 10 18 39](https://user-images.githubusercontent.com/24540286/129306064-8a02d32f-48e6-4d6e-8054-d433161113ef.png)

- stream 생성
![스크린샷 2021-08-13 오전 10 22 07](https://user-images.githubusercontent.com/24540286/129306102-4ca87b70-8c9f-4d6f-b242-89fdf5b2ef62.png)
![스크린샷 2021-08-13 오전 10 22 39](https://user-images.githubusercontent.com/24540286/129306122-f9b387a6-ff33-451d-9f8e-62dbcd6f7d54.png)

- stream deploy 설정
![스크린샷 2021-08-13 오전 10 25 22](https://user-images.githubusercontent.com/24540286/129306158-08c8b794-4b41-4a77-abc4-10efcf97a399.png)
    - infile directory 경로는 /home/cnb/scdf/input로 설정(아래 사진은 잘못된 사진)
![스크린샷 2021-08-13 오전 10 26 37](https://user-images.githubusercontent.com/24540286/129306180-4b0d0bef-41b8-4d01-831e-19e59cac28f6.png)
![스크린샷 2021-08-13 오전 10 27 09](https://user-images.githubusercontent.com/24540286/129306303-a8f006f7-e2ce-4fdd-ae2e-f24ba127a0ee.png)
![스크린샷 2021-08-13 오전 10 28 13](https://user-images.githubusercontent.com/24540286/129306372-0afc694e-7ff6-405c-a3ea-b774c06d42be.png)

- 실행확인 (처음에는 cat > 명령으로 파일을 생성하여 실행했으나 cat > 명령의 ctl + c 에서 파일 생성 실패로 간주하여 싱크를 맞추지 못하는 이슈가 있었음 이는 docker와 마운트된 host pc에서 vim으로 파일을 생성할 경우 정상 실행됨)
<img width="539" alt="스크린샷 2021-08-13 오전 11 57 01" src="https://user-images.githubusercontent.com/24540286/129306461-cfb64191-9662-4698-9b0e-5da3e34f9ecb.png">
<img width="266" alt="스크린샷 2021-08-13 오후 12 00 44" src="https://user-images.githubusercontent.com/24540286/129306492-4a406681-1fbf-4b39-a51f-269db542029a.png">
<img width="265" alt="스크린샷 2021-08-13 오후 12 01 24" src="https://user-images.githubusercontent.com/24540286/129306497-5b96dd44-e133-498d-b542-a8ea5939f47b.png">
<img width="307" alt="스크린샷 2021-08-13 오후 12 01 38" src="https://user-images.githubusercontent.com/24540286/129306501-b238bde3-769c-44b4-8564-091e5507dbaa.png">