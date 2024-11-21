export interface TutorialData {
	name: string;
	rating: string;
	description: string;
	pros: string;
	cons: string;
	averageCost: string;
	dailyEnergy: string;
	image: string;
	image3d: string;
}

export const tutorialData: TutorialData[] = [{
	name: "Solar Panels",
	rating: "★★★★☆",
	description: "Solar power farms consist of large arrays of photovoltaic panels that convert sunlight into electricity on a significant scale.",
	pros: "Renewable and abundant energy source, scalable to meet large energy demands.",
	cons: "High initial setup costs, requires substantial land area.",
	averageCost: "$1 million - $3 million for a small to medium solar farm.",
	dailyEnergy: "20,000 - 50,000 kWh per day for a small to medium solar farm.",
	image: '/tutorial/solar.jpeg',
	image3d: '/tutorial/solar-3d.png',
}, {
	name: "Geothermal System",
	rating: "★★★★☆",
	description: "Geothermal systems use heat from the Earth’s interior to generate electricity or provide heating.",
	pros: "Sustainable and consistent energy supply, low environmental impact.",
	cons: "High initial costs, location-dependent feasibility.",
	averageCost: "$2.5 million - $5 million for a small-scale plant.",
	dailyEnergy: "48,000 - 72,000 kWh per day.",
	image: '/tutorial/geo.jpeg',
	image3d: '/tutorial/geo-3d.png',
}, {
	name: "Nuclear Power Plant",
	rating: "★★★☆☆",
	description: "Nuclear power plants generate electricity through nuclear fission reactions.",
	pros: "High energy output, low greenhouse gas emissions.",
	cons: "High initial and decommissioning costs, radioactive waste disposal issues.",
	averageCost: "$6-9 billion.",
	dailyEnergy: "Approximately 30,000,000 - 40,000,000 kWh per day.",
	image: '/tutorial/nuclear.jpeg',
	image3d: '/tutorial/nuclear-3d.png',
}, {
	name: "Hydro Dam for Small Rivers",
	rating: "★★★☆☆",
	description: "Hydro dams harness the energy from flowing water to generate electricity.",
	pros: "Renewable energy source, provides water storage and flood control.",
	cons: "Environmental impact on aquatic ecosystems, high initial construction costs.",
	averageCost: "$1 million - $5 million for a small hydro project.",
	dailyEnergy: "24,000 - 120,000 kWh per day.",
	image: '/tutorial/hydro.jpeg',
	image3d: '/tutorial/hydro-3d.png',
}, {
	name: "On Shore Wind Turbine",
	rating: "★★★★☆",
	description: "Onshore wind turbines convert wind energy into electricity using large rotating blades.",
	pros: "Renewable and clean energy, relatively low operational costs.",
	cons: "Intermittent energy production, visual and noise impact on local communities.",
	averageCost: "$1.3 million - $2.2 million for a standard 2 MW turbine.",
	dailyEnergy: "4,800 - 9,600 kWh per day.",
	image: '/tutorial/wind.jpeg',
	image3d: '/tutorial/wind-3d.png',
}, {
	name: "Natural Gas Plant",
	rating: "★☆☆☆☆",
	description: "Natural gas plants burn natural gas to generate electricity.",
	pros: "Lower CO2 emissions compared to coal, reliable and consistent power supply.",
	cons: "Non-renewable resource contributes heavily to greenhouse gas emissions.",
	averageCost: "$600 million - $1.2 billion for a 1,000 MW plant.",
	dailyEnergy: "Approximately 15,000,000 - 25,000,000 kWh per day.",
	image: '/tutorial/gas.jpeg',
	image3d: '/tutorial/gas-3d.png',
}]
