import { useState } from 'react'
import { WeekSection } from './components/WeekSection'
import { DaySection } from './components/DaySection'
import dayjs from 'dayjs'
import Header from './components/Header'
import Title from './components/Title'

export const App = () => {
  const [day, setDay] = useState({ value: dayjs(), dayIndex: 0 })

  return (
    <>
      <Header />
      <main className='container p-4 mx-auto flex flex-col font-light text-black lg:px-4 md:pt-10 '>
        <Title />
        <WeekSection day={day} setDay={setDay} />
        <DaySection day={day} />
      </main>
    </>
  )
}
