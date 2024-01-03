<template>
  <div>
    <h1>New Page</h1>
    <p>This is the new page.</p>
    <br />
    <!-- Download Button -->
    <a
      href="https://bobagi.net/downloads/dist.7z"
      download
      class="download-button"
      >Download</a
    >
  </div>
</template>

<script>
export default {
  name: "NewPage",
};
</script>

<style>
.download-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
}
.download-button:hover {
  background-color: #45a049;
}
</style>
