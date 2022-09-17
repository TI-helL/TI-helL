# Vue 엑셀 다운로드 

데이터 테이블을 엑셀로 다운로드 해야 될 상황이 있다.

데이터 테이블을 엑셀로 다운로드할 수 있게 만들어보자

참고 [sheet.js](https://docs.sheetjs.com/) 

xlsx다운

```js
npm install xlsx
```

dataTable과 opresult가 다른 정보여서 한개의 excel 파일에 sheet2개를 담아 다운로드 하는 코드

```js
import * as xlsx from "xlsx"; //xlsx import

export default {
	data(){
		return { 
			dataTable: {
				0:{
					data1: '데이터1'
					data2: '데이터2'
				},
				1:{
					data1: '데이터3'
					data2: '데이터4'
				}	
			}
	}
	method:{
		downloadXlsx() {
		const opresult = this.opList.map((item) => {
            return {
            알고리즘명: item.alg_name,
            투자유형: item.invest_type,
            해외자산포함: item.include_oversea,
            주식포함: item.include_stock,
            기준일: item.date,
            누적수익률: item.profit_accum,
            "1주수익률": item.profit_week1,
            "1월수익률": item.profit_month1,
            "3월수익률": item.profit_month3,
            };
      });
			const workBook = xlsx.utils.book_new();
			const workSheet1 = xlsx.utils.json_to_sheet(opresult);
			const workSheet2 = xlsx.utils.json_to_sheet(this.dataTable);
			xlsx.utils.book_append_sheet(workBook, workShee1, "테스트베드 전체");
			xlsx.utils.book_append_sheet(workBook, workShee2, "테스트베드 전체");
			xlsx.writeFile(workBook, `테스트베드_운용현황_${this.date}.xlsx`);
		}
	}
}
```

xlsx.utils.book_new(): 엑셀 문서 생성 

xlsx.utils.json_to_sheet(데이터): 워크시트 생성

xlsx.utils.book_append_sheet(엑셀문서변수, 워크시트변수, ”워크시트 이름”): 엑셀 문서에 워크시트 추가

xlsx.writeFile(엑셀문서변수, “문서이름” ): 파일 다운로드, 브러우저에서 다운로드 하라는 메세지가 나옴