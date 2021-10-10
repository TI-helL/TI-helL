# MariaDB Auto-increment

> 데이터 저장 시 index와 같이 자동으로 값이 증가하면서 데이터를 저장해야 하는 경우가 있다. 이를 위해 AUTO_INCREMENT 옵션이 존재하며, 사용방법은 다음과 같다.

## SQL Query

```bash
# 테이블 생성 시 AUTO_INCREMENT 지정
CREATE TABLE [테이블명](
    [컬럼명] [데이터타입] AUTO_INCREMENT ...
    ...
)

# 이미 생성된 테이블에 AUTO_INCREMENT 지정
ALTER TABEL [테이블명] MODIFY num INT NOT NULL AUTO_INCREMENT


# AUTO_INCREMENT SET
ALTER TABLE [테이블명] AUTO_INCREMENT = 1;
ALTER TABLE [테이블명] AUTO_INCREMENT=1; SET @COUNT = 0;
UPDATE [테이블명] SET [AUTO_INCREMENT 열 이름] = @COUNT:=@COUNT+1;
```
