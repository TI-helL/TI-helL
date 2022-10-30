#VIEW PAGER2

- 사용자의 스윕 제스쳐에 반응하여 다음 페이지 컨텐츠를 보여주는 뷰
- 어뎁터를 리사이클링 하는 형식으로 구현된다
- 기존의 뷰페이저는 페이저 어뎁터 기반으로 구성되어 있어 스크롤 시 instantiateItem과 destroyItem를 반복 호출하기 때문에 버벅인다

## 레이아웃

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.viewpager2.widget.ViewPager2
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/viewPager"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

## 어뎁터

```kotlin
class RecyclerViewAdapter(var items: ArrayList<String> = arrayListOf()) : RecyclerView.Adapter<ViewHolder>() {

override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(parent.context)
                          .inflate(R.layout.list_item, parent, false))
    }

override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.setData(items[position])
    }

override fun getItemCount(): Int = items.size

  ...
}
```

```kotlin
viewPager.adapter = RecylerViewAdapter()
//or
viewPager.adapter = FragmentStateAdapter()
```

## 참조

[강남언니 뷰페이저](https://blog.gangnamunni.com/post/viewpager2/)
[instantiate](https://m.blog.naver.com/jysaa5/221768848057)
