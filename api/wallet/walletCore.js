// import { add, subtract, divide, multiply, curry } from 'ramda'
import Tools from '~/api/wallet/walletTools'
import { walletAddress } from '~/api/wallet/walletConfig'

export default class Wallet {
  xwcpay = null
  nodeClient = null
  AuctionCycle = 14400

  constructor() {
    const XwcPay = window.require('xwcpay')
    this.xwcpay = new XwcPay()
  }

  /**
   * Determine whether to install the wallet plugin
   * @returns Whether to install the plug-in
   */
  checkInstalled() {
    if (typeof XwcExtWallet !== 'undefined') {
      return true
    } else {
      return false
    }
  }

  /**
   * Connect wallet
   * @returns Wallet address
   */
  connectWallet() {
    return new Promise((resolve) => {
      this.xwcpay.onConnectedWallet().then(
        () => {
          this.xwcpay.getConfig().then(
            (config) => {
              if (config) {
                window.xwc_js.ChainConfig.setChainId(config.chainId)
                const apisInstance = window.xwc_js.Apis.instance(config.network, true)
                this.nodeClient = new window.xwc_js.NodeClient(apisInstance)
                this.xwcpay.getUserAddress().then(
                  ({ address, pubKey, pubKeyString }) => {
                    walletAddress.address = address
                    walletAddress.pubKey = pubKey
                    walletAddress.pubKeyString = pubKeyString
                    if (address) {
                      this.nodeClient.afterInited().then(
                        () => {
                          const payload = {
                            isWalletInited: true,
                            walletAddress,
                          }
                          resolve(Tools.doResultData('0', payload, '', 'Connect wallet'))
                        },
                        () => {
                          const payload = {
                            isWalletInited: false,
                            walletAddress: null,
                          }
                          resolve(Tools.doResultData('6', payload, 'Wallet connection is abnormal', 'Connect wallet'))
                        },
                      )
                    } else {
                      const payload = {
                        isWalletInited: false,
                        walletAddress: null,
                      }
                      resolve(Tools.doResultData('5', payload, 'Wallet connection is abnormal', 'Connect wallet'))
                    }
                  },
                  () => {
                    const payload = {
                      isWalletInited: false,
                      walletAddress: null,
                    }
                    resolve(Tools.doResultData('4', payload, 'Wallet connection is abnormal', 'Connect wallet'))
                  },
                )
              } else {
                const payload = {
                  isWalletInited: false,
                  walletAddress: null,
                }
                resolve(Tools.doResultData('3', payload, 'Wallet connection is abnormal', 'Connect wallet'))
              }
            },
            () => {
              const payload = {
                isWalletInited: false,
                walletAddress: null,
              }
              resolve(Tools.doResultData('2', payload, 'Wallet connection is abnormal', 'Connect wallet'))
            },
          )
        },
        () => {
          const payload = {
            isWalletInited: false,
            walletAddress: null,
          }
          resolve(Tools.doResultData('1', payload, 'Wallet connection is abnormal', 'Connect wallet'))
        },
      )
    })
  }
}
