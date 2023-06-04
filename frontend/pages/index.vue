<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 border-end sidebar shadow">
        <!-- formula input -->
        <div class="row p-3">
          <label class="form-text my-2" for="fx">type any formula you want to plot.</label>
          <div class="col-auto">
            <label for="fx" class="col-form-label">y = </label>
          </div>
          <div class="col">
            <input type="text" id="fx" :placeholder="samplefx" class="form-control" v-model="fx">
          </div>
          <div class="mt-3 text-muted">
            sample
            <ul>
              <li>sin(x)</li>
              <li>e^x</li>
              <li>sqrt(x)</li>
            </ul>
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
          <button class="btn ar-btn-primary mt-3 w-100" @click="onPlotClicked">plot</button>
        </div>
      </div>

      <div class="col-md-9">
        <canvas id="myPlot" class="mt-3"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto'; // TODO バンドルサイズ小さく

let chart = null
const samplefx = "f(x)"
const fx = ref("x^2")
const xMin = ref(-5)
const xMax = ref(5)
const plotNum = ref(256)
const reactiveData = ref([])

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
    fx: fx.value,
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
      backgroundColor: '#663399'
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
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          usePointStyle: true,
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || '';
              label = ` (${context.parsed.x.toPrecision(3)}, ${context.parsed.y.toPrecision(3)})`
              return label;
            },
            labelPointStyle: function (context) {
              return {
                pointStyle: 'circle',
              };
            },
          }
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