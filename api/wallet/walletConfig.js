class ContractAddress {
  // NFT
  static NFTAddress() {
    if (process.env.MODE === 'prod') {
      return ''
    } else {
      return 'XWCCcSY8WGd2aQniEoEykstLirT13vGGLCmuD'
    }
  }

  // Auction contract
  static AuctionAddress() {
    if (process.env.MODE === 'prod') {
      return ''
    } else {
      return 'XWCCL6gkZMaRyoqGGLbtwAsTVsUvcY5gzGE5b'
    }
  }

  // Sale contract
  static SaleAddress() {
    if (process.env.MODE === 'prod') {
      return ''
    } else {
      return 'XWCCaVqMHoF6TxRz7a1z21kMnspS1Q3cWYosQ'
    }
  }
}
const walletAddress = {
  address: '',
  pubKey: '',
  pubKeyString: '',
}

const walletGas = {
  assetId: '1.3.0',
  minGasPrice: '0.001',
  gasLimit: 100000,
}

const coinList = {
  XWC: {
    name: 'XWC',
    assetId: '1.3.0',
    symbol: 'XWC',
    precision: 100000000,
    balances: '',
    amount: '',
  },
  LTC: {
    name: 'LTC',
    assetId: '1.3.2',
    symbol: 'LTC',
    precision: 100000000,
    balances: '',
    amount: '',
  },
  ETH: {
    name: 'ETH',
    assetId: '1.3.3',
    symbol: 'ETH',
    precision: 100000000,
    balances: '',
    amount: '',
  },
  USDT: {
    name: 'USDT',
    assetId: '1.3.4',
    symbol: 'ERCUSDT',
    precision: 1000000,
    balances: '',
    amount: '',
  },
}

export { ContractAddress, walletAddress, walletGas, coinList }
