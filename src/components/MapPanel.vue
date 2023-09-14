<template>
  <div id="mapContainer">
    <div id="iframe">
      <iframe class="map-iframe" :srcdoc="content"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapPanel',
  data() {
    return {
      content: null,
    };
  },
  computed: {
    isRunCode() {
      return this.$store.state.isRunCode;
    },
  },
  watch: {
    isRunCode: {
      handler: function (val, oldVal) {
        if (!oldVal && val) {
          this.content = this.$store.state.mapCode;
          this.$store.commit('SET_RUN_CODE', false);
        }
      },
    },
  },
  methods: {
    onLoad() {
      console.log('iframe loaded');
    },
  }
};
</script>

<style scoped>
#mapContainer {
  border-left: 1px solid #e9e9e9;
  overflow: hidden;
  height: 100%;
  position: relative;
  display: block;
  zoom: 1;
}
#iframe {
  border: none;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
.map-iframe {
  border: 1px solid black;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>