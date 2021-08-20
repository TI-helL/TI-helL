# gofmt 패키지

- golang 자동 포멧팅 패키지 (코드 포멧 정리)
  - 인덴트에는 탭 사용
  - 정렬에는 공백 사용
- input
  - path 입력이 없다면, 표준입력
  - path에 파일을 입력하면, 파일 내용 포멧팅
  - path에 디렉토리를 입력하면, 디렉토리 내의 모든 .go 파일 내용 포멧팅
- output
  - default: 표준출력으로 포멧팅 결과 출력
  - flags에 따라 다른 출력 혹은 파일 내 적용 가능

<br>

## 사용법

- `gofmt [flags] [path ...] `

<br>

## flags

- d: 자동 포멧결과와 원본의 diff 출력
- l: 자동 포멧결과와 원본이 다른 파일명 목록 출력
- w: 원본에 자동포멧의 결과를 덮어씀 (+ 에러 발생 시 원본 자동 복구)
- 다른 플래그는 하단 링크 참고

<br>

```go
// 원본 user
package model

type User struct {
	Id uint `json:"user_id" gorm:"primary_key"`
	Name string `json:"user_name" gorm:"comment: 성명"`
    PhoneNumber string `json:"user_phone_number" gorm:"comment: 전화번호"`
}

// gofmt 실행 결과
package model

type User struct {
	Id          uint   `json:"user_id" gorm:"primary_key"`
	Name        string `json:"user_name" gorm:"comment: 품목이름"`
	PhoneNumber bool   `json:"user_phone_number" gorm:"comment: 품목형태"`
}

```

## 참고

- [gofmt 패키지](https://pkg.go.dev/cmd/gofmt)
