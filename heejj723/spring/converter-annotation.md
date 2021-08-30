# Spring @Convert annotation 과 Attribute Converter, AES 암호화



1. 민감정보 테이블 필드를 암호화하여 저장 할 필요가 있었음
2. 해당 테이블의 필드 타입이 많았으나 우선은 String Type Encrypter 를 작성함.

```java
public static String alg = "AES/CBC/PKCS5Padding";
    private static final String key = "01234567890123456789012345678901";
    private static final String iv = key.substring(0, 16); // 16byte


    public static String encrypt(String rawData) throws Exception{
        Cipher cipher = Cipher.getInstance(alg);
        SecretKeySpec keySpec = new SecretKeySpec(iv.getBytes(), "AES");
        IvParameterSpec ivParameterSpec = new IvParameterSpec(iv.getBytes());
        cipher.init(Cipher.ENCRYPT_MODE, keySpec, ivParameterSpec);

        byte[] encrypted = cipher.doFinal(rawData.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encrypted);
    }
```

대충 이렇게 작성했다.
cipherText 를 AES256 으로 암호화, 복호화 하는 Util Class 작성 (복호화 코드는 생략)

```java
@Slf4j
@Converter
public class StringCryptoConverter implements AttributeConverter<String, String> {

  @Override
  public String convertToDatabaseColumn(String attribute) {
    if (attribute == null) return null;
    try {
      return EncryptionUtil.encrypt(attribute);
    } catch (Exception e) {
      throw new Exception(ErrorCode.INTERNAL_SERVER_ERROR);
    }
  }

  @Override
  public String convertToEntityAttribute(String dbData) {
      try {
          return EncryptionUtil.decrypt(dbData);
        } catch (Exception e) {
          throw new Exception(ErrorCode.INTERNAL_SERVER_ERROR);
        }
  }
}
```

일단 `AttributeConverter` 를 상속해서,
`convertToDatabaseColumn`, `convertToEntityAttribute` 를 오버라이딩 해준다.
이름에서 알 수 있듯이 전자에는 dbColumn 으로 매핑 전 해줄 일을, 후자는 entity 로 변환 할 때 해 줄 일을 정의하면 된다.


이제 끝이다. 암호화 해 줄 필드에 `convert` 어노테이션을 할 암호화를 적용할 필드에 달아준다. 

![스크린샷 2021-08-30 오후 7 52 07](https://user-images.githubusercontent.com/45758481/131328617-6f5dc2ae-d2e0-463a-98b5-59c3b8e19f87.png)


https://docs.jboss.org/hibernate/jpa/2.2/api/javax/persistence/Convert.html 를 참조하면 자세한 사용법을 알 수 있다.

`converter` 는 어떤 컨버터를 사용 할 지 명시한다.
@Convert 를 적용 할 필드가 basic type or Collection of basic type 이 안닌 경우에는 `attributeName` 을 반드시 명시해야 한다. 


