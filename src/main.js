import workerRTC from "worker-webrtc/window.js";

// Notice that this is vite's recommended way of creating WebWorkers
// https://vitejs.dev/guide/features.html#import-with-query-suffixes
import SmoldotWw from "./smoldot-ww?worker";
// Each bundler has a different preferred way of dealing with web-workers.

const worker = new SmoldotWw();
workerRTC(worker);

worker.onmessage = (e) => {
  console.log("message received");
  console.log(e);
};
