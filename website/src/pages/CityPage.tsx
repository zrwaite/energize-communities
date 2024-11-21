import { useParams } from 'react-router-dom'
import { cities } from '../data/cities'
import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { CitySelect } from '../components/CitySelect'
import { generateEnergyModels } from '../data/models'
import { calculateTotalCost } from '../data/simulation'
import { EnergyNumberField } from '../components/EnergyNumberField'
import { formatNumber } from '../utils/formatting'
import { SimulationRunning } from '../components/simulation/SimulationRunning'
import { Scene } from '../components/3d/Scene'
import { SimulationTutorial } from '../components/tutorial/SimulationTutorial'

export const CityPage = () => {
	const { citySlug } = useParams()
	const city = useMemo(() => Object.values(cities).find(
		(city) => city.city.name.toLowerCase() === citySlug?.toLowerCase()
	)!, [citySlug])
	const [cityData, setCityData] = useState(city.data)
	useEffect(() => {
		setCityData(city.data)
	}, [city])

	const models = useMemo(() => generateEnergyModels(city.city, cityData), [city, cityData])
	const totalCost = useMemo(() => calculateTotalCost(cityData), [cityData])
	const [simState, setSimState] = useState<'select' | 'tutorial' | 'start' | 'running'>('select')
	return (
		<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
			{simState === 'tutorial' && (
				<SimulationTutorial 
					endTutorial={() => setSimState('start')}
				/>
			)}
			<Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: 'grey', height: 80 }}>
				<Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>{city.city.fullName}</Typography>
				<Box sx={{ display: 'flex' }}>
					<Typography sx={{ fontSize: 20, fontWeight: 'bold', ml: 2 }}>Population: {city.city.population}</Typography>
					<Typography sx={{ fontSize: 20, fontWeight: 'bold', ml: 2 }}></Typography>
				</Box>
			</Box>
			<Box sx={{ display: 'flex', flex: 1 }}>
				<Box sx={{ minWidth: 200, width: 200, height: 'calc(100% - 2rem)', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
					{simState === 'select' && (
						<CitySelect city={city.city}/>
					)}
					{simState === 'start' && (<>
						<Typography>Energy Sources</Typography>
						<EnergyNumberField type="Solar" cityData={cityData} setCityData={setCityData} city={city.city} />
						<EnergyNumberField type="Wind" cityData={cityData} setCityData={setCityData} city={city.city} />
						<EnergyNumberField type="Gas" cityData={cityData} setCityData={setCityData} city={city.city} />
						<EnergyNumberField type="Geothermal" cityData={cityData} setCityData={setCityData} city={city.city} />
						<EnergyNumberField type="Hydro" cityData={cityData} setCityData={setCityData} city={city.city} />
						<EnergyNumberField type="Nuclear" cityData={cityData} setCityData={setCityData} city={city.city} />
						<Typography sx={{ fontSize: 20, fontWeight: 'bold', ml: 2 }}>Total Cost: ${formatNumber(totalCost)}</Typography>
						<Typography sx={{ fontSize: 20, fontWeight: 'bold', ml: 2 }}>Cost per capita: ${formatNumber(totalCost / city.city.population)}</Typography>
						<Button onClick={() => setSimState('running')}>Next</Button>
					</>)}
					{simState === 'running' && (
						<SimulationRunning
							city={city.city} 
							cityData={cityData} 
						/>
					)}
				</Box>
				<Box sx={{ height: '100%', flex: 1 }}>
					{simState === 'select' && (
						<Box
							sx={{
								position: 'absolute',
								height: 'calc(100% - 2rem - 80px)',
								width: 'calc(100% - 200px - 2rem)',
								zIndex: 1000,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundColor: 'rgba(0, 0, 0, 0.5)',
							}}
						>
							<Button 
								onClick={() => setSimState('tutorial')}
								sx={{
									backgroundColor: 'white',
									padding: 2,
									fontSize: 20,
									fontWeight: 'bold',
									borderRadius: 5,
									color: 'black'
								}}
							>
								Start Demo
							</Button>
						</Box>
					)}
					<Scene city={city.city} energyModels={models} />
				</Box>
			</Box>
		</Box>
	)
}
