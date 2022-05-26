import { ModifiedDaysData, WeeklyCallResponse, ModifiedHourlyData, Day, fetchedData } from './interfaces'
import dayjs from 'dayjs'

export const getModifiedWeeklyData = (weeklyData: WeeklyCallResponse): ModifiedDaysData => {
  if (weeklyData.daily.length === 8) weeklyData.daily.pop()

  return {
    list: weeklyData.daily.map((item) => ({
      index: weeklyData.daily.indexOf(item),
      fullNameDay: dayjs(item.dt * 1000).format('dddd'),
      date: dayjs(item.dt * 1000).format('DD.MM'),
      tempDay: item.temp.day.toFixed(1),
      tempNight: item.temp.night.toFixed(1),
      dt: item.dt * 1000,
      windSpeed: (item.wind_speed * 3.6).toFixed(1),
      humidity: item.humidity.toFixed(1),
    })),
  }
}

export const getModifiedHourlyData = (fetchedData: fetchedData, day: Day): ModifiedHourlyData => {
  const hourlyData = {
    today: [...fetchedData.historical!.hourly, ...fetchedData.weekly!.hourly],
    fiveDays: fetchedData.fiveDays!.list,
  }

  const data: ModifiedHourlyData =
    day.dayIndex === 0 || day.dayIndex === 1
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
