# Spring PasswordEncoder

- Spring Security에서 비밀번호 암호화에 사용할 수 있도록 PasswordEncoder 인터페이스를 제공하고 있음
- Spring Security에서는 다양한 암호화 알고리즘을 제공하고 있음
- 현재 bcrypt 알고리즘을 사용하는게 가장 좋고 SHA-256은 deprecated가 걸려있음
- PasswordEncoder를 implement하여 개발자가 구현한 알고리즘을 사용할수도 있음
- PasswordEncoder를 사용하기 위해선 @Configure 어노테이션이 걸려있는 클래스에서 @Bean으로 등록해줘야 함 
  
    ![image](https://user-images.githubusercontent.com/24540286/131985483-a274b919-a11b-44d0-94ca-b6d8843c54db.png)
