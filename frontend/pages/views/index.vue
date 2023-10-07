<template>
  <v-main>
    <v-container class="">
      <v-row class="">
        <v-col cols="3" class=""></v-col>
        <v-col cols="6" class="">
          <v-btn class="ar-btn-primary mt-5" @click="showDialog = true">
            Resister Formula
          </v-btn>

          <v-dialog v-model="showDialog" width="600">
            <v-card>
              <v-card-title>
                <span class="text-h5">Input Formula</span>
              </v-card-title>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field variant="outlined" label="Formula*" placeholder="x^2 +3x -2" v-model="formulaInput"
                      required />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field variant="outlined" label="Name*" placeholder="quadratic" v-model="nameInput" required />
                  </v-col>
                </v-row>
              </v-container>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="showDialog = false">Close</v-btn>
                <v-btn color="primary" @click="resisterView(), showDialog = false">Resister</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-table class="view-table">
            <thead>
              <tr>
                <!-- <th class="text-left">
                  uuid
                </th> -->
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
                <!-- <td>{{ view.viewId }}</td> -->
                <td>
                  <NuxtLink :to="'/?uuid=' + view.viewId">
                    {{ view.name }}
                  </NuxtLink>
                </td>
                <td>{{ view.formula }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
        <v-col cols="3" class=""></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const origin = runtimeConfig.public.serverOrigin

const views = ref([])
const showDialog = ref(false)
const formulaInput = ref("")
const nameInput = ref("")

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

async function resisterView() {
  if (formulaInput.value.length < 1) {
    return
  }

  const params = {
    formula: formulaInput.value,
    name: nameInput.value
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

<style scoped>
.view-table {
  width: 600px;
}</style>