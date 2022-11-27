# watch

options API에서 제공하는 기능으로, data에 대한 리엑티브를 제공한다

```js
watch {
    watchedVar: showLog
},

method {
    showLog:{
        console.log("test")
    }
}
```

```js
watch {
    watchedVar(newVar, oldVar){
        console.log(newVar, oldVar)
    }
}
```

```js
watch {
    watchedVar: {
        handle: {
            console.log("test")
        },
        deep: true, // 데이터 객체의 변화를 딥하게 감시
        immediate: true // 마운트 즉시 실행
    }
}
```
