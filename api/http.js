export default (axios) => {
  return {
    // 查询xwc合约地址
    queryAddr: (params) => {
      return axios.get(`${process.env.BASE_URL}/node-balance/query/${params}`)
    },
    // 查询xwc合约地址
    fetchAddr: (params) => {
      return axios.get(`${process.env.BASE_URL}/node-balance/fetch/${params}`)
    },
  }
}
