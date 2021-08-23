<template>
  <div class="addr">
    <div class="addr_title">Claim Earnings</div>
    <div class="addr_input">
      <el-input v-model="inputValue" type="text" placeholder="Enter XWC address"></el-input>
      <el-button :disabled="inputValue === '' ? true : false" @click="searchHiddle">Search</el-button>
    </div>
    <el-dialog v-if="queryData !== null" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="title">Claim Earnings</div>
      <div class="content">To be claimed：{{ queryData }} PEN</div>
      <el-button :disabled="queryData === null || Number(queryData) === 0 ? true : false" type="primary" @click="fetchHiddle">Claim</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      inputValue: '',
      dialogVisible: false,
    }
  },
  computed: {
    ...mapState('home', ['queryData']),
  },
  methods: {
    searchHiddle() {
      const reg = /^XWC[A-Za-z0-9]{34}$/
      if (reg.test(this.inputValue)) {
        this.$store.dispatch('home/get_queryAddr', this.inputValue)
        this.dialogVisible = true
      } else {
        this.$message({
          showClose: true,
          message: 'Please enter correct address',
          type: 'error',
        })
      }
    },
    handleClose() {
      this.dialogVisible = false
    },
    fetchHiddle() {
      this.$store.dispatch('home/get_fetchAddr', this.inputValue).then((res) => {
        if (res.code === 1) {
          this.$message({
            showClose: true,
            message: 'Successs',
            type: 'success',
          })
          this.dialogVisible = false
          this.inputValue = ''
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.addr {
  height: 114px;
  background: #f7d88b;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .addr_title {
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: #464d59;
  }
  .addr_input {
    display: flex;
    align-items: center;
    margin-top: 15px;
    .el-input {
      width: 285px;
      margin-right: 15px;
      /deep/ .el-input__inner {
        background: transparent;
        border: 1px solid #464d59;
        border-radius: 6px;
        color: #938c69;
        font-size: 14px;
        &::placeholder {
          color: #938c69;
        }
      }
    }
    /deep/ .el-button {
      background: transparent;
      border: 1px solid #464d59;
      border-radius: 6px;
      color: #938c69;
      font-size: 14px;
      &.is-disabled {
        background: #464d59;
      }
    }
  }
  /deep/ .el-dialog__body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 1px;
    .title {
      font-size: 18px;
      font-weight: 500;
      color: #464d59;
    }
    .content {
      font-size: 14px;
      font-weight: 500;
      color: #5f5fff;
      margin: 25px 1px;
    }
  }
  /deep/ .el-button--primary {
    &.is-disabled {
      background: #464d59;
      border: 1px solid #464d59;
    }
  }
}
</style>
