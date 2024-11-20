import { City, CityData } from "../../types/city";

export const sackville: City = {
    name: 'Sackville',
    population: 5000,
    positionsSolar: [
        [25, 5.5, 0], [27, 5.5, 0],
        [25, 5.5, 2], [27, 5.5, 2],
        [25, 5.5, 4], [27, 5.5, 4], 
        [25, 5.5, 6], [27, 5.5, 6],
        [29, 5.5, 0], [29, 5.5, 2], [29, 5.5, 4], [29, 5.5, 6], 
        [31, 5.5, 0], [31, 5.5, 2], [31, 5.5, 4], [31, 5.5, 6], 
    ],
    positionsWind: [
        [25, 5, -20], [30, 5, -20], [35, 5, -20], [40, 5, -20], 
        [25, 5, -25], [30, 5, -25], [35, 5, -25], [40, 5, -25],
        [25, 5, -30], [30, 5, -30], [35, 5, -30], [40, 5, -30],
        [25, 5, -35], [30, 5, -35], [35, 5, -35], [40, 5, -35],
    ],
    positionsGas: [
        [0, 5, -20], 
        [-5, 5, -20],
        [-10, 5, -20],
        [-15, 5, -20],
    ],
    positionsHydro: [
        [19.5, 5, 20],
        [42.5, 5, 39],
    ],
    positionsNuclear: [
        [-30, 5, 10],
        [-30, 5, 20],
        [-30, 5, 30],
        [-40, 5, 10],
        [-40, 5, 20],
        [-40, 5, 30],
    ],
    positionsGeothermal: [
        [-20, 5, 0],
        [-20, 5, -5],
        [-20, 5, -10],
        [-20, 5, -15],
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
