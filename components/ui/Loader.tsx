import React from 'react';
import Lottie from 'react-lottie';
import loaderAnimation from "@/data/loader.json"

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default Loader;
