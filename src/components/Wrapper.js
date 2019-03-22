import React, { useEffect, useState } from 'react';
import Porcupine from './porcupine';

const Wrapper = () => {
  // const obj = useWasm({
  //   url: './porcupine.js'
  // });
  // console.log(obj);
  // const { loading, error, data } = obj;
  // if (loading) return 'Loading...';
  // if (error) return 'An error has occurred';

  // const { module, instance } = data;
  // return <div>Hello World</div>;
  const [createfn, setCreateFn] = useState(null);
  useEffect(() => {
    const { create } = Porcupine();
    setCreateFn(create);
  }, []);
  return <div />;
};

export default Wrapper;
