import React from 'react';
import rectangleImg from './assets/img/Rectangle 2.jpg';

function App() {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        <img src={rectangleImg} alt="Background" className="w-full h-auto" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-xl font-bold">Hello, World!</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
