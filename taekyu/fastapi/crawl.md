# fastapi 크롤링

krx정보시스템에서 개발자 도구를 확인 해보면 이렇게 나옴
```
payload / Form Data

bld: dbms/MDC/STAT/standard/MDCSTAT01501
locale: ko_KR
mktId: ALL
trdDd: 20220922  ---> 이부분만 바뀌면 됨
share: 1
money: 1
csvxls_isNo: false
```

param을 위와 같이 보내주면 헤딩 닐짜에 관한 데이터를 크롤링할 수 있음

```python
def crawl_krx_data(self,date):
    param = {
      'bld': 'dbms/MDC/STAT/standard/MDCSTAT01501',
      'locale': 'ko_KR',
      'mktId': 'ALL',
      'trdDd': date, ---> 바뀌는 부분
      'share': 1,
      'money': 1,
      'csvxls_isNo': 'false',
    }

    logger.info(param)
	
    qstr = urlencode(param)#파라미터를 URL로 인코딩한 문자열을 반환함

    #requsts 라이버르러 사용해서 응답값을 json형태로 받음
    res = requests.get(f'{self.url_data}?{qstr}',headers=self.header_data)
    obj = res.json()
    ret=obj['OutBlock_1']
    
    return ret
```

1995년부터 2022년 사이의 모든 날짜를 불러와야 했다. 그래서 1995~2022년사이의 모든 날짜를 뽑는 메소드를 만들었다. 모든날짜에서 주말같은 부분은 브라우져에서 응답을 안해주니까 걱정 ㄴㄴ

```python
시작 날짜와 끝 날짜를 입력하면 그 사이의 모든 날짜를 받는 함수

def date_range(self, start, end):
    dates = [(start + timedelta(days=i)).strftime("%Y%m%d") for i in range((end-start).days+1)]
    logger.info(dates)

    return dates
```