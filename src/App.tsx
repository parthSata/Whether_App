import React from 'react';
import './App.css';
import rectangleImg from './assets/img/Rectangle 2.jpg'
import MemoCloudIcon from './assets/icon/CloudIcon';
import MemoSunIcon from './assets/icon/SunIcon';
import MemoRainIcon from './assets/icon/RainIcon';
import Biarritz from './assets/icon/Location.png'

function App() {
  return (
    <div className="flex justify-center items-center bg-gray-700 w-[100vw] h-[100vh]">
      <div className="h-[56%] w-[47%] flex justify-center bg-[#222831] rounded-2xl">
        <div className='h-full w-full flex items-center lg:flex-row flex-col relative' >
          <img src={rectangleImg} alt="Background" className="h-[106%]" />
          <div className="absolute text-white h-full p-5 border">
            <p className=" font-bold text-2xl" style={{ fontFamily: 'Montserrat' }}>Tuesday</p>
            <p className=" font-bold text-sm" style={{ fontFamily: 'Montserrat' }}>21 Jun 2022</p>
            <div className='absolute text-white h-full '>
              <img src={Biarritz} className='h-3 m-1'></img>
            </div>
            <p className=" font-bold text-xs pl-4 m-1" style={{ fontFamily: 'Montserrat' }}>Biarritz, FR</p>
          </div>
          <div className='flex flex-col gap-2 mt-3 self-start  p-6 `1'>
            <h1 className='container text-white font-Montserrat  text-xl font-medium' style={{ fontFamily: 'Montserrat', wordSpacing: '160px' }}>PRECEPTION  0%</h1>
            <h1 className='container text-white font-Montserrat text-xl	 font-medium' style={{ fontFamily: 'Montserrat', wordSpacing: '180px' }}>HUMIDITY   42%</h1>
            <h1 className='container text-white font-Montserrat text-xl	font-medium' style={{ fontFamily: 'Montserrat', wordSpacing: '200px' }}>WIND    3km/h</h1>

            <div className="container flex mt-5 lg:flex-row  pr-3">


              <div className="h-[120px] w-[70px] mr-1 mt-8  ml-6 bg-white rounded-md">
                <MemoSunIcon fill={'#000'} className='h-12 m-3 text-4xl' />
                <p className='text-center font-bold text-sm'>Tue</p>
                <p className='text-center font-bold text-[#000] text-sm'>30 °C</p>
              </div>


              <div className="h-[120px] w-[70px] mt-8 mr-1 bg-[#272E37]  rounded-md">
                <MemoRainIcon fill={'#fff'} className='h-12 m-3 text-4xl' />
                <p className='text-center font-bold text-sm text-[#FFFFFF]'>Wed</p>
                <p className='text-center font-bold text-sm text-[#FFFFFF]'>22 °C</p>
              </div>


              <div className="h-[120px] w-[70px] mt-8 mr-1 bg-[#272E37] rounded-md">
                <MemoCloudIcon fill={'#fff'} className='h-12 m-3 text-4xl' />
                <p className='text-center font-bold text-sm text-[#FFFFFF]'>Thu</p>
                <p className='text-center font-bold text-sm text-[#FFFFFF]'>06 °C</p>
              </div>


              <div className="h-[120px] w-[70px] mt-8 mr-1  bg-[#272E37] rounded-md">
                <MemoSunIcon fill={'#fff'} className='h-12 m-3 text-4xl' />
                <p className='text-center font-bold text-sm text-[#FFFFFF]'>Fri</p>
                <p className='text-center font-bold text-sm text-[#FFFFFF]'>26 °C</p>
              </div>


            </div>


            <div className='h-[40px] w-80 text-center mt-10 items-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 '>
              <input type="button" className='mt-1  text-lg text-[#FFFFFF] ' value="Change Location" style={{ fontFamily: 'Montserrat' }} />
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
