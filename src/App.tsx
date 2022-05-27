import { useState } from 'react'
import cityInfo from './CityData.json'
import { useFetch } from './hooks/useFetch'
import { FiveDaysCallResponse, WeeklyCallResponse, HistoricalCallResponse } from './interfaces'
import { WeekSection } from './components/WeekSection'
import { DaySection } from './components/DaySection'
import dayjs from 'dayjs'

export const App = () => {
  const [location, setLocation] = useState({ id: 7531926, name: "Warszawa", coord: { lat: 52.233101, lon: 21.061399 } })
  const [day, setDay] = useState({ value: dayjs(), dayIndex: 0 })
  const handleInputChange = (value: string) => {
    const city = cityInfo.filter((item) => item.name === value)[0]
    if (city) setLocation(city)
  }
  const historicalUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${location.coord.lat}&lon=${location.coord.lon}&dt=${dayjs().subtract(10, 'minutes').unix()}&units=metric&appid=7189947ccc25f6a25458a36e75a42d6c`
  const weeklyUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.coord.lat}&lon=${location.coord.lon}&exclude=minutely&units=metric&appid=7189947ccc25f6a25458a36e75a42d6c`
  const fiveDaysUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.coord.lat}&lon=${location.coord.lon}&units=metric&appid=7189947ccc25f6a25458a36e75a42d6c`
  const fiveDays = useFetch<FiveDaysCallResponse>(fiveDaysUrl)
  const historical = useFetch<HistoricalCallResponse>(historicalUrl)
  const weekly = useFetch<WeeklyCallResponse>(weeklyUrl)

  return (
    <>
      <header className='w-full p-4 flex top-0 justify-between items-center bg-violet-900 text-white z-50'>
        <p className='text-xl'>Weather Forecast</p>
        <span>
          <label htmlFor='city' className='mr-4'>Enter city name:</label>
          <input
            list="cities"
            id='city'
            placeholder='Enter City Name'
            onChange={(e) => { handleInputChange(e.target.value) }}
            className='bg-neutral-50 p-2 text-black' />
          <datalist id='cities'>
            {cityInfo.map(item => (
              <option value={item.name} key={item.id}>{item.name}</option>))}
          </datalist>
        </span>
      </header>
      <main className='container p-4 pt-14 mx-auto min-h-screen flex flex-col bg-neutral-50 font-light text-black'>
        <span className='flex items-center justify-between flex-col md:flex-row md:items-end'>
          <h2 className='text-6xl text-center sm:text-left '>
            {location.name} {`${dayjs().format('DD.MM.YYYY')}-${dayjs().add(6, 'day').format('DD.MM.YYYY')}`}
          </h2>
          <a
            href='https://github.com/Karriuz/weather-forecast'
            rel='noreferrer'
            target={'_blank'}
            className='text-xl font-normal mr-4 text-stone-600'>
            Github
          </a>
        </span>
        {weekly &&
          <WeekSection
            data={weekly}
            handleClick={(value: dayjs.Dayjs, dayIndex: number) => { setDay({ value, dayIndex }) }} />}
        {fiveDays && historical && weekly &&
          <DaySection
            fiveDays={fiveDays}
            historical={historical}
            weekly={weekly}
            day={day} />}
      </main>
    </>
  )
}
