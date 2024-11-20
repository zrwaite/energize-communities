import { models } from "../data/models"

export type EnergyModelPos = [number, number, number]
export type EnergyModelTemplate = typeof models[number]
export type EnergyModelType = EnergyModelTemplate['name']

export type EnergyModel3D = {
	id: string
	position: EnergyModelPos
	type: EnergyModelType
}
