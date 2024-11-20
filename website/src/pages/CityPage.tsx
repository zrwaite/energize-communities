import { useParams } from 'react-router-dom'
import { CityView } from '../CityView'
import { cities } from '../data/cities'
import { useState } from 'react'

export const CityPage = () => {
	const { citySlug } = useParams()
	const city = Object.values(cities).find(
		(city) => city.city.name.toLowerCase() === citySlug?.toLowerCase()
	)!
	const [cityData, setCityData] = useState(city.data)
	return (
		<CityView city={city.city} cityData={cityData} setCityData={setCityData} />
	)
}
