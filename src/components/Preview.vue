<template>
  <div class="result">
    <section id="source">
      <h1>Source</h1>
      <textarea v-model="source" cols="30" rows="10" class="output-body" readonly></textarea>
    </section>

    <section id="preview">
      <h1>Preview</h1>
      <div v-html="preview" class="preview-body"></div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Preview",
  data() {
    return {};
  },
  computed: {
    ...mapState(["preview", "source"])
  }
};
</script>

<style scoped>
.preview-body {
  color: #764;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  padding: 20px;
}

.preview-body p {
  margin-top: 24px;
}

.preview-body img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 16px auto;
}

.preview-body ul,
.preview-body ol {
  margin: 0 24px 24px;
}

.preview-body ul {
  list-style-type: disc;
}

.preview-body strong {
  font-weight: bold;
  color: #f66;
}

.preview-body em {
  font-style: normal;
  background: none;
  color: #0cc;
}

.preview-body b {
  font-weight: bold;
}

.preview-body a {
  border-bottom: solid 1px;
  color: #5bf;
}
</style>
