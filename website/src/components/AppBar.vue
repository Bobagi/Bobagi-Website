<template>
  <header class="app-bar">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/newPage">New Page</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "AppBar",
};
</script>

<style>
.app-bar {
  background-color: #333;
  color: white;
  padding: 10px 20px;
}
nav a {
  color: white;
  margin-right: 15px;
  text-decoration: none;
}
</style>
