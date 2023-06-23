import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import rectangleImg from './assets/img/Rectangle 2.jpg'
import MemoCloudIcon from './assets/icon/CloudIcon';
import MemoSunIcon from './assets/icon/SunIcon';
import MemoRainIcon from './assets/icon/RainIcon';
import Biarritz from './assets/icon/Location.png'
import Sun from './assets/img/Sun.png'
import Select from 'react-select'
import { debounce } from 'lodash';

const apiKey = '388d0661a1ff42b3ad9144354230906';

interface SearchResult {
  value: string;
  label: string;

  location: {
    name: string,
    country: string,
  }
  current: {
    condition: {
      last_updated: string,
      icon: string,
      temp_c: number,
      wind_kph: number,
      text: string,
      humidity: number,
      precip_in: number,
    }
  }
  forcast: {
    forcastday:{
      current: {
        condition: {
          date: Date,
          temp_c: number,
          icon: string
        }
      }
    }
  }
}

function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const [Whether, setWhether] = useState({})
  const [weatherData, setWeatherData] = useState<SearchResult | null>(null);
  const [Wether, setWether] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any>([]);
  const [selectedLocation, setSelectedLocation] = useState("")
  const [currentData, setCurrentData] = useState<any | null >(null)
  const [forcastData, setforcastData] = useState<any[]>([])

  const onSelectChange = (option: any) => {
    setSelectedLocation(option.value)
  }

  const formatCurrentData =  (data: any) => {
    if (data && data.location && data.current && data.current.condition) {
      const name = data.location.name;
      const country = data.location.country;
      const temp = data.current.temp_c;
      const condition = data.current.condition.text;
      const icon = data.current.condition.icon.toString();
      const wind = data.current.wind_kph;
      const date = data.current.last_updated
      const humidity = data.current.humidity;
      const precip_in = data.current.precip_mm;

      return {
        name,
        country,
        condition,
        date,
        temp,
        icon,
        wind,
        humidity,
        precip_in
      };
    }
  }

  const formatForcastData = (data: any) => {
    const formatedArray = []
    const temp = data?.forecast?.forecastday
    for (const item of temp){
      formatedArray.push({
        icon: item.day.condition.icon,
        temp: item.day.avgtemp_c,
        date: item.date
      })
    }
  return formatedArray
  }

  const SubmitPressed = async () => {
    const url = `http://api.weatherapi.com/v1/forecast.json?key=388d0661a1ff42b3ad9144354230906&q=${selectedLocation}&days=4&aqi=no&alerts=no`
    const response = await fetch(url);
    const data = await response.json();

    // console.log('data', data);
    const currentData = formatCurrentData(data) 
    // console.log('current',currentData);
    const forcastData = formatForcastData(data) 
    // console.log(forcastData)
    // if (!data.error) {
    //   const result: SearchResult = {
    //     value: selectedLocation,
    //     label: selectedLocation,
    //     location: {
    //       name: data.location.name,
    //       country: data.location.country
    //     },
    //     current: {
    //       condition: {
    //         last_updated: data.current.condition.last_updated,
    //         icon: data.current.condition.icon,
    //         temp_c: data.current.temp_c,
    //         wind_kph: data.current.wind_kph,
    //         text: data.current.condition.text,
    //         humidity: data.current.condition.humidity,
    //         precip_in: data.current.condition.precip_in
    //       }
    //     },
    //     forcast: {
    //       forcastday: {
    //         current: {
    //           condition: {
    //             date: data.current.date,
    //             icon: data.current.condition.icon.toString(),
    //             temp_c: data.current.temp_c
    //           }
    //         }
    //       }
    //     }

      

      // setWeatherData(result);
      // const precipitation = data.current.condition.precip_in;
      // const humidity = data.current.humidity;
      // const wind = data.current.wind_kph;

      // // console.log('Precipitation:', precipitation);
      // // console.log('Humidity:', humidity);
      // // console.log('Wind:', wind);
    setCurrentData(currentData)
      
    setforcastData(forcastData) 

    modalClose();
  };


  // const SubmitPressed = async () => {
  //   let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedLocation}`;
  //   let response = await fetch(url);
  //   let data = await response.json();
  //   // console.log('resilts pagination', data);
  //   setWether(data)
  //   modalClose()
  // }

  // const handelOnchange = async() => {
  //   let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;
  //   // setwether({ loading: true });
  //   let response = await fetch(url);
  //   let data = await response.json();
  //   // console.log('resilts', data);

  //   setWether({
  //     articles: data.articles,

  //   });
  // }

  const modalOpen = () => {
    setModalVisible(true)
  }

  const modalClose = () => {
    setModalVisible(false)
  }

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);



  const performSearch = async (query: string) => {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`);
    const data = await response.json();
    // setSearchResults(data);
    // console.log('data', data);

    if (!data.error) {
      if (data.location.name) {
        const value = { value: data.location.name, label: data.location.name };
        setSearchResults([value]); // Update searchResults with a new array containing only the latest value
      } else {
        setSearchResults([]); // Clear searchResults if there are no valid results
      }
    } else {
      setSearchResults([]); // Clear searchResults if there is an error
    }
  };
  // console.log('search', searchResults);

  // Wrap the performSearch function with debounce to create a debounced version
  const debouncedSearch = debounce(performSearch, 300);


  const handleInputChange = (value: any) => {
    // // console.log('val',value);
    setSearchTerm(value);

    debouncedSearch(value);
  };

  return (
    <div className="flex justify-center items-center bg-gray-700 w-[100vw] h-[100vh]">
      <div className="h-[56%] w-[43%] flex justify-center bg-[#222831] rounded-2xl">
        <div className='h-full w-full flex items-center lg:flex-row flex-col relative' >
          <img src={rectangleImg} alt="Background" className="h-[106%]" />
          {currentData && (
            <div className="absolute text-white h-full p-5 flex flex-col justify-between">
              <div>
                <p className=" font-bold text-2xl" style={{ fontFamily: 'Montserrat' }}>Tuesday</p>
                <p className=" font-bold text-sm" style={{ fontFamily: 'Montserrat' }}>{currentData.date}</p>
                <div className='absolute text-white h-full '>
                  <img src={Biarritz} alt='' className='h-3 m-1'></img>
                </div>
                <p className=" font-bold text-xs pl-4 m-1" style={{ fontFamily: 'Montserrat' }}>{currentData.name}, {currentData.country}</p>
              </div>
              <div>
                {/* <p className=" font-bold text-2xl" style={{ fontFamily: 'Montserrat' }}></p> */}
                <img src={currentData.icon} alt='' className='h-16' />
                <p className=" font-bold text-2xl" style={{ fontFamily: 'Montserrat' }}>{currentData.temp || "06"} °C</p>

                <p className=" font-bold text-xl m-1" style={{ fontFamily: 'Montserrat' }}>{currentData.condition}</p>
              </div>
            </div>
          )}
          {/* {weatherData && ( */}
          <div className='flex flex-col gap-2 mt-3 self-start p-6'>
            {currentData && (
              <>
                <div className='flex justify-between'>
                  <h1 className='text-white font-Montserrat text-xl font-medium' style={{ fontFamily: 'Montserrat' }}>PRECIPITATION</h1>
                  <h1 className='text-white font-Montserrat text-xl font-medium' style={{ fontFamily: 'Montserrat' }}>
                    {currentData.precip_in}%
                  </h1>
                </div>
                <div className='flex justify-between'>
                  <h1 className='text-white font-Montserrat text-xl font-medium' style={{ fontFamily: 'Montserrat' }}>HUMIDITY</h1>
                  <h1 className='text-white font-Montserrat text-xl font-medium' style={{ fontFamily: 'Montserrat' }}>
                    {currentData.humidity}%
                  </h1>
                </div>
                <div className='flex justify-between'>
                  <h1 className='text-white font-Montserrat text-xl font-medium' style={{ fontFamily: 'Montserrat' }}>WIND</h1>
                  <h1 className='text-white font-Montserrat text-xl font-medium' style={{ fontFamily: 'Montserrat' }}>
                    {currentData.wind}km/h
                  </h1>
                </div>
              </>
            )}

            <div className="container flex mt-5 lg:flex-row gap-1 items-center justify-center">
              {forcastData.map((item,index) => {
                return (<div key={index} className="h-[120px] w-[70px] bg-white rounded-md">
                  <img src={item.icon}  className='h-12 m-3' />
                  <p className='text-center font-bold text-sm'>
                    Tue</p>
                  <p className='text-center font-bold text-[#000] text-sm'>{item.temp} °C</p>
                </div>)
              })
              
            }
            </div>
            <div className='h-[40px] w-full text-center mt-10 items-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 '>
              <input type="submit" onClick={modalOpen} className='mt-1 cursor-pointer text-lg text-[#FFFFFF]' value="Change Location" style={{ fontFamily: 'Montserrat' }} />
            </div>
          </div>
          {/* )} */}

          {modalVisible &&
            <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-80 backdrop-blur-sm">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 bg">

                  <div className="relative transform rounded-lg bg-blue-400 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-blue-300 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                          </svg>
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <h3 className='mb-2 font-semibold'>Enter the Location Here !!</h3>
                          {/* <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title"><input type="text" name="" id="" /></h3> */}
                          <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isDisabled={isDisabled}
                            isLoading={isLoading}
                            isClearable={isClearable}
                            isRtl={isRtl}
                            isSearchable={isSearchable}
                            name="value"
                            onInputChange={(val: any) => handleInputChange(val)}
                            onChange={onSelectChange}
                            options={searchResults}
                          />
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button type="button" className="bg-[blue] border-1   ==inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-black shadow-xl  sm:ml-3 sm:w-auto" onClick={SubmitPressed}>Submit</button>
                      <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={modalClose}>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
