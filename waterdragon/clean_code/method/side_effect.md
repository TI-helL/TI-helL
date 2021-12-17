# 함수를 사이드 이펙트를 발생시켜서는 안된다. 

아래 함수는 사이드 이펙트를 그것도 아주 크리티컬한 사이드 이펙트를 발생시킨다.

```java
public class UserVilidator{
    private Cryptographer cryptographer;

    public boolean checkPassword(String userName, String password){
        User user = UserGateway.findByName(userName);
        if(user != User.NULL){
            String codedPharse = user.getPharseEncodedByPassword();
            Srping pharse = cryptographer.decrypt(codedPharse, password);
            if("Valid Password".equals(pharse)){
                Session.initialize();
                return true;
            }
        }
        return false;
    }
}
````

위 코드는 패스워드가 일치 하지 않을 경우 세션을 초기화 시킨다. 이는 다시 말해 세션을 초기화 해도 괜찮은 경우에만 호출해야 한다. 위 코드같은 경우 함수의 이름을 checkPasswordAndInitializeSession으로 변경하여 함수 호출의 경우 세션이 초기화 되는 것을 알려주어야 한다. 