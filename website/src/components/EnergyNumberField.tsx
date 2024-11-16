import { Box, TextField, Typography } from "@mui/material"
import { EnergyModelType } from "../types/model"
import { City, CityData } from "../types/city"
import { models, updateCityData } from "../data/models"
import { formatNumber } from "../utils/formatting"

export const EnergyNumberField = (props: {
    type: EnergyModelType,
    cityData: CityData,
    setCityData: (cityData: CityData) => void,
    city: City,
}) => {
	const model = models.find((m) => m.name === props.type)!
    
    return (<Box sx={{ m: 1 }}>
        <TextField
            label={`${props.type}: ${model.displayPrice} per unit`}
            type="number"
            value={props.cityData[`num${props.type}`]}
            onChange={(e) => props.setCityData(
                updateCityData(props.cityData, props.city, props.type, parseInt(e.target.value))
            )}
            slotProps={{
                inputLabel: {
                    shrink: true,
                },
            }}
        />
        <Typography>Cost: ${formatNumber(props.cityData[`num${props.type}`] * model.price)}</Typography>
    </Box>
    )
}