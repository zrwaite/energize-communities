import { City, CityData } from "../../types/city";

export const sackville: City = {
    name: 'Sackville',
    population: 5000,
    positionsSolar: [
        [25, 8, 0], [27, 8, 0],
        [25, 8, 2], [27, 8, 2],
        [25, 8, 4], [27, 8, 4], 
        [25, 8, 6], [27, 8, 6],
        [29, 8, 0], [29, 8, 2], [29, 8, 4], [29, 8, 6], 
        [31, 8, 0], [31, 8, 2], [31, 8, 4], [31, 8, 6], 
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
        [19.5, 6, 20],
        [42.5, 6, 39],
    ],
    positionsNuclear: [
        [-30, 4, 10],
        [-30, 4, 20],
        [-30, 4, 30],
        [-40, 4, 10],
        [-40, 4, 20],
        [-40, 4, 30],
    ],
    positionsGeothermal: [
        [-20, 4, 0],
        [-20, 4, -5],
        [-20, 4, -10],
        [-20, 4, -15],
    ],
    coordinates: [45.897775, -64.368265],
    modelUrl: '/models/sackville.glb',
	timezone: 'America/Moncton',
}

export const sackvilleData: CityData = {
    numSolar: 2,
    numWind: 1,
    numHydro: 1,
    numNuclear: 0,
    numGeothermal: 1,
    numGas: 1,
} 
