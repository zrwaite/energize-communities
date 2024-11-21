import { Button } from '@mui/material'
import { tutorialData } from '../../data/tutorial'
import { gs } from '../../styles'
import { EnergySourceStep } from './EnergySourceStep'
import { SimulationTutorialModal } from './SimulationTutorialModal'
import { useState } from 'react'

export const SimulationTutorial = (props: {
	endTutorial: () => void
}) => {
	const [step, setStep] = useState(0)
	return (
		<SimulationTutorialModal endTutorial={props.endTutorial}>
			{step === 0 && (<>
				<p style={{ fontSize: '16px' }}>
					Welcome to the city of Energize, where our community is dedicated to educating about various energy sources. We provide insights on their environmental impact, installation costs, and energy production, while also considering factors like pollution, weather conditions, and resource sustainability.
				</p>
				<p style={{ fontSize: '16px' }}>
					Follow along as we explain the different forms of energy sources, the energy created daily, installation costs, as well as their pros and cons.
				</p>
				<p style={{ fontSize: '16px' }}>
					Keep in mind that the average Canadian uses 38kWh daily, making Canada the 7th largest energy consumer per capita, placing above the United States in 10th .
				</p>
			</>)}
			{/* 1, 2, 3, 4, 5, 6 */}
			{step >= 1 && step <=6 && (
				<EnergySourceStep energySource={tutorialData[step - 1]} />
			)}
			{step === 7 && (
				<div style={{ ...gs.centerCol, width: '100%'}}>
					<p style={{ fontSize: '20px' }}>
						Now, it's time to explore Energize! Use the settings on the left side to customize the energy sources you want to add or remove from our community. Remember to consider the setup costs and the daily energy requirements of your community.
					</p>
					<Button onClick={props.endTutorial} style={{
						backgroundColor: 'green',
						width: '100px',
						color: 'white',
					}}>
						Start 
					</Button>
				</div>
			)}
			{step !== 7 && <Button style={{
				position: 'absolute',
				bottom: '10px',
				right: '10px',
				backgroundColor: 'DodgerBlue',
				color: 'white',
				width: '100px',
			}} onClick={() => setStep(step + 1)}>Next</Button>}
			{step !== 0 && <Button style={{
				position: 'absolute',
				bottom: '10px',
				left: '10px',
				backgroundColor: 'grey',
				color: 'black',
				width: '100px',
			}} onClick={() => setStep(step -1)}>Back</Button>}
		</SimulationTutorialModal>
	)
}