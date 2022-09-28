import cityInfo from '../CityData.json'
import { useDataContext } from '../hooks/useDataContext'

const Header = () => {
    const { setLocation } = useDataContext()

    const handleInputChange = (value: string) => {
        const city = cityInfo.filter((item) => item.name === value)[0]
        if (city) setLocation(city)
    }

    return (
        <header className='w-full p-4 flex top-0 justify-center md:justify-between items-center from-indigo-900 to-violet-800 via-indigo-900 bg-gradient-to-r text-white z-50'>
            <p className='text-xl tracking-widest hidden md:block'>Weather Forecast</p>
            <label className='text-center'>
                Enter city name:
                <input
                    list="cities"
                    id='city'
                    placeholder='Enter City Name'
                    onChange={(e) => { handleInputChange(e.target.value) }}
                    className='bg-neutral-50 p-2 text-black mx-4' />
                <datalist id='cities'>
                    {cityInfo.map(item => (
                        <option value={item.name} key={item.id}>{item.name}</option>))}
                </datalist>
            </label>
        </header>
    );
}

export default Header;