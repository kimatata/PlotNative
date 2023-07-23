<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" class="pa-3">
      <!-- formula input -->
      <div class="pa-3">
        <div class="text-caption">
          type any formula you want to plot.
          <div class="mt-1">
            example:
            <ul class="ma-3">
              <li>sin(x)</li>
              <li>e^x</li>
              <li>sqrt(x)</li>
            </ul>
          </div>
        </div>
        <v-text-field label="f(x) = " v-model="fx"></v-text-field>
      </div>
      <v-divider></v-divider>

      <!-- range input -->
      <div class="pa-3">
        <div class="text-caption">plot range</div>
        <v-slider v-model="xMin" :min="-1023" :max="1024" :step="1" label="min" hide-details class="mt-1">
          <template v-slot:append>
            <v-text-field v-model="xMin" type="number" style="width: 80px" density="compact" hide-details></v-text-field>
          </template>
        </v-slider>
        <v-slider v-model="xMax" :min="-1023" :max="1024" :step="1" label="max" hide-details class="mt-1">
          <template v-slot:append>
            <v-text-field v-model="xMax" type="number" style="width: 80px" density="compact" hide-details></v-text-field>
          </template>
        </v-slider>
      </div>
      <v-divider></v-divider>

      <!-- range input -->
      <div class="pa-3">
        <div class="text-caption">plot num</div>
        <v-slider v-model="plotNum" :min="1" :max="1024" :step="1" hide-details class="mt-1">
          <template v-slot:append>
            <v-text-field v-model="plotNum" type="number" style="width: 80px" density="compact"
              hide-details></v-text-field>
          </template>
        </v-slider>
      </div>
      <v-divider></v-divider>

      <div class="pa-3">
        <v-btn @click="onPlotClicked" class="ar-btn-primary mt-3 w-100">
          plot
        </v-btn>
      </div>
      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <!-- <img src="/android-chrome-96x96.png" alt="icon" width="30" /> -->
        plotman
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <canvas id="myPlot" class=""></canvas>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Chart from 'chart.js/auto'; // TODO バンドルサイズ小さく
// ui
const drawer = ref(null)

// plot
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

<style scoped></style>