#re - 정규식 연산 

```python
import requests
import re 

def get_encparam(code="005930"):
    re_enc = re.compile("encparam: '(.*)'", re.IGNORECASE) 
    re_id = re.compile("id: '([a-zA-Z0-9]*)' ?", re.IGNORECASE)
    url = f"http://companyinfo.stock.naver.com/v1/company/c1010001.aspx?cmp_cd={code}" 
    html = requests.get(url).text 
    encparam = re_enc.search(html).group(1) 
    encid = re_id.search(html).group(1)
    return encparam, encid
```

- 파이썬에서 정규 표현식을 지원
- p = re.compile(’ab*’)
- 리턴되는 객체 p을 이용해 작업 수행

정규식 문자열 검색

- match() : 문자열 처음부터 정규식과 매치되는지 조사
- search() : 전체를 검색해 매치되는지 조사
- findall() : 정규식과 매치되는 모든 문자열 리스트로 리턴
- finditer() : 매치되는 모든 문자열을 반복 가능한 객체로 리턴