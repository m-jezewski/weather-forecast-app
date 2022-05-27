type InfoCardProps = {
    containerStyles?: string
    dayName?: string
    hour?: string
    date?: string
    children: React.ReactNode
}

export const InfoCard = ({ containerStyles, dayName, date, children, hour }: InfoCardProps) => {
    return (
        <div className={'bg-zinc-100 basis-48 min-w-[9rem] m-2 p-4 flex flex-col text-center items-stretch rounded-md flex-nowrap drop-shadow-lg font-normal hover:ring-2 ring-neutral-200 transition-all ' + containerStyles}>
            {dayName && <p className='text-xl'>{dayName}</p>}
            {hour && <p className='text-xl font-normal'>{hour}</p>}
            {date && <p className='text-base'>{date}</p>}
            {children}
        </div>
    );
}