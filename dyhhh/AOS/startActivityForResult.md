# startActivityForResult

_deprecated_

실행된 액티비티(sub)가 종료된 후 액티비티에서 처리된 결과를 실행한 액티비티(main)로 돌려줘야 하는 경우가 있다. 이때 사용하는 API가 startActivityForResult이다.

기존의 startActivity가 단방향이라면 startActivityForResult는 양방향으로 액티비티를 연결해 준다는 특징이 있다.

다만 sub가 실행중에 main이 destroy되면 결과를 전달받을 액티비티가 없어지기 때문에 종종 문제가 생길 수 있어 현재는 deprecated 되었다.

_(activityResultContracts에 대해선 다음에 알아본다)_

```kotlin
// in main activity
startActivityForResult( subActivityIndent, requestCode) # requestCode는 옵셔널이다.
// in sub activity
this.setResult(RESULT_OK, indent)
this.finish()
// in main activity
@override
protected void onActivityResult(int requestCode, int resultCode, Intent data){
	if(resultCode != RESULT_OK){
		...
	}
	System.out.println(data.data.getStringExtra("data"))
}
```
