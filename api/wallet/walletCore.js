// import { add, subtract, divide, multiply, curry } from 'ramda'
import Tools from '~/api/wallet/walletTools'
import { ContractAddress, walletAddress, walletGas, coinList } from '~/api/wallet/walletConfig'

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
   * @returns
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
   * @returns
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

  /**
   * Get the list of supported currencies
   * @returns
   */
  getCoinList() {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(async () => {
        const xwcRes = await this.getAddrBalances(walletAddress.address)
        for (const item in xwcRes) {
          if (xwcRes[item].asset_id === '1.3.0') {
            const xwcA = Tools.accSub(xwcRes[item].amount, 10000000)
            coinList.XWC.amount = xwcA > 0 ? `${xwcA}` : 0
            coinList.XWC.balances = Tools.accDiv(coinList.XWC.amount, coinList.XWC.precision)
          } else if (xwcRes[item].asset_id === '1.3.1') {
            coinList.BTC.amount = `${xwcRes[item].amount || 0}`
            coinList.BTC.balances = Tools.accDiv(coinList.BTC.amount, coinList.BTC.precision)
          } else if (xwcRes[item].asset_id === '1.3.2') {
            coinList.LTC.amount = `${xwcRes[item].amount || 0}`
            coinList.LTC.balances = Tools.accDiv(coinList.LTC.amount, coinList.LTC.precision)
          } else if (xwcRes[item].asset_id === '1.3.3') {
            coinList.ETH.amount = `${xwcRes[item].amount || 0}`
            coinList.ETH.balances = Tools.accDiv(coinList.ETH.amount, coinList.ETH.precision)
          } else if (xwcRes[item].asset_id === '1.3.4') {
            coinList.USDT.amount = `${xwcRes[item].amount || 0}`
            coinList.USDT.balances = Tools.accDiv(coinList.USDT.amount, coinList.USDT.precision)
          }
        }
        resolve(Tools.doResultData('0', coinList, '', 'Currency list'))
      })
    })
  }

  /**
   * @param {*} _tokenId The tokenId of the resource, generated by the backend
   * @param {*} _copyright Copyright fee (percentage)
   * @returns
   */
  issueNFT(_tokenId, _copyright) {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(async () => {
        const res = await this.safeMint(`${walletAddress.address},${_tokenId},${_copyright}`)
        resolve(Tools.doResultData('0', res, '', 'Perform NFT issuance'))
      })
    })
  }

  getTransferFee(_tokenId, _copyright) {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(async () => {
        let lastTradePrice = await this.queryLastTradePrice(`${_tokenId}`)
        lastTradePrice = JSON.parse(lastTradePrice)
        if (lastTradePrice[0] === '') {
          const res = {
            name: '',
            symbol: '',
            amount: '0',
            price: '0',
          }
          resolve(Tools.doResultData('0', res, '', 'Check transfer fees'))
        } else {
          const copyrightRate = Tools.accDiv(_copyright, 100)
          const price = Tools.accDiv(Tools.accMul(lastTradePrice[1], copyrightRate), coinList[lastTradePrice[0]].precision)
          const res = {
            name: lastTradePrice[0],
            symbol: coinList[lastTradePrice[0]].symbol,
            amount: lastTradePrice[1],
            price,
          }
          resolve(Tools.doResultData('0', res, '', 'Check transfer fees'))
        }
      })
    })
  }

  /**
   * Perform transfer NFT
   * @param {*} _tokenId
   * @param {*} _targetAddress
   * @param {*} _transferFee
   * @returns
   */
  transferNFT(_tokenId, _targetAddress, _transferFee) {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(async () => {
        const queryUserAssets = await this.queryUserAssets(`${walletAddress.address}`)
        const rechargeAmount = Tools.accSub(_transferFee.amount, queryUserAssets[_transferFee.symbol])
        if (rechargeAmount > 0) {
          await this.transferToContract(coinList[_transferFee.name].assetId, ContractAddress.NFTAddress(), _transferFee.price, '')
        }
        const res = await this.safeTransferFrom(`${walletAddress.address},${_targetAddress},${_tokenId}`)
        resolve(Tools.doResultData('0', res, '', 'Perform transfer NFT'))
      })
    })
  }

  createAuctionNFT(_tokenId, _coin, _price, _minAdd) {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(() => {
        this.approve(ContractAddress.AuctionAddress(), _tokenId).then(async () => {
          const price = parseInt(Tools.accMul(_price, coinList[_coin].precision))
          const minAdd = parseInt(Tools.accMul(_minAdd, coinList[_coin].precision))
          const res = await this.createAuction(`${_tokenId},${ContractAddress.NFTAddress()},${this.AuctionCycle},${price},${coinList[_coin].symbol},${minAdd}`)
          res.trxid = res.trx_id
          resolve(Tools.doResultData('0', res, '', 'Auction NFT-Create'))
        })
      })
    })
  }

  editAuctionNFT(_auctionId, _coin, _price, _minAdd) {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(async () => {
        const auctionInfo = await this.getAuction(`${_auctionId}`)
        const price = parseInt(Tools.accMul(_price, coinList[_coin].precision)).toString()
        if (auctionInfo.reservePrice !== price) {
          await this.setAuctionReservePrice(`${_auctionId},${price}`)
        }
        const minAdd = parseInt(Tools.accMul(_minAdd, coinList[_coin].precision)).toString()
        if (auctionInfo.minDeltaPrice !== minAdd) {
          await this.setAuctionMinDeltaPrice(`${_auctionId},${minAdd}`)
        }
        resolve(Tools.doResultData('0', null, '', 'Modify Auction NFT'))
      })
    })
  }

  bidAuctionNFT(_auctionId, _coin, _price) {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(async () => {
        const res = await this.transferToContract(coinList[_coin].assetId, ContractAddress.AuctionAddress(), _price, `${_auctionId}`)
        resolve(Tools.doResultData('0', res, '', 'Auction NFT-bid'))
      })
    })
  }

  endAuctionNFT(_auctionId) {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(async () => {
        const res = await this.endAuction(`${_auctionId}`)
        resolve(Tools.doResultData('0', res, '', 'Auction NFT-Receive'))
      })
    })
  }

  cancelAuctionNFT(_auctionId) {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(async () => {
        const res = await this.cancelAuction(`${_auctionId}`)
        resolve(Tools.doResultData('0', res, '', 'Auction NFT-Cancel'))
      })
    })
  }

  sellSaleNFT(_tokenId, _coin, _price) {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(() => {
        this.approve(ContractAddress.SaleAddress(), _tokenId).then(async () => {
          const price = parseInt(Tools.accMul(_price, coinList[_coin].precision))
          const res = await this.sellNft(`${_tokenId},${ContractAddress.NFTAddress()},${price},${coinList[_coin].symbol}`)
          resolve(Tools.doResultData('0', res, '', 'Sell NFT-Pending Order'))
        })
      })
    })
  }

  editSaleNFT(_tokenId, _coin, _price) {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(async () => {
        const price = parseInt(Tools.accMul(_price, coinList[_coin].precision))
        const res = await this.changeSellParam(`${_tokenId},${ContractAddress.NFTAddress()},${price},${coinList[_coin].symbol}`)
        resolve(Tools.doResultData('0', res, '', 'Sell NFT-modify price'))
      })
    })
  }

  buySaleNFT(_tokenId, _coin, _price) {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(async () => {
        const res = await this.transferToContract(coinList[_coin].assetId, ContractAddress.SaleAddress(), _price, `${ContractAddress.NFTAddress()},${_tokenId}`)
        resolve(Tools.doResultData('0', res, '', 'Sell NFT-Buy'))
      })
    })
  }

  cancelSaleNFT(_tokenId) {
    return new Promise((resolve) => {
      this.nodeClient.afterInited().then(async () => {
        const res = await this.revokeSellNft(`${_tokenId},${ContractAddress.NFTAddress()}`)
        resolve(Tools.doResultData('0', res, '', 'Sell NFT-Cancel'))
      })
    })
  }

  /// ======================================================================================================================================= ////
  /// ======================================================================================================================================= ////
  /// ======================================================================================================================================= ////
  /// ================================================================================================================================== ////
  /// ======================================================================================================================================= ////
  /// ======================================================================================================================================= ////
  /// ======================================================================================================================================= ////

  simulateCall(_contractAddress, _method, _args) {
    return new Promise((resolve, reject) => {
      this.xwcpay.simulateCall(walletGas.assetId, _contractAddress, '0', _method, _args, {
        gasPrice: walletGas.minGasPrice,
        gasLimit: walletGas.gasLimit,
        listener: (serialNumber, txid, name) => {
          if (name === 'txhash') {
            this.xwcpay.waitTransaction(this.nodeClient, txid, 60000).then(
              (wres) => {
                resolve(Tools.coreLog(wres, _method))
              },
              (err) => {
                reject(Tools.coreLog(err.message), _method)
              },
            )
          }
        },
      })
    })
  }

  invokeContractOffline(_contractAddress, _method, _args) {
    return new Promise((resolve, reject) => {
      this.nodeClient.invokeContractOffline(walletAddress.pubKey, _contractAddress, _method, _args).then(
        (res) => {
          resolve(Tools.coreLog(res, _method))
        },
        (err) => {
          reject(Tools.coreLog(err.message), _method)
        },
      )
    })
  }

  getAddrBalances(_walletAddress) {
    return new Promise((resolve, reject) => {
      this.nodeClient.getAddrBalances(_walletAddress).then(
        (res) => {
          resolve(Tools.coreLog(res, 'getAddrBalances'))
        },
        (err) => {
          reject(Tools.coreLog(err.message), 'getAddrBalances')
        },
      )
    })
  }

  approve(_contractAddress, _tokenId) {
    return new Promise((resolve, reject) => {
      this.nodeClient.invokeContractOffline(walletAddress.pubKey, ContractAddress.NFTAddress(), 'getApproved', `${_tokenId}`).then((res) => {
        if (res === _contractAddress) {
          resolve(Tools.coreLog('不需要授权', 'approve'))
        } else {
          this.xwcpay.simulateCall(walletGas.assetId, ContractAddress.NFTAddress(), '0', 'approve', `${_contractAddress},${_tokenId}`, {
            gasPrice: walletGas.minGasPrice,
            gasLimit: walletGas.gasLimit,
            listener: (serialNumber, txid, name) => {
              if (name === 'txhash') {
                this.xwcpay.waitTransaction(this.nodeClient, txid, 60000).then(
                  (wres) => {
                    resolve(Tools.coreLog(wres, 'approve'))
                  },
                  (err) => {
                    reject(Tools.coreLog(err.message), 'approve')
                  },
                )
              }
            },
          })
        }
      })
    })
  }

  transferToContract(_assetId, _contractAddress, _amount, _args) {
    return new Promise((resolve, reject) => {
      this.xwcpay.transferToContract(_assetId, _contractAddress, _amount, _args, {
        gasPrice: walletGas.minGasPrice,
        gasLimit: walletGas.gasLimit,
        listener: (serialNumber, txid, name) => {
          if (name === 'txhash') {
            this.xwcpay.waitTransaction(this.nodeClient, txid, 60000).then(
              (wres) => {
                resolve(Tools.coreLog(wres, 'transferToContract'))
              },
              (err) => {
                reject(Tools.coreLog(err.message), 'transferToContract')
              },
            )
          }
        },
      })
    })
  }

  safeMint(_args) {
    return new Promise((resolve, reject) => {
      this.xwcpay.simulateCall(walletGas.assetId, ContractAddress.NFTAddress(), '0', 'safeMint', _args, {
        gasPrice: walletGas.minGasPrice,
        gasLimit: walletGas.gasLimit,
        listener: (serialNumber, txid, name) => {
          if (name === 'txhash') {
            this.xwcpay.waitTransaction(this.nodeClient, txid, 60000).then(
              (wres) => {
                resolve(Tools.coreLog(wres, 'safeMint'))
              },
              (err) => {
                reject(Tools.coreLog(err.message), 'safeMint')
              },
            )
          }
        },
      })
    })
  }

  safeTransferFrom(_args) {
    return new Promise((resolve, reject) => {
      this.xwcpay.simulateCall(walletGas.assetId, ContractAddress.NFTAddress(), '0', 'safeTransferFrom', _args, {
        gasPrice: walletGas.minGasPrice,
        gasLimit: walletGas.gasLimit,
        listener: (serialNumber, txid, name) => {
          if (name === 'txhash') {
            this.xwcpay.waitTransaction(this.nodeClient, txid, 60000).then(
              (wres) => {
                resolve(Tools.coreLog(wres, 'safeTransferFrom'))
              },
              (err) => {
                reject(Tools.coreLog(err.message), 'safeTransferFrom')
              },
            )
          }
        },
      })
    })
  }

  createAuction(_args) {
    return new Promise((resolve, reject) => {
      this.xwcpay.simulateCall(walletGas.assetId, ContractAddress.AuctionAddress(), '0', 'createAuction', _args, {
        gasPrice: walletGas.minGasPrice,
        gasLimit: walletGas.gasLimit,
        listener: (serialNumber, txid, name) => {
          if (name === 'txhash') {
            this.xwcpay.waitTransactionWithAuction(this.nodeClient, txid, 60000).then(
              (wres) => {
                resolve(Tools.coreLog(wres[0], 'createAuction'))
              },
              (err) => {
                reject(Tools.coreLog(err.message), 'createAuction')
              },
            )
          }
        },
      })
    })
  }

  setAuctionReservePrice(_args) {
    return new Promise((resolve, reject) => {
      this.xwcpay.simulateCall(walletGas.assetId, ContractAddress.AuctionAddress(), '0', 'setAuctionReservePrice', _args, {
        gasPrice: walletGas.minGasPrice,
        gasLimit: walletGas.gasLimit,
        listener: (serialNumber, txid, name) => {
          if (name === 'txhash') {
            this.xwcpay.waitTransaction(this.nodeClient, txid, 60000).then(
              (wres) => {
                resolve(Tools.coreLog(wres, 'setAuctionReservePrice'))
              },
              (err) => {
                reject(Tools.coreLog(err.message), 'setAuctionReservePrice')
              },
            )
          }
        },
      })
    })
  }

  setAuctionMinDeltaPrice(_args) {
    return new Promise((resolve, reject) => {
      this.xwcpay.simulateCall(walletGas.assetId, ContractAddress.AuctionAddress(), '0', 'setAuctionMinDeltaPrice', _args, {
        gasPrice: walletGas.minGasPrice,
        gasLimit: walletGas.gasLimit,
        listener: (serialNumber, txid, name) => {
          if (name === 'txhash') {
            this.xwcpay.waitTransaction(this.nodeClient, txid, 60000).then(
              (wres) => {
                resolve(Tools.coreLog(wres, 'setAuctionMinDeltaPrice'))
              },
              (err) => {
                reject(Tools.coreLog(err.message), 'setAuctionMinDeltaPrice')
              },
            )
          }
        },
      })
    })
  }

  cancelAuction(_args) {
    return new Promise((resolve, reject) => {
      this.xwcpay.simulateCall(walletGas.assetId, ContractAddress.AuctionAddress(), '0', 'cancelAuction', _args, {
        gasPrice: walletGas.minGasPrice,
        gasLimit: walletGas.gasLimit,
        listener: (serialNumber, txid, name) => {
          if (name === 'txhash') {
            this.xwcpay.waitTransaction(this.nodeClient, txid, 60000).then(
              (wres) => {
                resolve(Tools.coreLog(wres, 'cancelAuction'))
              },
              (err) => {
                reject(Tools.coreLog(err.message), 'cancelAuction')
              },
            )
          }
        },
      })
    })
  }

  endAuction(_args) {
    return new Promise((resolve, reject) => {
      this.xwcpay.simulateCall(walletGas.assetId, ContractAddress.AuctionAddress(), '0', 'endAuction', _args, {
        gasPrice: walletGas.minGasPrice,
        gasLimit: walletGas.gasLimit,
        listener: (serialNumber, txid, name) => {
          if (name === 'txhash') {
            this.xwcpay.waitTransaction(this.nodeClient, txid, 60000).then(
              (wres) => {
                resolve(Tools.coreLog(wres, 'endAuction'))
              },
              (err) => {
                reject(Tools.coreLog(err.message), 'endAuction')
              },
            )
          }
        },
      })
    })
  }

  sellNft(_args) {
    return new Promise((resolve, reject) => {
      this.xwcpay.simulateCall(walletGas.assetId, ContractAddress.SaleAddress(), '0', 'sellNft', _args, {
        gasPrice: walletGas.minGasPrice,
        gasLimit: walletGas.gasLimit,
        listener: (serialNumber, txid, name) => {
          if (name === 'txhash') {
            this.xwcpay.waitTransaction(this.nodeClient, txid, 60000).then(
              (wres) => {
                resolve(Tools.coreLog(wres, 'sellNft'))
              },
              (err) => {
                reject(Tools.coreLog(err.message), 'sellNft')
              },
            )
          }
        },
      })
    })
  }

  changeSellParam(_args) {
    return new Promise((resolve, reject) => {
      this.xwcpay.simulateCall(walletGas.assetId, ContractAddress.SaleAddress(), '0', 'changeSellParam', _args, {
        gasPrice: walletGas.minGasPrice,
        gasLimit: walletGas.gasLimit,
        listener: (serialNumber, txid, name) => {
          if (name === 'txhash') {
            this.xwcpay.waitTransaction(this.nodeClient, txid, 60000).then(
              (wres) => {
                resolve(Tools.coreLog(wres, 'changeSellParam'))
              },
              (err) => {
                reject(Tools.coreLog(err.message), 'changeSellParam')
              },
            )
          }
        },
      })
    })
  }

  revokeSellNft(_args) {
    return new Promise((resolve, reject) => {
      this.xwcpay.simulateCall(walletGas.assetId, ContractAddress.SaleAddress(), '0', 'revokeSellNft', _args, {
        gasPrice: walletGas.minGasPrice,
        gasLimit: walletGas.gasLimit,
        listener: (serialNumber, txid, name) => {
          if (name === 'txhash') {
            this.xwcpay.waitTransaction(this.nodeClient, txid, 60000).then(
              (wres) => {
                resolve(Tools.coreLog(wres, 'revokeSellNft'))
              },
              (err) => {
                reject(Tools.coreLog(err.message), 'revokeSellNft')
              },
            )
          }
        },
      })
    })
  }

  balanceOf(_contractAddress, _args) {
    return new Promise((resolve, reject) => {
      this.nodeClient.invokeContractOffline(walletAddress.pubKey, _contractAddress, 'balanceOf', _args).then(
        (res) => {
          resolve(Tools.coreLog(res, 'balanceOf'))
        },
        (err) => {
          reject(Tools.coreLog(err.message), 'balanceOf')
        },
      )
    })
  }

  ownerOf(_args) {
    return new Promise((resolve, reject) => {
      this.nodeClient.invokeContractOffline(walletAddress.pubKey, ContractAddress.NFTAddress(), 'ownerOf', _args).then(
        (res) => {
          resolve(Tools.coreLog(res, 'ownerOf'))
        },
        (err) => {
          reject(Tools.coreLog(err.message), 'ownerOf')
        },
      )
    })
  }

  tokenOfOwnerByIndex(_args) {
    return new Promise((resolve, reject) => {
      this.nodeClient.invokeContractOffline(walletAddress.pubKey, ContractAddress.NFTAddress(), 'tokenOfOwnerByIndex', _args).then(
        (res) => {
          resolve(Tools.coreLog(res, 'tokenOfOwnerByIndex'))
        },
        (err) => {
          reject(Tools.coreLog(err.message), 'tokenOfOwnerByIndex')
        },
      )
    })
  }

  queryUserAssets(_args) {
    return new Promise((resolve, reject) => {
      this.nodeClient.invokeContractOffline(walletAddress.pubKey, ContractAddress.NFTAddress(), 'queryUserAssets', _args).then(
        (res) => {
          resolve(Tools.coreLog(res, 'queryUserAssets'))
        },
        (err) => {
          reject(Tools.coreLog(err.message), 'queryUserAssets')
        },
      )
    })
  }

  queryLastTradePrice(_args) {
    return new Promise((resolve, reject) => {
      this.nodeClient.invokeContractOffline(walletAddress.pubKey, ContractAddress.NFTAddress(), 'queryLastTradePrice', _args).then(
        (res) => {
          resolve(Tools.coreLog(res, 'queryLastTradePrice'))
        },
        (err) => {
          reject(Tools.coreLog(err.message), 'queryLastTradePrice')
        },
      )
    })
  }

  getAuction(_args) {
    return new Promise((resolve, reject) => {
      this.nodeClient.invokeContractOffline(walletAddress.pubKey, ContractAddress.AuctionAddress(), 'getAuction', _args).then(
        (res) => {
          resolve(Tools.coreLog(JSON.parse(res), 'getAuction'))
        },
        (err) => {
          reject(Tools.coreLog(err.message), 'getAuction')
        },
      )
    })
  }
}
