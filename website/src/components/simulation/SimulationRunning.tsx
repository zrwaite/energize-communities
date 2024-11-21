import { useEffect, useState } from "react"
import { getAPIWeatherData, parseDayOfWeatherData, WeatherHourData } from "../../data/weather"
import { gs } from "../../styles"
import { City, CityData } from "../../types/city"
import { calculateTotalCost } from "../../data/simulation"
import { Typography } from "@mui/material"

type SimulationResult = {
	averageDailyEnergyUsed: number
	averagePeakEnergyUsed: number
	averagePercentageRenewablesUsed: number
	averagePercentageNonRenewablesUsed: number
	peakDailyEnergyUsed: number
	peakDay: number
} & ({
	state: 'fail'
	failureEnergyDemand: number
	failureEnergyAvailable: number
	failureHour: number
} | {
	state: 'success'
} | {
	state: 'incomplete'
})


export const SimulationRunning = (props: {
    city: City
    cityData: CityData
}) => {
	const [day, setDay] = useState(1)
	const [weatherHours, setWeatherHours] = useState<WeatherHourData[] | null>(null)
	const [simulationState, setSimulationState] = useState<'loading' | 'error' | 'running' | 'fail' | 'success'>('loading')
	const [simulationResult, setSimulationResult] = useState<SimulationResult >({
		averageDailyEnergyUsed: 0,
		averagePeakEnergyUsed: 0,
		averagePercentageRenewablesUsed: 0,
		averagePercentageNonRenewablesUsed: 0,
		peakDailyEnergyUsed: 0,
		peakDay: 0,
		state: 'incomplete'
	})

	const incrementTime = (day: number, previousSimulationResult: SimulationResult) => {
		if (day === 365) {
			setSimulationState('error')
			return
		}
		if (weatherHours === null) {
			setSimulationState('error')
			return
		}
		const dayWeatherData = weatherHours.slice(day * 24, (day + 1) * 24)
		const dayResult = parseDayOfWeatherData(
			props.city,
            props.cityData,
			dayWeatherData,
			day
		)
		if (!dayResult.success) {
			setSimulationState('fail')
			const newSimulationResult: SimulationResult = {
				...previousSimulationResult,
				state: 'fail',
				failureEnergyDemand: dayResult.energyDemand,
				failureEnergyAvailable: dayResult.totalEnergyAvailable,
				failureHour: dayResult.hour
			}
			setSimulationResult(newSimulationResult)
			return
		} 
		const newSimulationResult: SimulationResult = day === 1 ? {
			averageDailyEnergyUsed: dayResult.energyUsed,
			averagePeakEnergyUsed: dayResult.peakEnergyUsed,
			averagePercentageRenewablesUsed: dayResult.averagePercentageRenewablesUsed,
			averagePercentageNonRenewablesUsed: dayResult.averagePercentageNonRenewablesUsed,
			peakDailyEnergyUsed: dayResult.energyUsed,
			peakDay: day,
			state: 'incomplete'
		} : {
			averageDailyEnergyUsed: (previousSimulationResult.averageDailyEnergyUsed * (day - 1) + dayResult.energyUsed) / day,
			averagePeakEnergyUsed: (previousSimulationResult.averagePeakEnergyUsed * (day - 1) + dayResult.peakEnergyUsed) / day,
			averagePercentageRenewablesUsed: (previousSimulationResult.averagePercentageRenewablesUsed * (day - 1) + dayResult.averagePercentageRenewablesUsed) / day,
			averagePercentageNonRenewablesUsed: (previousSimulationResult.averagePercentageNonRenewablesUsed * (day - 1) + dayResult.averagePercentageNonRenewablesUsed) / day,
			peakDailyEnergyUsed: Math.max(previousSimulationResult.peakDailyEnergyUsed, dayResult.energyUsed),
			peakDay: previousSimulationResult.peakDailyEnergyUsed <= dayResult.energyUsed ? day : previousSimulationResult.peakDay,
			state: 'incomplete'
		}
		console.log('newSimulationResult', newSimulationResult)
		if (day === 364) {
			// @ts-ignore
			newSimulationResult.state = 'success'
			console.log('Simulation complete!', newSimulationResult)
		}
		setSimulationResult(newSimulationResult)
		
		// Calculate day data
		setDay(day + 1)
		if (day === 364) {
			setSimulationState('success')
			return
		}
		setTimeout(() => {
			incrementTime(day + 1, newSimulationResult)
		}, 20)
	}

	const getSetWeatherHours = async () => {
		const weatherHours = await getAPIWeatherData(props.city.name)
		console.log('weatherHours', weatherHours)
		if (weatherHours.length === 8759) {
			weatherHours.push(weatherHours[weatherHours.length - 1])
		}
		if (weatherHours.length !== 8760) {
			setSimulationState('error')
			return
		}
		setWeatherHours(weatherHours)
		setSimulationState('running')
	}

	useEffect(() => {
		if (simulationState === 'loading') {
			getSetWeatherHours()
		} else if (simulationState === 'running') {
			incrementTime(day, simulationResult)
		}
	  // eslint-disable-next-line react-hooks/exhaustive-deps
	  }, [simulationState])

	return (
		<div style={gs.centerCol}>
			<h1>Day: {day}</h1>
			{simulationState === 'loading' && <Typography>Loading Weather Data...</Typography>}
			{simulationState === 'error' && <div>
				<Typography>Error loading weather data</Typography>
				<button style={gs.largeButton} onClick={() => {
					setSimulationState('loading')
				}}>Retry</button>
			</div>}
			{simulationState === 'running' && <Typography>Running...</Typography>}
			{simulationState === 'fail' && simulationResult.state === 'fail' && <div style={{
				...gs.centerCol,
				alignItems: 'flex-start',
				padding: '10px'
			}}>
				<h3  style={{ color: 'red' }}>Your grid failed!</h3>
				<Typography sx={{ fontWeight: 'bold' }}>Your energy sources could not meet the peak demand!</Typography>
				<Typography sx={{ fontWeight: 'bold' }}>The energy available failed to meet the energy demand@</Typography>
				<Typography sx={{ fontWeight: 'bold' }}>Your simulation failed on Day {day} at {simulationResult.failureHour}:00</Typography>

				<Typography sx={{ fontWeight: 'bold' }}>Energy Demand @ Failure:</Typography>
				<Typography>{Math.round(simulationResult.failureEnergyDemand)} kWh</Typography>
				<Typography sx={{ fontWeight: 'bold' }}>Energy Available @ Failure:</Typography>
				<Typography>{Math.round(simulationResult.failureEnergyAvailable)} kWh</Typography>

				<Typography sx={{ fontWeight: 'bold' }}>Average Daily Energy Used:</Typography>
				<Typography>{Math.round(simulationResult.averageDailyEnergyUsed)} kWh</Typography>
				<Typography sx={{ fontWeight: 'bold' }}>Average Daily Peak Energy Used (Hour):</Typography>
				<Typography>{Math.round(simulationResult.averagePeakEnergyUsed)} kWh</Typography>
				{/* <Typography >Average Percentage Renewables Capacity Used Per Day:</Typography>
				<Typography>{Math.round(simulationResult.averagePercentageRenewablesUsed * 10)/10}%</Typography>
				<Typography >Average Percentage Non-Renewables Capacity Used Per Day:</Typography>
				<Typography>{Math.round(simulationResult.averagePercentageNonRenewablesUsed * 10)/10}%</Typography> */}
				
				<button style={gs.largeButton} onClick={() => {
					// props.setSimulationData({
					// 	...props.simulationData,
					// 	state: 'start'
					// })
                    alert('Restart')
				}}>Restart</button>
			</div>}
			{simulationState === 'success' && simulationResult.state === 'success' && <div style={{
				...gs.centerCol,
				alignItems: 'flex-start',
				padding: '10px',
			}}>
				<Typography sx={{ fontWeight: 'bold' }}>Simulation complete!</Typography>
				<h3  style={{ color: 'green' }}>Your grid succeeded!</h3>
				<Typography sx={{ fontWeight: 'bold' }}>But could your budget be reduced? Cost per capita:</Typography>
				<Typography >${Math.round(calculateTotalCost(props.cityData) / props.city.population)}</Typography>
				<br/>
				<Typography sx={{ fontWeight: 'bold' }}>Average Daily Energy Used:</Typography>
				<Typography>{Math.round(simulationResult.averageDailyEnergyUsed)} kWh</Typography>
				<Typography sx={{ fontWeight: 'bold' }}>Average Daily Peak Energy Used (Hour):</Typography>
				<Typography>{Math.round(simulationResult.averagePeakEnergyUsed)} kWh</Typography>
				{/* <Typography >Average Percentage Renewables Capacity Used Per Day:</Typography>
				<Typography>{Math.round(simulationResult.averagePercentageRenewablesUsed * 10)/10}%</Typography>
				<Typography >Average Percentage Non-Renewables Capacity Used Per Day:</Typography>
				<Typography>{Math.round(simulationResult.averagePercentageNonRenewablesUsed * 10)/10}%</Typography> */}
				<Typography sx={{ fontWeight: 'bold' }}>Peak Daily Energy Used:</Typography>
				<Typography>{simulationResult.peakDailyEnergyUsed} kWh</Typography>
				<Typography sx={{ fontWeight: 'bold' }}>Peak Day:</Typography>
				<Typography>{simulationResult.peakDay}</Typography>

				<button style={gs.largeButton} onClick={() => {
					// props.setSimulationData({
					// 	...props.simulationData,
					// 	state: 'start'
					// })
                    alert('Restart')
				}}>Restart</button>
			</div>}
		</div>
	)
}
