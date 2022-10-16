from requests_html import HTMLSession

session = HTMLSession()
res = session.get(url='url')
res.html.render(timeout=30)
rows = res.html.find('tr[data-test=historical-data-table-row]')

#pip instll requests_html
#HTML selssdion을 통해서 웹 페이지가 랜딩 될 때까지 대기 했다기 스크래핑 진행

#페이지를 한번더 호출하는 사이트의 경우 유횽하게 사용할 수 있다.