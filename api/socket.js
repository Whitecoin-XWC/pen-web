export default (socket) => {
  return {
    /** Subscribe to homepage news */
    subscribe_homepageInfo: (callback) => {
      return socket.subscribe('/topic/homepageInfo', (msg) => {
        if (msg.body) {
          const responseJSON = JSON.parse(msg.body)
          callback(responseJSON)
        }
      })
    },
  }
}
