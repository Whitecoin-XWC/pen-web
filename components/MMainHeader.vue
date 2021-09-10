<template>
  <div class="nav">
    <div class="top_all">
      <div class="logo" @click="homeUrl"></div>
      <div class="nav-right" @click="drawer = true"></div>
    </div>
    <el-drawer :visible.sync="drawer" :with-header="false" :modal-append-to-body="false" size="70%">
      <div class="nav-all">
        <div class="lang">
          <div class="lang-left"><span></span>English</div>
          <div class="el-icon-close" @click="handleClose"></div>
        </div>
        <el-menu :default-active="active" class="menu-ul" @select="handleClose">
          <template v-for="(item, index) in menuList">
            <template v-if="item.children && item.children.length > 0">
              <el-submenu :key="index" :index="`${item.id}`">
                <template slot="title">
                  <span slot="title">{{ item.label }}</span>
                </template>
                <nuxt-link v-for="(item2, index2) in item.children" :key="index2" :to="item2.path">
                  <el-menu-item :index="`${item2.id}`">
                    <span slot="title">{{ item2.label }}</span>
                  </el-menu-item>
                </nuxt-link>
              </el-submenu>
            </template>
            <template v-else>
              <a v-if="item.path.includes('://')" :key="index" :href="item.path" target="_blank">
                <el-menu-item :index="`${item.id}`">
                  <span slot="title">{{ item.label }}</span>
                </el-menu-item>
              </a>
              <nuxt-link v-else :key="item.path" :to="item.path">
                <el-menu-item :index="`${item.id}`">
                  <span slot="title">{{ item.label }}</span>
                </el-menu-item>
              </nuxt-link>
            </template>
          </template>
        </el-menu>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      menuList: [
        {
          path: '/mobile/home',
          id: 300,
          label: this.$t('HOME'),
          icon: '',
        },
        {
          path: process.env.TOOLS_URL,
          id: 301,
          label: this.$t('Tools'),
          icon: '',
        },
        {
          path: '/mobile/about',
          id: 302,
          label: this.$t('About'),
          icon: '',
        },
      ],
    }
  },
  computed: {
    active() {
      for (let i = 0; i < this.menuList.length; i++) {
        if (this.menuList[i].children && this.menuList[i].children.length > 0) {
          for (let j = 0; j < this.menuList[i].children.length; j++) {
            if (this.$route.path === this.menuList[i].children[j].path) {
              return `${this.menuList[i].children[j].id}`
            }
          }
        } else if (this.$route.path === this.menuList[i].path) {
          return `${this.menuList[i].id}`
        }
      }
      return ''
    },
  },
  methods: {
    logoHiddle() {
      this.$router.push('/mobile/home')
    },
    handleClose() {
      this.drawer = false
    },
    homeUrl() {
      this.$router.push('/mobile/home')
    },
    toolsHiddle() {
      window.open(process.env.TOOLS_URL)
    },
  },
}
</script>

<style scoped lang="scss">
.nav {
  background: #000000;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  .top_all {
    height: 60rem;
    padding: 0 25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 107rem;
      height: 38rem;
      background: url(@/assets/img/home/logo.png) no-repeat;
      background-size: cover;
      cursor: pointer;
    }
    .nav-right {
      width: 16rem;
      height: 13rem;
      background: url(@/assets/img/mobile/nav.png) no-repeat;
      background-size: cover;
      margin-left: 10rem;
    }
  }
}
.nav-all {
  padding: 20rem 15rem;
  .lang {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .lang-left {
      display: flex;
      align-items: center;
      font-size: 14rem;
      font-weight: 400;
      color: #787a8c;
      span {
        width: 17rem;
        height: 17rem;
        display: block;
        background: url(@/assets/img/mobile/lang.png) no-repeat;
        background-size: cover;
        margin-right: 5rem;
      }
    }
  }
  /deep/ .el-menu {
    border-right: none;
    .el-menu-item {
      height: 51rem;
      line-height: 51rem;
      background: #464d59;
      border-radius: 7rem;
      text-align: center;
      margin-top: 12rem;
      font-size: 16rem;
      font-weight: 300;
      color: #ffffff;
      &.is-active {
        font-weight: 700;
        color: #ffffff;
      }
    }
  }
}
</style>
