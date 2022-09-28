import { useContext } from 'react'
import { DataContext, DataContextInterface } from '../context/DataContext';

export const useDataContext = () => {
    return useContext(DataContext) as DataContextInterface
}