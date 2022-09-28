import { WeeklyCallResponse, FiveDaysCallResponse, HistoricalCallResponse } from './interfaces'
import dayjs from 'dayjs'

export const getModifiedWeeklyData = (weeklyData: WeeklyCallResponse) => {
  if (weeklyData.daily.length === 8) weeklyData.daily.pop()

  return weeklyData.daily.map((item) => ({
    index: weeklyData.daily.indexOf(item),
    fullNameDay: dayjs(item.dt * 1000).format('dddd'),
    date: dayjs(item.dt * 1000).format('DD.MM'),
    tempDay: item.temp.day.toFixed(1),
    tempNight: item.temp.night.toFixed(1),
    dt: item.dt * 1000,
    windSpeed: (item.wind_speed * 3.6).toFixed(1),
    humidity: item.humidity.toFixed(1),
  }))
}

export const getModifiedHourlyData = (
  fiveDays: FiveDaysCallResponse,
  historical: HistoricalCallResponse,
  weekly: WeeklyCallResponse,
  day: { value: dayjs.Dayjs; dayIndex: number }
) => {
  const hourlyData = {
    today: [...historical.hourly, ...weekly.hourly],
    fiveDays: fiveDays.list,
  }

  const data =
    day.dayIndex < 2
      ? {
          list: hourlyData.today
            .filter((item) => dayjs(item.dt * 1000).date() === day.value.date())
            .filter((item, index, arr) => index === arr.findIndex((element) => element.dt === item.dt))
            .map((item) => ({
              type: 'today' as 'today',
              date: dayjs(item.dt * 1000).format('DD.MM'),
              hour: dayjs(item.dt * 1000).format('HH:mm'),
              dt: item.dt * 1000,
              temp: item.temp.toFixed(1),
              humidity: item.humidity.toString(),
              pressure: item.pressure.toString(),
              windSpeed: (item.wind_speed * 3.6).toFixed(1),
              weather: item.weather[0].main,
            })),
        }
      : {
          list: hourlyData.fiveDays
            .filter((item) => dayjs(item.dt * 1000).date() === day.value.date())
            .map((item) => ({
              type: 'fiveDays' as 'fiveDays',
              date: dayjs(item.dt * 1000).format('DD.MM'),
              hour: dayjs(item.dt * 1000).format('HH:mm'),
              dt: item.dt * 1000,
              temp: item.main.temp.toFixed(1),
              humidity: item.main.humidity.toString(),
              pressure: item.main.pressure.toString(),
              windSpeed: (item.wind.speed * 3.6).toFixed(1),
              weather: item.weather[0].main,
            })),
          alert: true,
        }

  return data
}
