import React from 'react';
import Lottie from 'react-lottie';
import loaderAnimation from "@/data/react.json"

const Anime = () => {
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
      <Lottie options={defaultOptions} height={30} width={30} />
    </div>
  );
};

export default Anime;
