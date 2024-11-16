import { Box, Typography } from "@mui/material"
import { EnergyNumberField } from "./components/EnergyNumberField"
import { City, CityData } from "./types/city"
import { Canvas } from "@react-three/fiber"
import { Scene } from "./components/3d/Scene"
import { generateEnergyModels, models, modelTypes } from "./data/models"
import { useMemo } from "react"
import { formatNumber } from "./utils/formatting"

const calculateTotalCost = (cityData: CityData) => {
    let totalCost = 0
    for (const type of modelTypes) {
        const model = models.find((model) => model.name === type)!
        totalCost += cityData[`num${type}`] * model.price
    }
    return totalCost
}

export const CityView = (props: {
    cityData: CityData
    setCityData: (cityData: CityData) => void
    city: City
}) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const models = useMemo(() => generateEnergyModels(props.city, props.cityData), [props.cityData])
    const totalCost = useMemo(() => calculateTotalCost(props.cityData), [props.cityData])
    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', flex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2, backgroundColor: 'grey'}}>
                <Typography sx={{ fontSize: 40, fontWeight: 'bold' }}>{props.city.name}</Typography>
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold', ml: 2 }}>Population: {props.city.population}</Typography>
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold', ml: 2 }}></Typography>
                </Box>
            </Box>
            <Box sx={{ height: '100%', display: 'flex', flex: 1 }}>
                <Box sx={{ minWidth: 200, height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography>Energy Sources</Typography>
                    <EnergyNumberField type="Solar" cityData={props.cityData} setCityData={props.setCityData} city={props.city} />
                    <EnergyNumberField type="Wind" cityData={props.cityData} setCityData={props.setCityData} city={props.city} />
                    <EnergyNumberField type="Gas" cityData={props.cityData} setCityData={props.setCityData} city={props.city} />
                    <EnergyNumberField type="Geothermal" cityData={props.cityData} setCityData={props.setCityData} city={props.city} />
                    <EnergyNumberField type="Hydro" cityData={props.cityData} setCityData={props.setCityData} city={props.city} />
                    <EnergyNumberField type="Nuclear" cityData={props.cityData} setCityData={props.setCityData} city={props.city} />
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold', ml: 2 }}>Total Cost: ${formatNumber(totalCost)}</Typography>
                    <Typography sx={{ fontSize: 20, fontWeight: 'bold', ml: 2 }}>Cost per capita: ${formatNumber(totalCost / props.city.population)}</Typography>
                </Box>
                <Box sx={{ height: '100%', flex: 1 }}>
                    <Canvas camera={{ position: [0, 2, 5] }}>
                        <Scene city={props.city} energyModels={models} />
                    </Canvas>
                </Box>
            </Box>
        </Box>
    )
}
