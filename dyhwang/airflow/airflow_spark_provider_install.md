# hub의 airflow 이미지에 spark provider 설치
airflow에서 제공하는 docker-compose의 airflow 이미지에는 spark provider가 설치되어 있지 않다.
그래서 아래와 같이 설치를 해주어야 하는데
```bash
pip install 'apache-airflow-providers-spark'
```
안타깝게도 docker로 올라가는 airflow는 root계정을 제공하지도 않고, 5개의 클러스터로 구성되어 있기 때문에 일일히 다 설치하고 설정해 주어야 한다.

그래서 아래와 같이 yalm에서 python requirements에 설치할 종속성을 명시해주고 최초 실행시 설치해 주는 식으로 진행한다.

```bash
_PIP_ADDITIONAL_REQUIREMENTS: ${_PIP_ADDITIONAL_REQUIREMENTS:- apache-airflow-providers-apache-spark}
```
requirments.txt에 명시하고나 2.1.1 이후 버전을 옵션으로 해당사항을 제공하고 있다는데 그건 좀 더 찾아봐야 할듯하다.