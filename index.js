import TransportNodeHid from "@ledgerhq/hw-transport-node-hid-singleton";
import Btc from "@ledgerhq/hw-app-btc";
import bitcoin from 'bitcoinjs-lib';
let btc;
// import { RegtestUtils } from 'regtest-client';
//
// const APIPASS = process.env.APIPASS || '123';
// const APIURL = process.env.APIURL || 'http://127.0.0.1:19000';
// const regtestUtils = new RegtestUtils({ APIPASS, APIURL })
//
// const network = regtestUtils.network // regtest network params
// console.log(network);
TransportNodeHid.create()
  .then((transport) => {
    btc = new Btc(transport);
    return btc.getWalletPublicKey("44'/1'/0'/0/0");
  })
  .then((publicKey) => {
    console.log(publicKey);

    return btc.signMessageNew("44'/60'/0'/0'/0", Buffer.from("test").toString("hex"))
  })
  .then(function(result) {
    let v = result['v'] + 27 + 4;
    let signature = Buffer.from(v.toString(16) + result['r'] + result['s'], 'hex').toString('base64');
    console.log("Signature : " + signature);
    console.log(result);
    return createTransaction()
  })
  .catch((e) => {
    console.log(e);
  });

function createTransaction(from, to, amount, fee, changeAddress) {
  return new Promise((resolve, reject) => {
    btc.createTransaction({
      inputs: [ [tx1, 1] ],
      associatedKeysets: ["0'/0/0"],
      outputScriptHex: "01905f0100000000001976a91472a5d75c8d2d0565b656a5232703b167d50d5a2b88ac"
    })
      .then(resolve)
      .catch(reject);
  });
}
