### Beautifulsoup4 설치
```
pip install beautifulsoup4
```

### 사용
- 특정 url의 html을 받아 soup 객체로 변환
```
import requests
from bs4 import BeautifulSoup

url = ``

response = requests.get(url)

if response.status_code == 200:
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    print(soup)

else : 
    print(response.status_code)
```

### soup 필터링
- select / select_one : css 선택자
- find / find_one : 
```
select_soup = soup.select("#s_content > div.section > ul > li:nth-child(1) > dl > dt > a").text
find_soup = soup.find("div", {"class":["body"]}).text

```

