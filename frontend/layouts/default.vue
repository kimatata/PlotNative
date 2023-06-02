<template>
  <div>
    <div>
      <nav class="navbar shadow">
        <div class="container-fluid">
          <NuxtLink :to="'/'" class="navbar-brand" >
            <!-- <img src="/icon.png" alt="icon" width="30"/> -->
            <span class="ms-2">nativeBindingTest</span>
          </NuxtLink>
        </div>
      </nav>
    </div>
    <slot />
  </div>
</template>