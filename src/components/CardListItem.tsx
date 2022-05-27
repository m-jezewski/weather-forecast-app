interface CardListItemProps {
    children: React.ReactNode
    Icon: React.FunctionComponent<{ className?: string, alt?: string }>
    iconStyles?: string
    liStyles?: string
    alt: string
}

export const CardListItem = ({ children, Icon, iconStyles, liStyles, alt }: CardListItemProps): JSX.Element => {
    return (
        <li className={'flex items-center text-center mt-0.5' + liStyles} title={alt}>
            <Icon className={`h7 w7 + ${iconStyles}`} alt={alt} /><p className={'text-lg p-1 pt-1.5 grow '}>{children}</p>
        </li>
    );
}