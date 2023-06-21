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
  // Define the structure of your search result object
  value: string;
  label: string;
  // Add more properties as needed
  location: {
    name: string,
    country: string,
  }
  current: {
    condition: {
      temp_c: number,
      wind_kph: number,
      text : string,
    }

  }
}

function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const [Whether, setWhether] = useState({})
  const [weatherData, setWeatherData] = useState(null);
  const [Wether, setWether] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<any>([]);
  const [selectedLocation, setSelectedLocation] = useState("")
  const [CurrentData, setCurrentData] = useState('')
  const [forcastData, setforcastData] = useState('')

  const onSelectChange = (option: any) => {
    setSelectedLocation(option.value)
  }

  const formatCurrentData = async(data: any) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedLocation}`;
    let response = await fetch(url);
    let db = await response.json();
    console.log('database',db);

    const name = data.location.name
    const country = data.location.country
    const date = data.current.date
    const temp = data.current.name
    const condition = data.current.condition.text
    const icon = data.current.condition.icon
    const wind = data.current.wind_kph
    const humidity = data.current.humidity
    const preciption = data.current.precip_nm

    setCurrentData(data.)
  }

  const SubmitPressed = async () => {
    let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${selectedLocation}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log('resilts pagination', data);
    setWether(
      data)
    modalClose()
  }

  useEffect(() => {
    // Fetch weather data from the API
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=paddhari`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, [apiKey]);

  // const handelOnchange = async() => {
  //   let url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;
  //   // setwether({ loading: true });
  //   let response = await fetch(url);
  //   let data = await response.json();
  //   console.log('resilts', data);

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
    console.log('data', data);

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
  console.log('search', searchResults);

  // Wrap the performSearch function with debounce to create a debounced version
  const debouncedSearch = debounce(performSearch, 300);


  const handleInputChange = (value: any) => {
    // console.log('val',value);
    setSearchTerm(value);

    // Call the debounced search function after the user stops typing for 300ms
    debouncedSearch(value);
  };

  return (
    <div className="flex justify-center items-center bg-gray-700 w-[100vw] h-[100vh]">
      <div className="h-[56%] w-[43%] flex justify-center bg-[#222831] rounded-2xl">
        <div className='h-full w-full flex items-center lg:flex-row flex-col relative' >
          <img src={rectangleImg} alt="Background" className="h-[106%]" />
          <div className="absolute text-white h-full p-5 flex flex-col justify-between">
            <div>
              <p className=" font-bold text-2xl" style={{ fontFamily: 'Montserrat' }}>Tuesday</p>
              <p className=" font-bold text-sm" style={{ fontFamily: 'Montserrat' }}>21 Jun 2022</p>
              <div className='absolute text-white h-full '>
                <img src={Biarritz} alt='' className='h-3 m-1'></img>
              </div>
              <p className=" font-bold text-xs pl-4 m-1" style={{ fontFamily: 'Montserrat' }}>Biarritz, FR</p>
            </div>
            <div>
              {/* <p className=" font-bold text-2xl" style={{ fontFamily: 'Montserrat' }}></p> */}
              <img src={Sun} alt='' className='h-16' />
              <p className=" font-bold text-2xl" style={{ fontFamily: 'Montserrat' }}>06 °C</p>

              <p className=" font-bold text-xl m-1" style={{ fontFamily: 'Montserrat' }}>Sunny</p>
            </div>
          </div>

          <div className='flex flex-col gap-2 mt-3 self-start  p-6'>
            <div className='flex justify-between '>
              <h1 className=' text-white font-Montserrat  text-xl font-medium' style={{ fontFamily: 'Montserrat', }}>PRECEPTION
              </h1>
              <h1 className=' text-white font-Montserrat  text-xl font-medium' style={{ fontFamily: 'Montserrat', }}>0%
              </h1>
            </div>
            <div className='flex justify-between '>
              <h1 className=' text-white font-Montserrat text-xl	 font-medium' style={{ fontFamily: 'Montserrat', }}>HUMIDITY</h1>
              <h1 className=' text-white font-Montserrat  text-xl font-medium' style={{ fontFamily: 'Montserrat', }}>42%
              </h1>
            </div>
            <div className='flex justify-between '>
              <h1 className=' text-white font-Montserrat text-xl	font-medium' style={{ fontFamily: 'Montserrat', }}>WIND</h1>
              <h1 className=' text-white font-Montserrat text-xl	font-medium' style={{ fontFamily: 'Montserrat', }}>3km/h</h1>
            </div>

            <div className="container flex mt-5 lg:flex-row gap-1 items-center justify-center">

              <div className="h-[120px] w-[70px] bg-white rounded-md">
                <MemoSunIcon fill={'#000'} className='h-12 m-3 text-4xl' />
                <p className='text-center font-bold text-sm'>Tue</p>
                <p className='text-center font-bold text-[#000] text-sm'>30 °C</p>
              </div>

              <div className="h-[120px] w-[70px] bg-[#272E37]  rounded-md">
                <MemoRainIcon fill={'#fff'} className='h-12 m-3 text-4xl' />
                <p className='text-center font-bold text-sm text-[#FFFFFF]'>Wed</p>
                <p className='text-center font-bold text-sm text-[#FFFFFF]'>22 °C</p>
              </div>


              <div className="h-[120px] w-[70px] bg-[#272E37] rounded-md">
                <MemoCloudIcon fill={'#fff'} className='h-12 m-3 text-4xl' />
                <p className='text-center font-bold text-sm text-[#FFFFFF]'>Thu</p>
                <p className='text-center font-bold text-sm text-[#FFFFFF]'>06 °C</p>
              </div>

              <div className="h-[120px] w-[70px] bg-[#272E37] rounded-md">
                <MemoSunIcon fill={'#fff'} className='h-12 m-3 text-4xl' />
                <p className='text-center font-bold text-sm text-[#FFFFFF]'>Fri</p>
                <p className='text-center font-bold text-sm text-[#FFFFFF]'>26 °C</p>
              </div>

            </div>

            <div className='h-[40px] w-full text-center mt-10 items-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 '>
              <input type="submit" onClick={modalOpen} className='mt-1 cursor-pointer text-lg text-[#FFFFFF] ' value="Change Location" style={{ fontFamily: 'Montserrat' }} />
            </div>

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
    </div>
  );
}

export default App;
