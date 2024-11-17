import { City, CityData } from "../types/city"
import { cities } from "./cities"
import { gasModel, geoModel, hydroModel, nuclearModel, solarModel, windModel } from "./models"
// import json from './tempWeather.json'
import tempWeather from './tempWeather.json'

const kWhPerPersonHourlyMap = {
	'0': 1.5,
	'1': 1.4,
	'2': 1.3,
	'3': 1.3,
	'4': 1.4,
	'5': 1.5,
	'6': 1.6,
	'7': 1.7,
	'8': 1.8,
	'9': 1.8,
	'10': 1.8,
	'11': 1.8,
	'12': 1.8,
	'13': 1.8,
	'14': 1.8,
	'15': 1.8,
	'16': 1.8,
	'17': 1.9,
	'18': 1.9,
	'19': 2.0,
	'20': 1.9,
	'21': 1.8,
	'22': 1.7,
	'23': 1.6,
}


// https://history.openweathermap.org/data/2.5/history/city
export interface WeatherHourData {
	dt: number
	main: {
		temp: number
		feels_like: number
		pressure: number
		humidity: number
		temp_min: number
		temp_max: number
	},
	wind: {
		speed: number // Wind speed, m/s
		deg: number
	},
	snow: {
		'1h': number // Snow volume for the last 1 hour, mm
	},
	clouds: {
		all: number // Cloudiness, %
	},
	rain?: {
		'1h': number // Rain volume for the last 1 hour, mm
	},
	weather: [
		{
			id: number,
			main: string,
			description: string,
			icon: string,
		},
	],
}

const interpolate = (
	value: number,
	minInput: number,
	maxInput: number,
	minOutput: number,
	maxOutput: number
): number => {
    if (value >= maxInput) {
        return maxOutput;
    } else if (value <= minInput) {
        return minOutput;
    } else {
        // Linear interpolation
        const t = (value - minInput) / (maxInput - minInput);
        return minOutput + t * (maxOutput - minOutput);
    }
}


const getSunRiseAndSet = (
	day: number, // 1 to 365
	latitude: number
): { rise: number, set: number } => {
	const degToRad = (deg: number) => (deg * Math.PI) / 180;
	const radToDeg = (rad: number) => (rad * 180) / Math.PI;
	const solarDeclination = (N: number) => {
	  const gamma = (2 * Math.PI) / 365 * (N - 1);
	  return (
		0.006918 -
		0.399912 * Math.cos(gamma) +
		0.070257 * Math.sin(gamma) -
		0.006758 * Math.cos(2 * gamma) +
		0.000907 * Math.sin(2 * gamma) -
		0.002697 * Math.cos(3 * gamma) +
		0.00148 * Math.sin(3 * gamma)
	  );
	};
	const hourAngle = (latitude: number, declination: number) => {
	  const latRad = degToRad(latitude);
	  const cosH =
		(Math.cos(degToRad(-0.8333)) - Math.sin(latRad) * Math.sin(declination)) /
		(Math.cos(latRad) * Math.cos(declination));
	  return cosH
	};
	const N = day;
	const declination = solarDeclination(N);
	const cosH = hourAngle(latitude, declination);
	if (cosH < -1) return { rise: 0, set: 23 }
	else if (cosH > 1) return { rise: 12, set: 12 }
	const H = radToDeg(Math.acos(cosH));
	const solarNoon = 12.00;
	const sunriseTime = solarNoon - H / 15;
	const sunsetTime = solarNoon + H / 15;
	const roundToNearestHour = (time: number) => Math.round(time) % 24;
	const rise = roundToNearestHour(sunriseTime);
	const set = roundToNearestHour(sunsetTime);
	return { rise, set };
};

const getEnergyDemand = (
	population: number,
	hour: number,
	hourlyTemp: number,
) => {
	hourlyTemp -= 273.15
	if (hour < 0 || hour > 23) {
		alert('Invalid hour')
		throw new Error('Invalid hour')
	}
	let kWhPerPerson = kWhPerPersonHourlyMap[hour.toString() as keyof typeof kWhPerPersonHourlyMap]
	if (hourlyTemp < 0) {
		kWhPerPerson += hourlyTemp * -0.01
	}
	if (hourlyTemp > 20) {
		kWhPerPerson += (hourlyTemp - 20) * 0.02
	}
	const energyDemand = population * kWhPerPerson
	return energyDemand
}

const getSolarHourOutput = (
	numFarms: number,
	hour: number,
	sunrise: number,
	sunset: number,
	cloudiness: number,
) => {
	if (hour < sunrise || hour > sunset) {
		return 0
	}
	if (sunrise >= sunset) {
		return 0
	}
	const defaultDaylightHours = 12
	const daylightHours = sunset - sunrise
	const daylighthoursFactor = daylightHours / defaultDaylightHours
	const dailySolarOutput = solarModel.energy * numFarms
	const daylightFactor = - Math.cos(2 * Math.PI * (hour - sunrise) / (sunset - sunrise)) + 1
	const cloudinessFactor = 1 - cloudiness / 100
	const solarOutput = daylighthoursFactor * cloudinessFactor * daylightFactor * dailySolarOutput / daylightHours
	return solarOutput
}

const averageWindSpeed = 7.5

const getWindHourOutput = (
	numTurbines: number,
	windSpeed: number,
) => {
	const windOutput = windModel.energy * numTurbines / 24
	if (windSpeed <= 4) {
		return 0
	}
	const windSpeedFactor = averageWindSpeed / 7.5
	const windHourOutput = windOutput * windSpeedFactor
	return windHourOutput
}


interface HourResult {
	percentageRenewablesUsed: number
	percentageNonRenewablesUsed: number
}

type DayResult = {
	success: true
	energyUsed: number
	peakEnergyUsed: number
	peakEnergyHour: number
	averagePercentageRenewablesUsed: number
	averagePercentageNonRenewablesUsed: number
} | {
	success: false
	hour: number
	energyDemand: number
	totalEnergyAvailable: number
}

export const parseDayOfWeatherData = (
	// simData: SimulationData,
	city: City,
	cityData: CityData,
	weatherData: WeatherHourData[],
	day: number,
): DayResult => {
	if (weatherData.length !== 24) {
		alert('Invalid weather data')
		throw new Error('Invalid weather data')
	}
	let totalEnergyUsed = 0
	let peakEnergyUsed = 0
	let peakEnergyHour = 0
	const latitude = Object.values(cities).find(c => c.city.name === city.name)?.city.coordinates[0] || 0
	const population = city.population

	let renewableHourlyEnergyAvailable = 0

	const averageTemp = weatherData.reduce((acc, curr) => acc + curr.main.temp, 0) / weatherData.length
	if (cityData.numHydro > 0) {
		const hydroEfficiency = interpolate(averageTemp, 243, 283, 0.7, 1)
		const dayHydroEnergy = hydroModel.energy
		const hydroEnergy = cityData.numHydro * dayHydroEnergy * hydroEfficiency
		renewableHourlyEnergyAvailable += hydroEnergy / 24
	}

	if (cityData.numGeothermal > 0) {
		const dailyGeoEnergy = cityData.numGeothermal * geoModel.energy
		renewableHourlyEnergyAvailable += dailyGeoEnergy / 24
	}

	let nonRenewableHourlyEnergyAvailable = 0

	if (cityData.numNuclear > 0) {
		const dailyNuclearEnergy = cityData.numNuclear * nuclearModel.energy
		nonRenewableHourlyEnergyAvailable += dailyNuclearEnergy / 24
	}

	if (cityData.numGas > 0) {
		const dailyGasEnergy = cityData.numGas * gasModel.energy
		nonRenewableHourlyEnergyAvailable += dailyGasEnergy / 24
	}

	/*
	Scalable energy sources: Nuclear, Gas, Hydro
	*/
	const { rise, set } = getSunRiseAndSet(day, latitude)
	const hourResults: HourResult[] = []

	for (let hour = 0; hour < weatherData.length; hour++) {
		const weatherHour = weatherData[hour]
		const energyDemand = getEnergyDemand(population, hour, weatherHour.main.temp)
		totalEnergyUsed += energyDemand
		if (energyDemand > peakEnergyUsed) {
			peakEnergyUsed = energyDemand
			peakEnergyHour = hour
		}
		const solarOutput = getSolarHourOutput(
			cityData.numSolar,
			hour,
			rise,
			set,
			weatherHour.clouds.all
		)
		const windOutput = getWindHourOutput(
			cityData.numWind,
			weatherHour.wind.speed
		)
		let percentageRenewablesUsed = 1
		let percentageNonRenewablesUsed = 0
		const renewablesSum = solarOutput + windOutput + renewableHourlyEnergyAvailable
		if (energyDemand < renewablesSum) {
			percentageRenewablesUsed = (renewablesSum) / energyDemand
			hourResults.push({
				percentageRenewablesUsed,
				percentageNonRenewablesUsed
			})
			continue
		}
		const nonRenewableEnergyDemand = energyDemand - renewablesSum
		if (nonRenewableEnergyDemand < nonRenewableHourlyEnergyAvailable) {
			percentageNonRenewablesUsed = nonRenewableEnergyDemand / nonRenewableHourlyEnergyAvailable
		} else {
			percentageNonRenewablesUsed = 1
			const totalEnergyAvailable = renewablesSum + nonRenewableHourlyEnergyAvailable
			return {
				success: false,
				hour,
				energyDemand,
				totalEnergyAvailable
			}
		}
		hourResults.push({
			percentageRenewablesUsed,
			percentageNonRenewablesUsed
		})
	}
	const averagePercentageNonRenewablesUsed = hourResults.reduce((acc, curr) => acc + curr.percentageNonRenewablesUsed, 0) / hourResults.length
	const averagePercentageRenewablesUsed = hourResults.reduce((acc, curr) => acc + curr.percentageRenewablesUsed, 0) / hourResults.length
	return {
		success: true,
		energyUsed: totalEnergyUsed,
		peakEnergyUsed,
		peakEnergyHour,
		averagePercentageRenewablesUsed,
		averagePercentageNonRenewablesUsed
	
	}
}

export const getAPIWeatherData = async (cityName: string) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const city = Object.values(cities).find(city => city.city.name === cityName)!
	const now = new Date()
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000
	const yearAgo = Math.round(new Date((today - (364 * 24 * 60 * 60)) * 1000).valueOf() / 1000)
	let start = yearAgo
	const weeks = []
	while (start < today) {
		weeks.push(start)
		start += 7 * 24 * 60 * 60
	}

	// const url = 'https://history.openweathermap.org/data/2.5/history/city?'
	// + `lat=${city.city.coordinates[0]}&lon=${city.city.coordinates[1]}`
	// + '&type=hour'
	// + `&cnt=${168}`
	// + '&appid=' + process.env.REACT_APP_OPENWEATHERMAP_API_KEY

	// const weatherDataPromises = weeks.map(async (start) => {
	// 	const response = await fetch(url + `&start=${start}`)
	// 	const data = await response.json() as { list: WeatherHourData[] }
	// 	return {
	// 		week: start,
	// 		list: data.list
	// 	}
	// })

	// const weatherData = await Promise.all(weatherDataPromises)
	// console.log('Weather data:', weatherData)
	// weatherData.sort((a, b) => a.week - b.week)
	// const weatherHours: WeatherHourData[] = [...weatherData[0].list.slice(0, 24)] // Duplicate the first day since we can only do 364 history
	// for (let i = 0; i < weatherData.length; i++) {
	// 	weatherHours.push(...weatherData[i].list)
	// }

	// pull from Json instead of API: './tempWeather.json':
	const weatherHours: WeatherHourData[] = tempWeather as WeatherHourData[]
	return weatherHours 
}



export const exampleWeatherData = {
	message: 'Count: 24',
	cod: '200',
	city_id: 4298960,
	calctime: 0.00297316,
	cnt: 24,
	list: [
		{
			dt: 1578384000,
			main: {
				temp: 275.45,
				feels_like: 271.7,
				pressure: 1014,
				humidity: 74,
				temp_min: 274.26,
				temp_max: 276.48,
			},
			wind: {
				speed: 2.16,
				deg: 87,
			},
			clouds: {
				all: 90,
			},
			weather: [
				{
					id: 501,
					main: 'Rain',
					description: 'moderate rain',
					icon: '10n',
				},
			],
			rain: {
				'1h': 0.9,
			},
		},
	],
}
