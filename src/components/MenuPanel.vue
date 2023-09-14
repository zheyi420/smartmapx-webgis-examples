<template>
  <div id="menu">
    <div id="menu-header"><img src="/smartmapx-logo.png" style="margin: 14px 5px -3px 0px" />SmartMapX JS 场景示例</div>

    <div id="menu-content">
      <ul>
        <li v-for="(category, categoName, index) in scenarioList" :key="index">
          <a class="one_head" :class="{clickState: curUnfoldedCategory === categoName}" @click="unfoldSubmenu(categoName)">
            <i :class="curUnfoldedCategory === categoName ? 't_open' : 't_close'"></i>
            {{ category.label }}
          </a>
          <div class="submenu" :style="{display: curUnfoldedCategory === categoName ? 'block' : 'none'}">
            <dl>
              <dd v-for="(ele, key, i) in category.child" :key="i">
                <a @click="loadScenario(ele)" class="" :class="{clickState: curScenario === key}">{{ ele.label }}</a>
              </dd>
            </dl>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import scenarioList from '../assets/scenarioList.json';

export default {
  name: 'MenuPanel',
  data() {
    return {
      scenarioList,
      curUnfoldedCategory: '',
      curScenario: null,
    };
  },
  methods: {
    loadScenario(scenario) {
      this.$store.commit('SET_SCENARIO', scenario);
      this.curScenario = scenario.name;
    },
    unfoldSubmenu(categoName) {
      if (this.curUnfoldedCategory === categoName) {
        this.curUnfoldedCategory = '';
        return;
      }
      this.curUnfoldedCategory = categoName;
    },
  },
};
</script>

<style scoped>
#menu {
  min-width: 230px;
  float: left;
  border-right: 1px solid #e9e9e9;
  height: 100%;
  background-color: #f7f9fd;
}
#menu-header {
  min-width: 230px;
  height: 50px;
  top: 0px;
  left: 0px;
  background-color: #1199c4;
  color: #fff;
  position: absolute;
  font-weight: bold;
  font-family: sans-serif;
  font-size: 15px;
}
#menu-content {
  min-width: 230px;
  float: left;
  overflow-y: scroll;
  position: absolute;
  top: 50px;
  bottom: 0;
  background-color: #f7f9fd;
  text-align: left;
}
#menu-content ul {
  font-size: 14px;
  font-family: '微软雅黑';
  background-color: #f7f9fd;
  padding: 0px 10px;
}
#menu-content ul li {
  list-style: none;
  border-bottom: 1px solid #e9e9e9;
  padding: 15px 10px;
}
#menu-content ul li:before {
  border-left: 1px dotted #b0b5c2;
  content: '';
  display: inline-block;
  float: left;
}
#menu-content > ul > li > a {
  width: 100%;
  display: block;
  height: 21px;
  text-decoration: none;
  color: #000;
}
#menu-content ul li:last-child {
  border-bottom: none;
}
#menu-content .submenu a {
  margin: 0;
  text-decoration: none;
  display: block;
  height: 35px;
  width: 100%;
  color: #000;
}
#menu-content .submenu {
  z-index: 9999;
  width: 100%;
  margin-left: 6px;
  margin-top: 10px;
}
#menu-content .submenu {
  display: none;
}
#menu-content .submenu dl {
  list-style-type: square;
}
#menu-content .submenu dl dd {
  line-height: 35px;
  height: 35px;
  font-size: 14px;
}
#menu-content .submenu dl dd:before {
  border-bottom: 1px dotted #b0b5c2;
  content: '';
  display: inline-block;
  float: left;
  width: 10px;
  margin: -15px 0 0;
  height: 33px;
  border-left: 1px dotted #b0b5c2;
}
#menu-content .submenu dl dd a {
  margin-left: 11px;
}
#menu-content ul li a:hover,
#code_close,
#code_open,
#d_clip_button {
  cursor: pointer;
}
#code_area #d_menu > div > a:hover {
  cursor: pointer;
  font-weight: bold;
}
#openbar > p {
  line-height: 36px;
  margin-left: 10px;
}
#menu-content a:hover,
.clickState {
  color: #0075c7 !important;
}
#menu-content .submenu dl dd a:before {
  content: '·';
  font-size: 27px;
  float: left;
  margin-left: 2px;
  margin-right: 1px;
}
#menu-content i {
  width: 13px;
  height: 13px;
  display: block;
  float: left;
  margin-top: 4px;
  margin-right: 7px;
}
#menu-content .t_close {
  background: url(./../assets/icon.png) no-repeat 0 -96px;
}
#menu-content .t_open {
  background: url(./../assets/icon.png) no-repeat 0 -119px;
}
</style>