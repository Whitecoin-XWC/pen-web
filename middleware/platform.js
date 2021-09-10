export default function ({ route, req, redirect }) {
  if (route.path !== '/') {
    const UA = process.server ? req.headers['user-agent'] : navigator.userAgent
    if (/(iPhone|iPad|iPod|iOS|Android)/i.test(UA)) {
      if (!route.path.includes('/mobile')) {
        const newPath = route.path.replace('/pc', '/mobile')
        redirect(newPath)
      }
    } else if (!route.path.includes('/pc')) {
      const newPath = route.path.replace('/mobile', '/pc')
      redirect(newPath)
    }
  }
}
