import { Box, Typography } from "@mui/material"
import { Scene } from "../components/3d/Scene"
import { sackville } from "../data/cities/sackville"
import { generateEnergyModels } from "../data/models"
import { Link } from "react-router-dom"

const defaultModels = generateEnergyModels(sackville, {
    numSolar: 6,
    numWind: 4,
    numHydro: 1,
    numNuclear: 1,
    numGeothermal: 2,
    numGas: 2,
} )

export const HomePage = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
        }}>
            <Box sx={{ width: '100%', height: '100%', flex: 1, position: 'absolute' }}>
                <Scene city={sackville} energyModels={defaultModels} rotating />
            </Box>
            <Typography sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                padding: 3,
                borderRadius: 5,
                fontSize: 30,
                fontWeight: 'bold',
                zIndex: 10,
                marginBottom: 4,
            }}>WELCOME TO ENERGIZE COMMUNITIES!</Typography>
            <Link to="/city/sackville" style={{ textDecoration: 'none', zIndex: 10 }}>
                <Typography sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    padding: 3,
                    borderRadius: 5,
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'red',
                }}>START NOW!</Typography>
            </Link>
        </Box>
    )
}
