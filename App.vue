<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
};

</script>

<style>
/* Optional: Add some basic styling */
nav {
  margin-bottom: 10px;
}
router-link {
  margin-right: 10px;
}
</style>