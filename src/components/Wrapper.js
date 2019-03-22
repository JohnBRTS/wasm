import React from 'react';
import useWasm from '../useWasm/useWasm';

const Wrapper = () => {
  const obj = useWasm({
    url: '../public/wasm/pv_porcupine.js'
  });
  console.log(obj);
  const { loading, error, data } = obj;
  if (loading) return 'Loading...';
  if (error) return 'An error has occurred';

  const { module, instance } = data;
  return <div>Hello World</div>;
};

export default Wrapper;
