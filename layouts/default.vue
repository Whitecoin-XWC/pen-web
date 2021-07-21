<template>
  <el-container>
    <el-header class="header">
      <MainHeader />
    </el-header>
    <el-main class="main">
      <Nuxt v-if="address.length" />
    </el-main>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState('global', ['address']),
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
.header {
  margin: 0;
  padding: 0;
  height: 117px !important;
}
.main {
  margin: 0;
  padding: 0;
}
</style>
