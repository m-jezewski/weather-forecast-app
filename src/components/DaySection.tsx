import dayjs from 'dayjs'
import { Droplet, Wind, Thermometer, ChevronsDown, Cloud } from 'react-feather'
import { getModifiedHourlyData } from '../utils'
import { CardListItem } from './CardListItem'
import { Card } from './Card'
import { useDataContext } from '../hooks/useDataContext'

type DaySectionProps = {
    day: {
        value: dayjs.Dayjs,
        dayIndex: number,
    }
}

export const DaySection = ({ day }: DaySectionProps) => {
    const { fiveDays, historical, weekly } = useDataContext()
    const hourlyData = fiveDays && historical && weekly && getModifiedHourlyData(fiveDays, historical, weekly, day)

    return (
        <section className='p-6 mt-4 from-indigo-100 via-blue-100 to-indigo-200 bg-gradient-to-br rounded-2xl'>
            <div className='flex items-center justify-between flex-col md:flex-row'>
                <p className='text-4xl pl-4'>{`${day.value.format('DD')}.${day.value.format('MM')}.${day.value.format('YYYY')}`}</p>
                {hourlyData?.alert && <p className='text-xl pl-8'>More accurate data for this day will be available at {day.value.subtract(1, 'day').format('DD.MM.YYYY')}</p>}
            </div>
            <div className="flex justify-between overflow-x-auto flex-col md:flex-row">
                {hourlyData?.list.map(item => (
                    <Card
                        key={item.dt}
                        date={item.date}
                        hour={item.hour}
                        containerStyles={dayjs().date() === dayjs(item.dt).date() && dayjs().hour() === dayjs(item.dt).hour() ? ' ring-purple-600 ring-2 scale-95' : 'scale-95'}>
                        <ul>
                            <CardListItem alt='Temperature' liStyles='mt-0' Icon={Thermometer} iconStyles='fill-red-300'>{item.temp} °C</CardListItem>
                            <CardListItem alt='Weather' liStyles='mt-0' Icon={Cloud}>{item.weather}</CardListItem>
                            <CardListItem alt='Wind Speed' liStyles='mt-0' Icon={Wind}>{item.windSpeed} km/h</CardListItem>
                            <CardListItem alt='Humidity' liStyles='mt-0' Icon={Droplet} iconStyles='fill-sky-100'>{item.humidity} %</CardListItem>
                            <CardListItem alt='Pressure' liStyles='mt-0' Icon={ChevronsDown}>{item.pressure} hPa</CardListItem>
                        </ul>
                    </Card>
                ))}
            </div>
        </section>
    );
}

