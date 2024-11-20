import {
	Clone,
	Html,
	OrbitControls,
	useGLTF,
} from '@react-three/drei'
import { EnergyModel3D } from '../../types/model'
import { ThreeEvent } from '@react-three/fiber'
import { models } from '../../data/models'
import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { City } from '../../types/city'

const TopographicalMap = (props: {
	city: City
}) => {
	const gltf = useGLTF(`${process.env.PUBLIC_URL}${props.city.modelUrl}`)
	return <primitive object={gltf.scene} />
}

export const Model = ({
	position,
	scale = 1,
	modelPath,
	onClick,
	onPointerOver,
	onPointerOut,
}: {
	position: [number, number, number]
	scale?: number
	modelPath: string
	onClick?: (e: ThreeEvent<MouseEvent>) => void
	onPointerOver?: (e: ThreeEvent<PointerEvent>) => void
	onPointerOut?: (e: ThreeEvent<PointerEvent>) => void
}) => {
	const { scene } = useGLTF(`${process.env.PUBLIC_URL}${modelPath}`)
	return (
		<Clone
			object={scene}
			position={position}
			scale={scale}
			onClick={onClick}
			// Changes cursor to pointer when hovering over model
			onPointerOver={onPointerOver}
			onPointerOut={onPointerOut}
		/>
	)
}

export const EnergyModel = ({ model }: { model: EnergyModel3D }) => {
	const modelTemplate = models.find((m) => m.name === model.type)!
	const [isHovered, setIsHovered] = useState(false)
	return (
		<>
			<Model
				position={model.position}
				modelPath={modelTemplate.path}
				scale={modelTemplate.scale}
				onPointerOver={(e) => {
					e.stopPropagation()
					setIsHovered(true)
					document.body.style.cursor = 'pointer'
				}}
				onPointerOut={(e) => {
					e.stopPropagation()
					setIsHovered(false)
					document.body.style.cursor = 'auto'
				}}
				onClick={(e) => {
					e.stopPropagation()
					console.log('Clicked on', model.id)
				}}
			/>
			{isHovered && (
				<Html
					position={[model.position[0], model.position[1] + 5, model.position[2]]} // Offset tooltip above the model
					center // Center the tooltip over the position
					distanceFactor={6} // Adjust size based on distance from camera
					occlude // Hide when behind other objects
					className="pointer-events-none" // Prevent tooltip from intercepting mouse events
				>
					<Box
						sx={{
							padding: 10,
							backgroundColor: 'white',
							width: 800,
							borderRadius: 20,
						}}
					>
						<Typography sx={{ fontSize: 120, fontWeight: 'bold' }}>
							{model.type} Energy
						</Typography>
						<Typography sx={{ fontSize: 100 }}>
							Click to view more info
						</Typography>
					</Box>
				</Html>
			)}
		</>
	)
}

export const Scene = ({
	energyModels,
	city,
}: {
	energyModels: EnergyModel3D[]
	city: City
}) => {
	return (
		<>
			<color attach="background" args={['#87CEEB']} />
			<ambientLight intensity={0.5} />
			<color attach="background" args={['#87CEEB']} />
			<directionalLight position={[10, 10, 5]} intensity={1} />
			<TopographicalMap city={city} />
			{energyModels.map((model, index) => (
				<EnergyModel key={index} model={model} />
			))}
			<OrbitControls />
		</>
	)
}

useGLTF.preload(`${process.env.PUBLIC_URL}/models/sackville-topo.glb`)
