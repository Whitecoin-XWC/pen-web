<template>
  <div class="nav">
    <div class="nav_all">
      <div class="logo" @click="homeUrl"></div>
      <div class="nav_right">
        <li><router-link to="/home" :class="$route.name === 'home' ? 'active' : ''">HOME</router-link></li>
        <li><router-link to="">Storage</router-link></li>
        <li><router-link to="">Mine</router-link></li>
        <li><router-link to="">Develop</router-link></li>
        <li><router-link to="">Blog</router-link></li>
        <li><router-link to="">FAQ</router-link></li>
        <li><router-link to="/about" :class="$route.name === 'about' ? 'active' : ''">About</router-link></li>
        <li><router-link to="">English</router-link></li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    homeUrl() {
      this.$router.push('/home')
    },
  },
}
</script>

<style scoped lang="scss">
.nav {
  background: #000000;
  height: 50px;
  .nav_all {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo {
      width: 107px;
      height: 38px;
      background: url(../assets/img/home/logo.png) no-repeat;
      background-size: cover;
      cursor: pointer;
    }
    .nav_right {
      display: flex;
      align-items: center;
      justify-content: space-between;
      li {
        color: #e5e5e5;
        width: 90px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
        a {
          color: #e5e5e5;
          font-size: 12px;
          transition: 0.5s;
          font-weight: 400;
          &:hover,
          &.active {
            color: #ffffff;
            font-size: 16px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
