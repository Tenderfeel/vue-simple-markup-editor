import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    body: '',
    source: '',
    preview: '',
    selection: { start: 0, end: 0 },
    isQuot: 0,
    isWrapP: true,
    isOneLine: true //Sourceを1行で出力
  },
  actions: {
    update({ commit, state }) {
      commit('updateBody', state.body)
    },

    getSelection({ commit, state }, e) {
      if (window.getSelection() && typeof e === 'object' && e.target) {
        commit('updateSelection', {
          start: e.target.selectionStart,
          end: e.target.selectionEnd
        })
      }
    },

    surround({ commit, state }, tags) {
      let val = state.body
      let [before, after] = tags

      let range = val.slice(state.selection.start, state.selection.end)
      let beforeNode = val.slice(0, state.selection.start)
      let afterNode = val.slice(state.selection.end)
      let insertNode = ''

      if (range || state.selection.start !== state.selection.end) {
        insertNode = before + range + after
      } else if (state.selection.start === state.selection.end) {
        insertNode = before + after
      }

      commit('updateBody', beforeNode + insertNode + afterNode)
    }
  },
  mutations: {
    updateIsWrapP(state, value) {
      state.isWrapP = value
    },

    updateIsOneLine(state, value) {
      state.isOneLine = value
    },

    updateSource(state, value) {
      state.source = value
    },

    updateIsQuot(state, value) {
      state.isQuot = value
    },

    updateSelection(state, selection) {
      state.selection = selection
    },

    updateBody(state, text) {
      state.body = text

      //Textarea's character string is split by newline.
      let arr = text.split(/[\n\r\t]{2}/i)
      let result = []

      arr.forEach((w, i) => {
        //w -> One line of a character string divided by line breaks.
        w = w.trim()
        w = w.replace(/^"/, '')
        w = w.replace(/"$/, '')

        let isList = w.indexOf('・') === 0

        if (isList) {
          let li = []

          w.split(new RegExp(/^\s*・/, 'gm')).forEach(function(ww, ii) {
            if (!ww.length) return
            ww = ww.replace(/[\n\r\s]+$/gm, '') //Erase the trailing newline
            ww = ww.replace(/[\n\r]/g, '<br>')
            ww = ww.replace(/[\t\s]*/gm, '')
            li.push('<li>' + ww + '</li>')
          })

          w = li
        } else {
          w = w.replace(/^(■.+)[\n\r]*/, '<b>$1</b><br>')
          w = w.replace(/([、。]*)[\n\r]/gm, '$1<br>')
        }

        if (!isList) {
          if (state.isWrapP && w.length) {
            w = '<p>' + w + '</p>'
            w = w.replace(/<br><\/p>/gm, '</p>')
            result.push(w)
          } else {
            result.push(w)
          }
        } else {
          result.push('<ul>')

          if (state.isOneLine) {
            result.push(w.join(''))
          } else {
            result.push(w.join('\n'))
          }

          result.push('</ul>')
        }
      })

      if (state.isOneLine) {
        state.source = result.join('')
      } else {
        state.source = result.join('\n')
      }

      state.preview = state.source
    }
  }
})
