# registerForActivityResult

- 다른 앱의 액티비티의 결과를 가져오기 위한 api
- startActivityForResult도 사용할 수 있지만 해당 api 사용을 권장한다

## 콜백

- 메모리 부족으로 인해 돌아갈 액티비티가 소멸할 경우 문제가 발생할 가능성이 있다
- 위의 이유가 startActivityForResult가 권장되지 않는 이유이다
- 그래서 결과 콜백을 분리하여 처리한다
- registerForActivityResult는 ActivityResultContract나 ActivityResultCallback을 가져와 다른 액티비티를 실행하는데 사용 할 ActivityResultLauncher를 반환한다
- ActivityResultCallback은 ActivityResultContract에 정의된 출력 유형의 객체를 가져오는 onActivityResult() 메서드가 포함된 단일 메서드의 인터페이스이다

```kotlin
val getContent = registerForActivityResult(GetContent()) { uri: Uri? ->
    // Handle the returned Uri
}
```

## A 액티비티 콜백 등록

```kotlin

onCreate(){
    getResultText = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()) {
            result ->
            if(result.resultCode == RESULT_OK){
                ...
            }
        }
    )
}

val mIntent = Intent( this, BActivity::Class.java)
getResultText.launch(mIntent)

```

## B 액티비티 setResult

```kotlin
mIntent = Intent(this, AActivity::Class.java).apply{
    putExtra(...)
}
setResult(RESULT_OK, mIntent)
finish()
```
