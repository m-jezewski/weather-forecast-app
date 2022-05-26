import dayjs from 'dayjs'
import { fetchedData } from '../interfaces'
import { Droplet, Wind, Thermometer, ChevronsDown, Cloud } from 'react-feather'
import { getModifiedHourlyData } from '../utils'
import { CardListItem } from './CardListItem'
import { InfoCard } from './InfoCard'

type DaySectionProps = {
    data: fetchedData
    day: {
        value: dayjs.Dayjs,
        dayIndex: number,
    }
}

export const DaySection = ({ data, day }: DaySectionProps) => {
    const { list, alert } = getModifiedHourlyData(data, day)

    return (
        <div className='p-6 mt-4 bg-indigo-100 rounded-2xl'>
            <div className='flex items-center justify-between flex-col md:flex-row'>
                <p className='text-4xl pl-4'>{`${day.value.format('DD')}.${day.value.format('MM')}.${day.value.format('YYYY')}`}</p>
                {alert && <p className='text-xl pl-8'>More accurate data for this day will be available at {day.value.subtract(1, 'day').format('DD.MM.YYYY')}</p>}
            </div>
            <div className="mt-2 flex justify-between overflow-x-auto flex-col md:flex-row">
                {list.map(item => (
                    <InfoCard
                        key={item.dt}
                        date={item.date}
                        hour={item.hour}
                        containerStyles={dayjs().date() === dayjs(item.dt).date() && dayjs().hour() === dayjs(item.dt).hour() ? ' ring-purple-600 ring-2 scale-95' : 'scale-95'}>
                        <ul>
                            <CardListItem iconTitle='Temperature' iconLabel='Temperature' liStyles='mt-0' iconStyles='fill-red-300' Icon={Thermometer}>{item.temp} °C</CardListItem>
                            <CardListItem iconTitle='Weather' iconLabel='Weather' liStyles='mt-0' Icon={Cloud}>{item.weather}</CardListItem>
                            <CardListItem iconTitle='Wind Speed' iconLabel='Wind Speed' liStyles='mt-0' Icon={Wind}>{item.windSpeed} km/h</CardListItem>
                            <CardListItem iconTitle='Humidity' iconLabel='Humidity' liStyles='mt-0' iconStyles='fill-sky-100' Icon={Droplet}>{item.humidity} %</CardListItem>
                            <CardListItem iconTitle='Pressure' iconLabel='Pressure' liStyles='mt-0' Icon={ChevronsDown}>{item.pressure} hPa</CardListItem>
                        </ul>
                    </InfoCard>
                ))}
            </div>
        </div>
    );
}