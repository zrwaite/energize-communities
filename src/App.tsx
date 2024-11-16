import React, { useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Scene } from './components/3d/Scene'
import { Box } from '@mui/material'
import { CityData } from './types/city'
import { sackville, sackvilleData } from './data/cities/sackville'
import { generateEnergyModels } from './data/models'
import { EnergyNumberField } from './components/EnergyNumberField'
const App: React.FC = () => {
	const city = sackville
	const [cityData, setCityData] = useState<CityData>(sackvilleData)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const models = useMemo(() => generateEnergyModels(city, cityData), [cityData])

	return (
		<Box sx={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
			<Box sx={{ width: 200, height: '100%', p: 2 }}>
				<EnergyNumberField type="Solar" cityData={cityData} setCityData={setCityData} city={city} />
				<EnergyNumberField type="Wind" cityData={cityData} setCityData={setCityData} city={city} />
				<EnergyNumberField type="Gas" cityData={cityData} setCityData={setCityData} city={city} />
				<EnergyNumberField type="Geothermal" cityData={cityData} setCityData={setCityData} city={city} />
				<EnergyNumberField type="Hydro" cityData={cityData} setCityData={setCityData} city={city} />
				<EnergyNumberField type="Nuclear" cityData={cityData} setCityData={setCityData} city={city} />
			</Box>
			<Box sx={{ height: '100%', flex: 1 }}>
				<Canvas camera={{ position: [0, 2, 5] }}>
					<Scene city={city} energyModels={models} />
				</Canvas>
			</Box>
		</Box>
	)
}

export default App
