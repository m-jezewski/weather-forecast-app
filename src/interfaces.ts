import dayjs from 'dayjs'

interface City {
  id?: number
  name: string
  coord: {
    lat: number
    lon?: number
  }
  lon?: number
}

interface Day {
  value: dayjs.Dayjs
  dayIndex: number
}

interface WeeklyDataItem {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  temp: {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  feels_like: {
    day: number
    night: number
    eve: number
    morn: number
  }
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  clouds: number
  pop: number
  rain: number
  uvi: number
}

interface FiveDaysDataItem {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  clouds: {
    all: number
  }
  wind: {
    speed: number
    deg: number
    gust: number
  }
  visibility: number
  pop: number
  sys: {
    pod: string
  }
  dt_txt: string
}

interface HourlyDataItem {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
  pop: number
}

interface ModifiedDaysData {
  list: {
    index: number
    fullNameDay: string
    date: string
    tempDay: string
    tempNight: string
    dt: number
    windSpeed: string
    humidity: string
  }[]
}

interface ModifiedHourlyData {
  list: {
    type: 'today' | 'fiveDays'
    date: string
    hour: string
    dt: number
    temp: string
    humidity: string
    pressure: string
    windSpeed: string
    weather: string
  }[]
  alert?: boolean
}

interface WeeklyCallResponse {
  current: {}
  daily: WeeklyDataItem[]
  hourly: HourlyDataItem[]
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
}

interface FiveDaysCallResponse {
  city: {}
  cnt: number
  cod: string
  list: FiveDaysDataItem[]
  message: number
}

interface HistoricalCallResponse {
  current: {}
  hourly: HourlyDataItem[]
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
}

interface fetchedData {
  fiveDays: FiveDaysCallResponse | null
  weekly: WeeklyCallResponse | null
  historical: HistoricalCallResponse | null
}

export type { ModifiedDaysData, WeeklyCallResponse, City, ModifiedHourlyData, Day, fetchedData }
