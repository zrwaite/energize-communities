import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { City, CityData } from './types/city'
import { cities } from './data/cities'

export const CitySelect = (props: {
	city: City | null
	setCity: (city: City) => void
	setCityData: (cityData: CityData) => void
	next: () => void
}) => {
    const handleChange = (event: SelectChangeEvent) => {
        const city = Object.values(cities).find((city) => city.city.name === event.target.value)!
        props.setCity(city.city)
        props.setCityData(city.data)
    };
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
                width: '100%',
                p: 2,
			}}
		>
			<Typography>Select City:</Typography>
			<FormControl>
				<InputLabel id="city-select-label">City</InputLabel>
				<Select
					labelId="city-select-label"
					id="city-select"
                    sx={{ width: 200 }}
					value={props.city?.name}
					label="City"
					onChange={handleChange}
				>
                    {Object.values(cities).map((city) => (
                        <MenuItem value={city.city.name}>{city.city.name}</MenuItem>
                    ))}
				</Select>
			</FormControl>
            <Button onClick={props.next} disabled={!props.city}>Next</Button>
		</Box>
	)
}
