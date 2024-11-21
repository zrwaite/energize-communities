import { TutorialData } from "../../data/tutorial"

export const EnergySourceStep = (props: {
	energySource: TutorialData
}) => {
	const source = props.energySource
	return (
		<div style={{ width: '100%' }}>
			<div style={{ width: '100%' }}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '500px' }}>
					<h2 style={{ margin: 0, backgroundColor: '#ffffab' }}>{source.name}:</h2>
					<h2 style={{ margin: 0 }}>Our Rating: {source.rating}</h2>
				</div>
				<p style={{ margin: '4px' }}>
					<span style={{ fontWeight: 600 }}>
						{"Description: "}
					</span>
					{source.description}
				</p>
				<p style={{ margin: '4px' }}>
					<span style={{ fontWeight: 600 }}>
						{"Pros: "}
					</span>
					{source.pros}
				</p>
				<p style={{ margin: '4px' }}>
					<span style={{ fontWeight: 600 }}>
						{"Cons: "}
					</span>
					{source.cons}
				</p>
				<p style={{ margin: '4px' }}>
					<span style={{ fontWeight: 600 }}>
						{"Average Cost per Setup: "}
					</span>
					{source.averageCost}
				</p>
				<p style={{ margin: '4px' }}>
					<span style={{ fontWeight: 600 }}>
						{"Daily Energy Created: "}
					</span>
					{source.dailyEnergy}
				</p>
			</div>
			<div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<img src={`${process.env.PUBLIC_URL}${source.image}`} alt={source.name} style={{ height: '150px' }} />
				<img src={`${process.env.PUBLIC_URL}${source.image3d}`} alt={source.name} style={{ height: '150px' }} />
			</div>
		</div>
	)
}
