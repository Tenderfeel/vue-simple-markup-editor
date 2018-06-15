<template>
  <div id="editor">
    <div id="controller">
      <button id="addImg" @click="togglePrompt('img')">Image</button>
      <button id="addLink" @click="togglePrompt('link')">Link</button>
      <label>
        quot:<select v-model="isQuot">
          <option v-for="quot in quotations" :value="quot.value" :key="quot.value">
            {{quot.text}}
          </option>
        </select>
      </label>

      <button id="addStrong" @click="addStrong">Strong</button>
      <button id="addEm" @click="addEm">em</button>
      <button id="addBold" @click="addBold">Bold</button>
      <label>
        <input type="checkbox" v-model="isWrapP" @change="update">wrap &lt;p&gt;
      </label>
      <label>
        <input type="checkbox" v-model="isOneLine" @change="update">oneline
      </label>

      <div class="hide-input" v-if="prompt === 'link'">
        <label for="inputLink">URL:</label>
        <input type="url" id="inputLink" v-model="href">
        <label><input type="checkbox" v-model="targetBlank">_blank</label>
        <button class="btn-ok" @click="addLink">OK</button>
      </div>

      <div class="hide-input" v-if="prompt === 'img'">
        <label for="inputImg">img src:</label>
        <input type="url" id="inputImg" v-model="src">
        <button class="btn-ok" @click="addImg">OK</button>
      </div>
    </div>

    <textarea id="body" v-model="body" cols="30" rows="10" class="input-body" 
    @select="getSelection" @click="getSelection">
    </textarea>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      prompt: null,
      targetBlank: false,
      quotations: [
        { text: 'None', value: 0 },
        { text: 'Single', value: 1 },
        { text: 'Double', value: 2 }
      ],
      src: '',
      href: ''
    }
  },
  computed: {
    ...mapState(['selection']),
    body: {
      get() {
        return this.$store.state.body
      },
      set(value) {
        this.$store.commit('updateBody', value)
      }
    },
    isOneLine: {
      get() {
        return this.$store.state.isOneLine
      },
      set(value) {
        this.$store.commit('updateIsOneLine', value)
      }
    },
    isWrapP: {
      get() {
        return this.$store.state.isWrapP
      },
      set(value) {
        this.$store.commit('updateIsWrapP', value)
      }
    },
    isQuot: {
      get() {
        return this.$store.state.isQuot
      },
      set(value) {
        this.$store.commit('updateIsQuot', value)
      }
    }
  },
  methods: {
    ...mapActions(['getSelection', 'surround', 'update']),

    togglePrompt(target) {
      this.prompt = target
    },

    getQuot() {
      return this.isQuot === 2 ? '"' : this.isQuot === 1 ? "'" : ''
    },

    addImg() {
      this.surround([
        '<img src=' +
          this.getQuot() +
          this.src +
          this.getQuot() +
          ' class=' +
          this.getQuot() +
          'banner' +
          this.getQuot() +
          '>',
        ''
      ])
    },

    addLink() {
      let before = '<a href=' + this.getQuot() + this.href + this.getQuot()

      if (this.targetBlank) {
        before += ' target=' + this.getQuot() + '_blank' + this.getQuot()
      }
      this.href = ''
      this.surround([before + '>', '</a>'])
    },

    addEm() {
      this.surround(['<em>', '</em>'])
    },
    addBold() {
      this.surround(['<b>', '</b>'])
    },
    addStrong() {
      this.surround(['<strong>', '</strong>'])
    }
  }
}
</script>

<style scoped>
#controller {
  padding: 10px;
  background: #efefef;
}
input[type='url'] {
  width: 70%;
  max-width: 400px;
}
</style>
