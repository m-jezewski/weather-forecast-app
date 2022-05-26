import { useEffect, useState } from 'react'

export const useFetch = <Type>(url: string) => {
  const [responseData, setResponseData] = useState<Type | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const fetchWeather = async () => {
      try {
        const res = await fetch(url, { signal: abortController.signal })
        if (!res.ok) throw new Error(res.statusText)
        const jsonData = await res.json()
        setResponseData(jsonData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchWeather()
    return () => {
      abortController.abort()
    }
  }, [url])

  return responseData
}
