<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Page Not Found</p>
    <v-btn color="primary" to="/">Go to Home</v-btn>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style>
.not-found {
  text-align: center;
}
</style>
