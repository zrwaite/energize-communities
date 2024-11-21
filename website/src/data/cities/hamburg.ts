import { City, CityData } from "../../types/city";

export const hamburg: City = {
    name: 'Hamburg',
    fullName: 'Hamburg, Germany',
    population: 1946000,
    positionsSolar: [
        [-25, 7, 0], [-27, 7, 0],
    ],
    positionsWind: [
        [25, 7, -20], [30, 7, -20], [35, 7, -20], [40, 7, -20], 
        [25, 7, -25], [30, 7, -25], [35, 7, -25], [40, 7, -25],
        [25, 7, -30], [30, 7, -30], [35, 7, -30], [40, 7, -30],
        [25, 7, -35], [30, 7, -35], [35, 7, -35], [40, 7, -35],
    ],
    positionsGas: [
        [0, 7, -20], 
        [-5, 7, -20],
        [-10, 7, -20],
        [-15, 7, -20],
    ],
    positionsHydro: [
        [19.5, 7, 20],
        [42.5, 7, 39],
    ],
    positionsNuclear: [
        [-30, 7, 10],
        [-30, 7, 20],
        [-30, 7, 30],
        [-40, 7, 10],
        [-40, 7, 20],
        [-40, 7, 30],
    ],
    positionsGeothermal: [
        [-20, 7, 0],
        [-20, 7, -5],
        [-20, 7, -10],
        [-20, 7, -15],
    ],
    coordinates: [43.46641256681465, -80.52250692905282],
    modelUrl: '/models/hamburg.glb',
	timezone: 'Europe/Berlin',
}

export const hamburgData: CityData = {
    numSolar: 2,
    numWind: 2,
    numHydro: 1,
    numNuclear: 0,
    numGeothermal: 1,
    numGas: 2,
} 
