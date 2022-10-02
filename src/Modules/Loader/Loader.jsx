import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

const Loader = () => {
  const style = { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
  return (
    <div style={style}>
      <MutatingDots
        height="100"
        width="100"
        color="#138496"
        secondaryColor="#67c3d0"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        className="loader"
      />
    </div>
  );
};

export default Loader;
