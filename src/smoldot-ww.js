import * as ww from "worker-webrtc/worker.js";
import chainSpec from "./polkadot.json";
import { start } from "smoldot";

Object.entries(ww).forEach(([key, val]) => {
  globalThis[key] = val;
});

globalThis.document = {
  addEventListener: () => {},
  removeEventListener: () => {},
};

(async () => {
  const client = await start();

  console.log(chainSpec);
  const chain = await client.addChain({
    chainSpec: JSON.stringify(chainSpec),
    potentialRelayChains: [],
  });

  // don't judge, ok? this is just for testing
  const listen = () => {
    chain.nextJsonRpcResponse().then((response) => {
      postMessage("got a response");
      postMessage(response);
      listen();
    });
  };
  listen();

  const rawRequest =
    '{"id":1,"jsonrpc":"2.0","method":"state_getKeys","params":["0x5f3e4907f716ac89b6347d15ececedca88dcde934c658227ee1dfafcd6e16903"]}';

  postMessage("sending request");
  chain.sendJsonRpc(rawRequest);
})();
