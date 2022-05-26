interface CardListItemProps {
    children: string | string[]
    pStyles?: string
    Icon: Function
    iconStyles?: string
    liStyles?: string
    iconLabel: string
    iconTitle: string
}

export const CardListItem = ({ children, pStyles, Icon, iconStyles, liStyles, iconLabel, iconTitle }: CardListItemProps): JSX.Element => {
    return (
        <li className={'flex items-center text-center mt-1 ' + liStyles}>
            <Icon alt={iconLabel} title={iconTitle} className={'h-7 w-7 ' + iconStyles} /><p className={'text-lg p-2 grow ' + pStyles}>{children}</p>
        </li>
    );
}