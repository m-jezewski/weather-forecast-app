interface Location {
  id: number
  name: string
  coord: {
    lat: number
    lon: number
  }
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

export type { WeeklyCallResponse, HistoricalCallResponse, FiveDaysCallResponse, Location }
