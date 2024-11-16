import { CityData } from "../types/city"
import { models, modelTypes } from "./models"

export const calculateTotalCost = (cityData: CityData) => {
    let totalCost = 0
    for (const type of modelTypes) {
        const model = models.find((model) => model.name === type)!
        totalCost += cityData[`num${type}`] * model.price
    }
    return totalCost
}