import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material'
import { City } from '../types/city'
import { cities } from '../data/cities'
import { useNavigate } from 'react-router-dom'

export const CitySelect = (props: {
	city: City | null
}) => {
	const navigate = useNavigate();

    const handleChange = (event: SelectChangeEvent) => {
		navigate('/city/' + event.target.value.toLowerCase());
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
		</Box>
	)
}
