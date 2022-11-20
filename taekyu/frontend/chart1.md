# chart.js

설치

```js
npm i vue-chartjs chart.js
```

등록

```js
import { Line } from 'vue-chartjs/legacy'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)
```

사용

```js
<template>
  <LineChart> </LineChart>
</template>
```
