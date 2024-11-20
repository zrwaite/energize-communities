import { City, CityData } from "../../types/city";

export const waterloo: City = {
    name: 'Waterloo',
    population: 130000,
    positionsSolar: [
        [-25, 8, 0], [-27, 8, 0],
    ],
    positionsWind: [
        [25, 8, -20], [30, 8, -20], [35, 8, -20], [40, 8, -20], 
        [25, 8, -25], [30, 8, -25], [35, 8, -25], [40, 8, -25],
        [25, 8, -30], [30, 8, -30], [35, 8, -30], [40, 8, -30],
        [25, 8, -35], [30, 8, -35], [35, 8, -35], [40, 8, -35],
    ],
    positionsGas: [
        [0, 8, -20], 
        [-5, 8, -20],
        [-10, 8, -20],
        [-15, 8, -20],
    ],
    positionsHydro: [
        [19.5, 8, 20],
        [42.5, 8, 39],
    ],
    positionsNuclear: [
        [-30, 8, 10],
        [-30, 8, 20],
        [-30, 8, 30],
        [-40, 8, 10],
        [-40, 8, 20],
        [-40, 8, 30],
    ],
    positionsGeothermal: [
        [-20, 8, 0],
        [-20, 8, -5],
        [-20, 8, -10],
        [-20, 8, -15],
    ],
    coordinates: [43.46641256681465, -80.52250692905282],
    modelUrl: '/models/waterloo.glb',
	timezone: 'America/Toronto',
}

export const waterlooData: CityData = {
    numSolar: 2,
    numWind: 1,
    numHydro: 1,
    numNuclear: 0,
    numGeothermal: 1,
    numGas: 1,
} 
