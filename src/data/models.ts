import { City, CityData } from "../types/city";
import { EnergyModel3D, EnergyModelType } from "../types/model";

export const models = [{
    name: 'Gas',
    path: '/models/gas.glb',
    scale: 0.06,
} as const, {
    name: 'Wind',
    path: '/models/wind.glb',
    scale: 0.08,
} as const, {
    name: 'Solar',
    path: '/models/solar.glb',
    scale: 0.08,
} as const, {
    name: 'Hydro',
    path: '/models/hydro.glb',
    scale: 0.1,
} as const, {
    name: 'Nuclear',
    path: '/models/nuclear.glb',
    scale: 0.1,
} as const, {
    name: 'Geothermal',
    path: '/models/geo.glb',
    scale: 0.1,
} as const] as const;

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
