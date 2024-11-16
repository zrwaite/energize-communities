import { useEffect, useState } from "react"
import { getAPIWeatherData, parseDayOfWeatherData, WeatherHourData } from "../../data/weather"
import { gs } from "../../styles"
import { City, CityData } from "../../types/city"
import { calculateTotalCost } from "../../data/simulation"

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
	  }, [simulationState])

	return (
		<div style={gs.centerCol}>
			<h1>Day: {day}</h1>
			{simulationState === 'loading' && <p>Loading Weather Data...</p>}
			{simulationState === 'error' && <div>
				<p>Error loading weather data</p>
				<button style={gs.largeButton} onClick={() => {
					setSimulationState('loading')
				}}>Retry</button>
			</div>}
			{simulationState === 'running' && <p>Running...</p>}
			{simulationState === 'fail' && simulationResult.state === 'fail' && <div style={{
				...gs.centerCol,
				alignItems: 'flex-start',
				padding: '20px'
			}}>
				<h3 className='m0 bold' style={{ color: 'red' }}>Your grid failed!</h3>
				<p className='m0 bold'>Your energy sources could not meet the peak demand!</p>
				<p className='m0 bold'>The energy available failed to meet the energy demand@</p>
				<p className='m0 bold'>Your simulation failed on Day {day} at {simulationResult.failureHour}:00</p>

				<p className='m0 bold'>Energy Demand @ Failure:</p>
				<p className='m0'>{Math.round(simulationResult.failureEnergyDemand)} kWh</p>
				<p className='m0 bold'>Energy Available @ Failure:</p>
				<p className='m0'>{Math.round(simulationResult.failureEnergyAvailable)} kWh</p>

				<p className='m0 bold'>Average Daily Energy Used:</p>
				<p className='m0'>{Math.round(simulationResult.averageDailyEnergyUsed)} kWh</p>
				<p className='m0 bold'>Average Daily Peak Energy Used (Hour):</p>
				<p className='m0'>{Math.round(simulationResult.averagePeakEnergyUsed)} kWh</p>
				{/* <p className='m0 bold'>Average Percentage Renewables Capacity Used Per Day:</p>
				<p className='m0'>{Math.round(simulationResult.averagePercentageRenewablesUsed * 10)/10}%</p>
				<p className='m0 bold'>Average Percentage Non-Renewables Capacity Used Per Day:</p>
				<p className='m0'>{Math.round(simulationResult.averagePercentageNonRenewablesUsed * 10)/10}%</p> */}
				
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
				padding: '20px',
			}}>
				<p className='m0 bold'>Simulation complete!</p>
				<h3 className='m0 bold' style={{ color: 'green' }}>Your grid succeeded!</h3>
				<p className='m0 bold'>But could your budget be reduced? Cost per capita:</p>
				<p className='m0 bold'>${Math.round(calculateTotalCost(props.cityData) / props.city.population)}</p>
				<br/>
				<p className='m0 bold'>Average Daily Energy Used:</p>
				<p className='m0'>{Math.round(simulationResult.averageDailyEnergyUsed)} kWh</p>
				<p className='m0 bold'>Average Daily Peak Energy Used (Hour):</p>
				<p className='m0'>{Math.round(simulationResult.averagePeakEnergyUsed)} kWh</p>
				{/* <p className='m0 bold'>Average Percentage Renewables Capacity Used Per Day:</p>
				<p className='m0'>{Math.round(simulationResult.averagePercentageRenewablesUsed * 10)/10}%</p>
				<p className='m0 bold'>Average Percentage Non-Renewables Capacity Used Per Day:</p>
				<p className='m0'>{Math.round(simulationResult.averagePercentageNonRenewablesUsed * 10)/10}%</p> */}
				<p className='m0 bold'>Peak Daily Energy Used:</p>
				<p className='m0'>{simulationResult.peakDailyEnergyUsed} kWh</p>
				<p className='m0 bold'>Peak Day:</p>
				<p className='m0'>{simulationResult.peakDay}</p>

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
