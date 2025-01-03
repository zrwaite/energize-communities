import { EnergyModelPos } from "./model"

export type City = {
    name: string
    fullName: string
    population: number
    positionsSolar: EnergyModelPos[]
    positionsWind: EnergyModelPos[]
    positionsHydro: EnergyModelPos[]
    positionsNuclear: EnergyModelPos[]
    positionsGeothermal: EnergyModelPos[]
    positionsGas: EnergyModelPos[]
    coordinates: [number, number]
    modelUrl: string
    timezone: string
}

export type CityData = {
    numSolar: number
    numWind: number
    numHydro: number
    numNuclear: number
    numGeothermal: number
    numGas: number
}