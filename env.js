module.exports = {
  dev: {
    MODE: 'dev',
    PORT: 10071,
    BASE_URL: 'http://123.129.224.30:29999/api',
    WS_URL: 'http://192.168.5.118:8087/server',
    TOOLS_URL: 'http://112.47.58.10:8888',
  },
  qa: {
    MODE: 'qa',
    PORT: 10071,
    BASE_URL: 'http://123.129.224.30:29999/api',
    WS_URL: 'http://192.168.5.118:8087/server',
    TOOLS_URL: 'http://112.47.58.10:8888',
  },
  prod: {
    MODE: 'prod',
    PORT: 10071,
    BASE_URL: 'http://cms-api.tokenswap.info',
    WS_URL: 'http://192.168.5.118:8087/server',
    TOOLS_URL: 'http://112.47.58.10:8888',
  },
}
