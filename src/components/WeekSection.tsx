import { WeeklyCallResponse } from '../interfaces'
import { getModifiedWeeklyData } from '../utils'
import { Droplet, Sun, Moon, Wind, } from 'react-feather'
import { CardListItem } from './CardListItem'
import dayjs from 'dayjs'
import { InfoCard } from './InfoCard'

type WeekSectionProps = {
    data: WeeklyCallResponse
    handleClick: Function
}

export const WeekSection = ({ data, handleClick }: WeekSectionProps) => {
    const { list } = getModifiedWeeklyData(data)
    return (
        <div className="flex justify-between flex-col md:flex-row pb-2 mt-8 overflow-auto ">
            {list.map(item =>
                <InfoCard key={item.dt} date={item.date} dayName={item.fullNameDay}>
                    <ul>
                        <CardListItem iconTitle='Temperature Day' iconLabel='Temperature Day' Icon={Sun} iconStyles='fill-yellow-100'>{item.tempDay}°C</CardListItem>
                        <CardListItem iconTitle='Temperature Night' iconLabel='Temperature Night' Icon={Moon} iconStyles='fill-sky-100'>{item.tempNight}°C</CardListItem>
                        <CardListItem iconTitle='Wind Speed' iconLabel='Wind Speed' Icon={Wind}>{item.windSpeed} km/h</CardListItem>
                        <CardListItem iconTitle='Humidity' iconLabel='Humidity' Icon={Droplet} iconStyles='fill-sky-100'>{item.humidity} %</CardListItem>
                    </ul>
                    <button
                        disabled={list.indexOf(item) > 4 ? true : false}
                        title={list.indexOf(item) > 4 ? `More accurate data will be available at ${dayjs().add(list.indexOf(item), 'day').subtract(4, 'day').format('DD.MM.YYYY')}` : ''}
                        className={list.indexOf(item) > 4 ? 'mt-2 bg-zinc-300 border-zinc-400 rounded-md border-2 basis-4/5 font-medium leading-8' : 'mt-2 bg-white border-zinc-200 rounded-md border-2 basis-4/5 font-medium leading-8 transition-all hover:border-zinc-400'}
                        onClick={() => (handleClick(dayjs(item.dt), list.indexOf(item)))}>
                        More
                    </button>
                </InfoCard>
            )}
        </div>
    );
}