import { City, CityData } from "../../types/city";

export const sackville: City = {
    name: 'Sackville',
    population: 5000,
    positionsSolar: [
        [25, 0], [27, 0],
        [25, 2], [27, 2],
        [25, 4], [27, 4], 
        [25, 6], [27, 6],
        [29, 0], [29, 2], [29, 4], [29, 6], 
        [31, 0], [31, 2], [31, 4], [31, 6], 
    ],
    positionsWind: [
        [25, -20], [30, -20], [35, -20], [40, -20], 
        [25, -25], [30, -25], [35, -25], [40, -25],
        [25, -30], [30, -30], [35, -30], [40, -30],
        [25, -35], [30, -35], [35, -35], [40, -35],
    ],
    positionsGas: [
        [0, -20], 
        [-5, -20],
        [-10, -20],
        [-15, -20],
    ],
    positionsHydro: [
        [19.5, 20],
        [42.5, 39],
    ],
    positionsNuclear: [
        [-30, 10],
        [-30, 20],
        [-30, 30],
        [-40, 10],
        [-40, 20],
        [-40, 30],
    ],
    positionsGeothermal: [
        [-20, 0],
        [-20, -5],
        [-20, -10],
        [-20, -15],
    ],
    coordinates: [45.897775, -64.368265],
    imageUrl: '/cities/sackville.png',
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
