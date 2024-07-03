const os = require('os')

function resolveInterface (address) {
  for (const [name, infoArray] of Object.entries(os.networkInterfaces())) {
    for (const info of infoArray) {
      if (info.address === address) {
        return name
      }
    }
  }

  return undefined
}

module.exports = {
  resolveInterface
}
