<template>
  <v-main>
    <v-container :fluid="true" class="">
      <v-row class="">
        <v-col cols="12" class="">
          <v-btn @click="requestAddView()">
            add
          </v-btn>

          <v-table>
            <thead>
              <tr>
                <th class="text-left">
                  uuid
                </th>
                <th class="text-left">
                  Name
                </th>
                <th class="text-left">
                  Formula
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="view in views">
                <td>{{ view.viewId }}</td>
                <td>{{ view.name }}</td>
                <td>{{ view.formula }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const origin = runtimeConfig.public.serverOrigin

const views = ref([])

onMounted(async () => {
  await fetchViews();
})

async function fetchViews() {
  fetch(origin + '/views', {
    method: "GET"
  }).then((response) => response.json())
    .then((data) =>
      updateView(data.items)
    );
}

async function requestAddView() {
  const params = {
    formula: "x^2 -x + 8",
  };
  const query_params = new URLSearchParams(params);
  const url = origin + '/views/new?' + query_params

  fetch(url, {
    method: "POST",
  }).then((response) => response.json())
    .then((data) => console.log(data));
}

function updateView(items) {
  for (let i = 0; i < items.length; i++) {
    views.value.push(items[i])
  }
}
</script>