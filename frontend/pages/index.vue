<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 border-end sidebar">
        <!-- formula input -->
        <div class="row p-3">
          <label class="form-text my-2" for="function">type any formula you want to plot.</label>
          <div class="col-auto">
            <label for="function" class="col-form-label">y = </label>
          </div>
          <div class="col">
            <input type="text" id="function" class="form-control">
          </div>
        </div>

        <!-- range input -->
        <div class="row p-3 border-top">
          <label class="form-text my-2">x range</label>
          <div class="col">
            <label class="form-text" for="x-min">min</label>
            <input id="x-min" class="form-control" v-model="xMin">
          </div>
          <!-- <span class="mx-2">-</span> -->
          <div class="col">
            <label class="form-text" for="x-max">max</label>
            <input id="x-max" class="form-control" v-model="xMax">
          </div>
        </div>

        <!-- range input -->
        <div class="row p-3 border-top">
          <div class="col">
            <label class="form-text" for="plot-num">plot num</label>
            <input id="plot-num" class="form-control" type="number" v-model="plotNum">
          </div>
        </div>

        <div class="row p-3 border-top border-bottom">
          <div class="btn ar-btn-primary mt-3 w-100" @click="onPlotClicked">plot</div>
        </div>
      </div>

      <div class="col-md-9">
        <canvas id="myPlot"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto'; // TODO バンドルサイズ小さく

let chart = null
const reactiveData = ref([])
const xMin = ref(-1)
const xMax = ref(1)
const plotNum = ref(256)

onMounted(async () => {
  await fetchData();
  createChart()
})

async function onPlotClicked() {
  await fetchData();
  updateChart()
}

async function fetchData() {
  // サーバーサイドでプロットデータを生成
  const params = {
    xmin: xMin.value,
    xmax: xMax.value,
    plotnum: plotNum.value,
  };
  const query_params = new URLSearchParams(params);
  const url = 'http://localhost:3001/plot?' + query_params
  const jsonStr = await fetch(url)
  const ret = await jsonStr.json()
  reactiveData.value = ret.data
}

function createChart() {
  const ctx = document.getElementById('myPlot');

  const data = {
    datasets: [{
      label: 'Scatter Dataset',
      data: reactiveData.value,
      backgroundColor: 'rgb(255, 99, 132)'
    }],
  };

  const config = {
    type: 'scatter',
    data: data,
    options: {
      scales: {
        x: {
          type: 'linear',
          position: 'bottom'
        }
      }
    }
  };

  chart = new Chart(ctx, config);
}

async function updateChart() {
  chart.data.datasets[0].data = reactiveData.value
  chart.update();
}
</script>

<style scoped>
.sidebar {
  min-height: calc(100vh - 55px);
}
</style>