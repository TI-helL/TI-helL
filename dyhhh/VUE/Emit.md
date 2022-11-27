# emit

자식컴포넌트가 부모컴포넌트와 통신하는 방식

```js
var childComponent = {
  methods: {
    sendEvent: function () {
      this.$emit("update");
    },
  },
};

new Vue({
  el: "#app",
  components: {
    "child-component": childComponent,
  },
  methods: {
    showAlert: function () {
      alert("event received");
    },
  },
});
```

```html
<div id="app">
  <child-component v-on:update="showAlert"></child-component>
</div>
```

emit에 파라메터를 전달할 수도 있다
