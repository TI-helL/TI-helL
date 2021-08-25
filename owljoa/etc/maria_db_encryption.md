# MariaDB DB 빌트인 AES 암/복호화 함수

<br>

## 암호화

- AES_ENCRYPT(string, key_string)
- key_string을 키로 이용해서 string을 암호화하고, 결과값은 바이너리로 반환

<br>

## 복호화

- AES_DECRYPT(encrypted_string, key_string)
- key_string을 키로 이용해서 encrypted_string을 복호화하고, 결과값은 원본 string으로 반환

<br>

## 참고

- https://mariadb.com/kb/en/aes_encrypt/
