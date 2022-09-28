import { getModifiedWeeklyData } from '../utils'
import { Droplet, Sun, Moon, Wind, } from 'react-feather'
import { CardListItem } from './CardListItem'
import dayjs from 'dayjs'
import { Card } from './Card'
import { useDataContext } from '../hooks/useDataContext'

type WeekSectionProps = {
    setDay: React.Dispatch<React.SetStateAction<{
        value: dayjs.Dayjs;
        dayIndex: number;
    }>>
    day: { value: dayjs.Dayjs, dayIndex: number, }
}

export const WeekSection = ({ setDay, day }: WeekSectionProps) => {
    const { weekly } = useDataContext()
    const list = weekly && getModifiedWeeklyData(weekly)

    const handleClick = (value: dayjs.Dayjs, dayIndex: number) => {
        setDay({ value, dayIndex })
    }

    return (
        <section className="flex justify-between flex-col md:flex-row pb-2 mt-4 overflow-auto basis-auto">
            {list?.map(item =>
                <Card key={item.dt} date={item.date} dayName={item.fullNameDay} containerStyles={list.indexOf(item) === day.dayIndex ? 'ring-indigo-600 ring-2' : ''}>
                    <ul>
                        <CardListItem alt='Temperature Day' Icon={Sun} iconStyles='fill-yellow-100'>{item.tempDay}°C</CardListItem>
                        <CardListItem alt='Temperature Night' Icon={Moon} iconStyles='fill-sky-100'>{item.tempNight}°C</CardListItem>
                        <CardListItem alt='Wind Speed' Icon={Wind}>{item.windSpeed} km/h</CardListItem>
                        <CardListItem alt='Humidity' Icon={Droplet} iconStyles='fill-sky-100'>{item.humidity} %</CardListItem>
                    </ul>
                    <button
                        disabled={list.indexOf(item) > 4 ? true : false}
                        title={list.indexOf(item) > 4 ? `More accurate data will be available at ${dayjs().add(list.indexOf(item), 'day').subtract(4, 'day').format('DD.MM.YYYY')}` : ''}
                        className={`mt-2 rounded-md border-2 basis-4/5 font-medium leading-8 transition-all hover:border-zinc-400 ${list.indexOf(item) > 4 ? 'bg-zinc-300 border-zinc-400' : 'bg-white border-zinc-300'}`}
                        onClick={() => { handleClick(dayjs(item.dt), list.indexOf(item)) }}>
                        More
                    </button>
                </Card>
            )}
        </section>
    );
}