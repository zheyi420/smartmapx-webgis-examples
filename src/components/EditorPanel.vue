<template>
  <div id="editor">
    <div id="editor-header">
      <p id="editor-header-label">代码编辑器</p>
      <div id="editor-header-opr">
        <a id="opr_run_button" @click="runCode">运行</a>
        <a id="opr_restore_button" @click="restoreCode">复原</a>
      </div>
    </div>
    <codemirror id="codemirror" ref="cmEditor" v-model="code" :options="cmOptions" />
  </div>
</template>

<script>
import {codemirror} from 'vue-codemirror';
// language
// import 'codemirror/mode/xml/xml.js';
// import 'codemirror/mode/javascript/javascript.js';
// import 'codemirror/mode/css/css.js'
import 'codemirror/mode/vue/vue.js';
// theme css
import 'codemirror/lib/codemirror.css';
// require active-line.js
import 'codemirror/addon/selection/active-line.js';
// autoCloseTags
import 'codemirror/addon/edit/closetag.js';

import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/comment-fold';

// about search: https://codemirror.net/5/demo/search.html
import 'codemirror/addon/scroll/annotatescrollbar.js';
import 'codemirror/addon/search/matchesonscrollbar.js';
import 'codemirror/addon/search/match-highlighter.js';
import 'codemirror/addon/search/jump-to-line.js';
import 'codemirror/addon/search/searchcursor.js';
import 'codemirror/addon/search/search.js';
import 'codemirror/addon/dialog/dialog.js';
import 'codemirror/addon/dialog/dialog.css';

export default {
  name: 'EditorPanel',
  components: {
    codemirror,
  },
  data() {
    return {
      code: null,
      cmOptions: {
        tabSize: 2,
        smartIndent: true,
        styleActiveLine: true,
        lineNumbers: true,
        lineWrapping: true,
        autoCloseTags: true,
        line: true,
        mode: 'text/html',
        theme: 'default',
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      },
    };
  },
  computed: {
    scenario() {
      return this.$store.state.scenario;
    },
    codemirror() {
      return this.$refs.cmEditor.codemirror;
    },
  },
  watch: {
    scenario: {
      handler: function (val, oldVal) {
        console.log('scenario oldVal:', oldVal.label);
        console.log('scenario newVal:', val.label);

        this.commitCode(val)
          .then(() => {
            this.$store.commit('SET_RUN_CODE', true);
          })
          .catch((err) => {
            console.log('commitCode() error:', err);
          });
      },
    },
  },
  mounted() {},
  methods: {
    /**
     * @description: 返回默认代码文本。
     * @param {Object} val
     * @return: Promise
     */
    getDefaultCodeTxt(val) {
      console.log('getDefaultCodeTxt():', JSON.stringify(val));

      return new Promise((resolve, reject) => {
        fetch(`/scenarioDefaultCode/${val.name}.html`)
          .then((res) => {
            return res.text();
          })
          .then((text) => {
            resolve(text);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    /**
     * @description: 更新代码到编辑器中。
     * @param {Object} val
     * @return: Promise
     */
    commitCode(val) {
      const loadPromise = this.getDefaultCodeTxt(val);

      return new Promise((resolve, reject) => {
        loadPromise
          .then((res) => {
            this.code = res;
            this.$store.commit('SET_MAP_CODE', this.code);
            resolve();
          })
          .catch((err) => {
            console.log('getDefaultCodeTxt() error:', err);
            reject(err);
          });
      });
    },

    /**
     * @description: 更新编辑器中的代码到Vuex，并运行。
     */
    runCode() {
      this.$store.commit('SET_MAP_CODE', this.code);
      this.$store.commit('SET_RUN_CODE', true);
    },

    /**
     * @description: 复原编辑器中的代码为默认代码，并运行。
     */
    restoreCode() {
      console.log('restoreCode()');
      this.commitCode(this.scenario)
        .then(() => {
          this.$store.commit('SET_RUN_CODE', true);
        })
        .catch((err) => {
          console.log('commitCode() error:', err);
        });
    },
  },
};
</script>

<style scoped>
#editor {
  width: 530px;
  -webkit-user-select: none;
  float: left;
  height: 100%;
  z-index: 999;
  position: relative;
  box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.1);
}
#editor-header {
  height: 33px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ebebeb;
}
#editor-header-label {
  line-height: 33px;
  border: none;
  padding: 0;
  margin: 0px 0px 0px 10px;
  float: left;
  font-size: 16px;
}
#editor-header-opr {
  float: right;
  border: none;
  padding: 0;
}
#editor-header-opr a {
  margin-right: 7px;
  line-height: 33px;
  text-decoration: none;
  padding-bottom: 2px;
  font-size: 16px;
}
#editor-header-opr > a:hover {
  cursor: pointer;
  font-weight: bold;
}
#opr_run_button {
  background: url(./../assets/icon.png) no-repeat 0 -23px;
  color: #3189f3;
  padding-left: 17px;
}
#opr_restore_button {
  background: url(./../assets/icon.png) no-repeat 0 -47px;
  color: #3189f3;
  padding-left: 18px;
}
#codemirror {
  text-align: left;
  position: absolute;
  bottom: 0px;
  top: 33px;
  width: 100%;
}
</style>

<style>
.CodeMirror {
  height: 100%;
  font-family: Consolas, monaco, 'Courier New', Courier, monospace;
}
</style>