# Azure key vault를 사용하여 암호화에 필요한 key 관리하기
- key를 애플리케이션에 하드코딩할 경우 보안상 문제가 있음
- Azure key vault는 새로운 저장소와 키를 프로비저닝 하거나 HSM(Hardware Security Module)에서 키를 가져와 중앙에서 키, 비밀, 정책을 관리하는 Azure의 서비스이다. 
- Spring boot 애플리케이션에 Azure key vault를 적용하기 위해 [spring boot Azure key vault](https://docs.microsoft.com/ko-kr/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-key-vault) 를 시도하였으나 로그인한 사용자의 client-id, client-key, tenant-id를 입력해도 정상적으로 작동하지 않았음
- 그래서 찾아봤더니 먼저 [Azure Application을 만들고](https://docs.microsoft.com/ko-kr/azure/active-directory/develop/howto-create-service-principal-portal) 그 Application을 통해서 접근을 해야한다고 한다
- Azure application은 Active Directory에서 생성 할 수 있다

  ![image](https://user-images.githubusercontent.com/24540286/131656551-a3ef6ad9-2598-4da7-af77-32577de1093e.png)

- application을 생성 하였다면 개요에서 client-id, tenent-id를 확인 할 수 있다.
- 또한 관리의 인증서 및 암호에서 client-key를 생성 할 수 있다.

   ![image](https://user-images.githubusercontent.com/24540286/131656737-23ef460d-9f0e-408c-998d-91dbd7c9a6c0.png)
   
   
- client-id, client-key, tenent-id 까지 발급 완료 되었다면 이제 [key-vault에서 엑세스 권한을 설정](https://docs.microsoft.com/ko-kr/azure/security-center/tutorial-security-policy)해야 한다.
 
- 권한 설정을 완료하면 [spring boot Azure key vault](https://docs.microsoft.com/ko-kr/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-key-vault) 이 예제를 시도하여 Azure 로부터 키를 전송 받을 수 있다.
