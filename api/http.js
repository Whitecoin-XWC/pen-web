export default (axios) => {
  return {
    // Query xwc contract address
    queryAddr: (params) => {
      return axios.get(`${process.env.BASE_URL}/node-balance/query/${params}`)
    },
    // Query xwc contract address
    fetchAddr: (params) => {
      return axios.get(`${process.env.BASE_URL}/node-balance/fetch/${params}`)
    },
  }
}
