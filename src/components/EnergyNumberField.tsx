import { TextField } from "@mui/material"
import { EnergyModelType } from "../types/model"
import { City, CityData } from "../types/city"
import { updateCityData } from "../data/models"

export const EnergyNumberField = (props: {
    type: EnergyModelType,
    cityData: CityData,
    setCityData: (cityData: CityData) => void,
    city: City,
}) => {
    return (
        <TextField
            label={"Number of " + props.type}
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
            sx={{
                m: 1
            }}
        />
    )
}