<template>
  <div>
    <div>
      <nav class="navbar shadow header">
        <div class="container-fluid">
          <NuxtLink :to="'/'" class="navbar-brand">
            <img src="/android-chrome-96x96.png" alt="icon" width="30" />
            <span class="ms-2 title">plotman</span>
          </NuxtLink>
        </div>
      </nav>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.header {
  height: 55px;
}

.title {
  color: #663399;
  font-weight: bold;
}
</style>