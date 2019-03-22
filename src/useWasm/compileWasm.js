const compileWasm = ({ url, bufferSource, importObject }) =>
  Promise.resolve().then(() => {
    let res;

    if (typeof url === 'string') {
      res = fetch(url, {
        headers: {
          'Content-Type': 'application/wasm'
        }
      });
      // commented out as it's throwing MIME type errors
      // if (WebAssembly.instantiateStreaming !== undefined) {
      //   console.log(
      //     'WebAssembly.instantiateStreaming !== undefined',
      //     WebAssembly.instantiateStreaming !== undefined
      //   );
      //   return WebAssembly.instantiateStreaming(res, importObject);
      // }
      res = res.then(response => response.arrayBuffer());
    } else if (bufferSource) {
      res = Promise.resolve(bufferSource);
    } else {
      throw new Error(
        "Can't instantiate WebAssembly module, invalid parameters."
      );
    }

    return res
      .then(buff => {
        console.log(buff);
        return WebAssembly.compile(buff);
      })
      .then(module => {
        return WebAssembly.instantiate(module, importObject).then(instance => ({
          module,
          instance
        }));
      });
  });

export default compileWasm;
