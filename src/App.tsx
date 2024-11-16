import React, { useState } from 'react'
import { Box } from '@mui/material'
import { City, CityData } from './types/city'
import { CitySelect } from './CitySelect'
import { CityView } from './CityView'
const App: React.FC = () => {
	const [city, setCity] = useState<City | null>(null)
	const [cityData, setCityData] = useState<CityData | null>(null)
	const [state, setState] = useState<'citySelect' | 'cityView'>('citySelect')

	return (
		<Box sx={{ height: '100%' }}>
			{state === 'citySelect' && (
				<CitySelect
					city={city} 
					setCity={setCity} 
					setCityData={setCityData} 
					next={() => setState('cityView')}
				/>
			)}
			{state === 'cityView' && !!city && !!cityData && (
				<CityView city={city} cityData={cityData} setCityData={setCityData} />
			)}
		</Box>
	)
}

export default App
