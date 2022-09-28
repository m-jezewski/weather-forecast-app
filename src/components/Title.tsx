import dayjs from "dayjs";
import { useDataContext } from "../hooks/useDataContext";

const Title = () => {
    const { location } = useDataContext()

    return (
        <span className='flex items-center justify-between flex-col md:flex-row md:items-end'>
            <h1 className='text-5xl font-light text-center sm:text-left'>
                {location.name} {`${dayjs().format('DD.MM.YYYY')}-${dayjs().add(6, 'day').format('DD.MM.YYYY')}`}
            </h1>
            <a
                href='https://github.com/Karriuz/weather-forecast-app'
                rel='noreferrer'
                target={'_blank'}
                className='text-xl font-normal mr-4 text-stone-600'>
                Github
            </a>
        </span>
    );
}

export default Title;