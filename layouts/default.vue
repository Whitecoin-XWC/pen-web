<template>
  <div>
    <div v-if="isShow">
      <PMainHeader />
      <Nuxt />
      <PMainFooter />
    </div>
    <div v-else>
      <MMainHeader />
      <Nuxt class="main" />
      <MMainFooter />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: null,
    }
  },
  mounted() {
    this.isShow = this.$device.desktop()
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.main {
  margin-top: 60rem;
}
</style>
