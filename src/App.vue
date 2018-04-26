<template>
  <div id="app">
      <el-row :gutter="20">
        <el-col v-show="isLeftShow" :span="4" style="padding-left: 10px;padding-right: 0px; border-right: 1px solid #a2a2a2;"> <!-- 메뉴 목록 -->
              <Left
                class="el-left-menu"
                :menuList="menuList"
                :addTab="addTab"
                >
              </Left>
          </el-col>
        <el-col :span="20" style="padding-left: 10px;padding-right: 10px;">
          <el-row :gutter="20" style="box-shadow: 0px 3px 5px #adadad; margin-left: -10px;">
          </el-row>
        <el-row :gutter="20" style="margin-left: -9px;margin-right: -10px;margin-top: 5px;background-color: #F7F7F7;">
            <Contents
              :openTabs="openTabs"
              :selectedTab="selectedTab"
              :removeTab="removeTab"
              :handleClick="handleClick"
            >
            </Contents>
          </el-row>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import Top from '@/components/template/Top';
import Left from '@/components/template/Left';
import Contents from '@/components/template/Contents';
import auth from '@/utils/auth';

export default {
  name: 'app',
  components: {
    'Top': Top,
    'Left': Left,
    'Contents': Contents
  },
  data () {
    return {
      user: auth.user,
      isLoggedIn: false,
      isLeftShow: true,
      selectedTab: 'Hello',
      openTabs: [{
        title: 'Hello',
        name: 'Hello',
        content: 'welcome'
      }],
      tabIndex: 1,
      menuList: // leftMenu Sample Data
      [
        {
          menuName: 'example-submenu',
          menuType: 'SubMenu',
          menuItems: [
            {
              menuName: 'ajax-example',
              menuType: 'menuItem',
              url: '/example/ajax'
            },
            {
              menuName: 'tree-example',
              menuType: 'menuItem',
              url: '/example/tree'
            },
            {
              menuName: 'chart-example',
              menuType: 'menuItem',
              url: '/example/chart'
            },
            {
              menuName: 'menu01-group01',
              menuType: 'MenuGroup',
              menuItems: [{
                menuName: 'menu01-group01-item01',
                menuType: 'menuItem',
                url: '/menu01-404Group'
              }]
            },
            {
              menuName: 'menu01-group02',
              menuType: 'MenuGroup',
              menuItems: [{
                menuName: 'menu01-group02-item01',
                menuType: 'menuItem',
                url: '/menu01-404Group'
              }]
            }
          ]
        },
        {
          menuName: 'menu02-item01',
          menuType: 'menuItem',
          url: '/500'
        }
      ]
    };
  },
  computed: {
    hasContents: function () {
      return this.$store.state.hasContents;
    }
  },
  methods: {
    loginCheck () {
      // FIXME 로그인 여부에 따라 화면에 보여질 영역을 구분할 수 있는 무엇인가가 필요하다. - by minam.cho
      this.isLoggedIn = auth.checkAuth();
    },
    /**
     * Tab을 새로 추가하는 이벤트
     * <pre>
     *   Left Component (Menu)를 클릭할 때 호출됨.
     * </pre>
     * @author minam.cho
     */
    addTab (menuName) {
      for (let index in this.openTabs) {
        let tab = this.openTabs[index];
        if (tab.title === menuName) {
          this.handleClick(tab);
          return false;
        }
      }
      this.openTabs.push({
        title: menuName,
        name: menuName,
        content: '<div>contents in Contents</div>'
      });
      this.selectedTab = menuName;
    },
    /**
     * Tab을 삭제할 때 발생하는 이벤트
     * @author minam.cho
     */
    removeTab (tabTitle) {
      let tabs = this.openTabs;
      if (this.openTabs.length <= 1) {
        alert('더 이상 삭제할 수 없습니다.');
        return false;
      } else {
        this.openTabs = tabs.filter(tab => tab.title !== tabTitle);
        if (this.openTabs.length >= 1) {
          const latestTabIndex = this.openTabs.length - 1;
          this.handleClick(this.openTabs[latestTabIndex]);
        }
      }
    },
    /**
     * Tab을 선택했을 때 발생하는 이벤트
     * @author minam.cho
     */
    handleClick (tab) {
      this.selectedTab = tab.name;
      this.$router.push({name: tab.name});
    },
    menuCollapseHandle () {
      this.isLeftShow = !this.isLeftShow;
    }
  }
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
  .slide-leave-active {
    transition: 1s;
  }
  .slide-enter-active {
    transition: 1s;
  }
  .slide-enter {
    transform: translate(100%, 100);
  }
  .slide-leave-to {
    transform: translate(-100%, 0);
  }
</style>
