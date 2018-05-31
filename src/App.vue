<template>
  <div id="app">
    <Editor />
    <Preview/>
  </div>
</template>

<script>
import Preview from "./components/Preview";
import Editor from "./components/Editor";

export default {
  name: "App",
  components: {
    Preview,
    Editor
  }
};
</script>

<style>
body {
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 10px;
}
textarea {
  width: 100%;
  margin: 0 auto;
  display: block;
}
</style>
