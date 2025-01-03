import { City, CityData } from "../types/city";
import { EnergyModel3D, EnergyModelType } from "../types/model";

export const solarModel = {
    name: 'Solar',
    path: '/models/solar.glb',
    scale: 0.08,
    price: 2000000,
    displayPrice: '$2 million',
    energy: 350000,
} as const

export const gasModel = {
    name: 'Gas',
    path: '/models/gas.glb',
    scale: 0.06,
    price: 800000000,
    displayPrice: '$800 million',
    energy: 20000000,
} as const

export const windModel = {
    name: 'Wind',
    path: '/models/wind.glb',
    scale: 0.08,
    price: 2000000,
    displayPrice: '$2 million',
    energy: 7000,
} as const

export const hydroModel = {
    name: 'Hydro',
    path: '/models/hydro.glb',
    scale: 0.1,
    price: 3000000,
    displayPrice: '$3 million',
    energy: 80000,
} as const

export const nuclearModel = {
    name: 'Nuclear',
    path: '/models/nuclear.glb',
    scale: 0.1,
    price: 8000000000,
    displayPrice: '$8 billion',
    energy: 35000000,
} as const

export const geoModel = {
    name: 'Geothermal',
    path: '/models/geo.glb',
    scale: 0.1,
    price: 4000000,
    displayPrice: '$4 million',
	energy: 300000,
} as const

export const models = [gasModel, windModel, solarModel, hydroModel, nuclearModel, geoModel] as const;

export const modelTypes = models.map(model => model.name)

export const generateEnergyModels = (city: City, cityData: CityData): EnergyModel3D[] => {
    const energyModels: EnergyModel3D[] = []
    for (const type of modelTypes) {
        const positions = city[`positions${type}`]
        for (let i = 0; i < cityData[`num${type}`]; i++) {
            energyModels.push({
                id: `${type}-${i}`,
                position: positions[i],
                type: type,
            })
        }
    }
    return energyModels
}

export const updateCityData = (cityData: CityData, city: City, type: EnergyModelType, value: number): CityData => {
    const newCityData = { ...cityData }
    const maxData = city[`positions${type}`].length
    if (value > maxData) {
        value = maxData
    }
    if (value < 0) {
        value = 0
    }
    newCityData[`num${type}`] = value
    return newCityData
}
