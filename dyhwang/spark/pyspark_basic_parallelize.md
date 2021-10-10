# 가장 기본적인 spark 병렬처리
```python

#spark context를 생성
sc = SparkContext.getOrCreate()

#처리할 데이터를 직렬화 시켜 리스트로 만들어줌
reportList = getDirList(f'{dataPath}/삼성전자')

#parallelize를 사용하여 데이터를 rdd로 만들어줌
rdd = sc.parallelize(reportList)

#데이터를 처리할 함수를 정의하여 map에 데이터와 함수를 명시해주고 .collect()를 사용하여 처리해줌
#spark는 lazy evaluation을 하기 때문에 액션을 사용하는 시점에처 처리하기 때문
rdd.map(lambda x: parsing(x, '삼성전자', dataPath, processedPath)).collect()
```