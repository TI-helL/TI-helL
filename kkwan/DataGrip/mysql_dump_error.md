# MySQL & MySQL Dump Setting

도커 컨테이너를 활용하다 보니 로컬에 MySQL 혹은 MariaDB 설치를 해두지 않다보니, DataGrip을 통한 데이터베이스 덤프가 되지 않음을 확인할 수 있다.

다음 명령을 통해 MySQL를 설치 후 다시 시도하면 정상적으로 데이터베이스 덤프가 되는 것을 확인할 수 있다.

```sh
brew install mysql@5.7
brew install mysql-client
brew install --cask mysqlworkbench

sudo ln -s /Applications/MySQLWorkbench.app/Contents/MacOS/mysql /usr/local/bin/mysql
sudo ln -s /Applications/MySQLWorkbench.app/Contents/MacOS/mysqldump /usr/local/bin/mysqldump
```
