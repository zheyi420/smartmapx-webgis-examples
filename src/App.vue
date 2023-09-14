<template>
  <div id="app">
    <menu-panel></menu-panel>
    <editor-panel></editor-panel>
    <map-panel></map-panel>
  </div>
</template>

<script>
import MenuPanel from './components/MenuPanel.vue';
import EditorPanel from './components/EditorPanel.vue';
import MapPanel from './components/MapPanel.vue';

export default {
  components: { MenuPanel, EditorPanel, MapPanel },
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
