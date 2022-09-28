import dayjs from "dayjs";
import { createContext, ReactNode, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { FiveDaysCallResponse, HistoricalCallResponse, Location, WeeklyCallResponse } from "../interfaces";

export interface DataContextInterface {
    fiveDays: FiveDaysCallResponse | null
    historical: HistoricalCallResponse | null
    weekly: WeeklyCallResponse | null
    location: Location
    setLocation: React.Dispatch<React.SetStateAction<Location>>
}

export const DataContext = createContext<DataContextInterface | null>(null)

interface DataContextProviderProps {
    children: ReactNode
}

const DataContextProvider = ({ children }: DataContextProviderProps) => {
    const [location, setLocation] = useState<Location>({ id: 7531926, name: "Warszawa", coord: { lat: 52.233101, lon: 21.061399 } })

    const fiveDays = useFetch<FiveDaysCallResponse>(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.coord.lat}&lon=${location.coord.lon}&units=metric&appid=7189947ccc25f6a25458a36e75a42d6c`)
    const historical = useFetch<HistoricalCallResponse>(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${location.coord.lat}&lon=${location.coord.lon}&dt=${dayjs().subtract(10, 'minutes').unix()}&units=metric&appid=7189947ccc25f6a25458a36e75a42d6c`)
    const weekly = useFetch<WeeklyCallResponse>(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.coord.lat}&lon=${location.coord.lon}&exclude=minutely&units=metric&appid=7189947ccc25f6a25458a36e75a42d6c`)

    return (
        <DataContext.Provider value={{ fiveDays, historical, weekly, location, setLocation }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContextProvider;