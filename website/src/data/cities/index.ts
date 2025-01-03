import { hamburg, hamburgData } from "./hamburg";
import { sackville, sackvilleData } from "./sackville";
import { waterloo, waterlooData } from "./waterloo";

export const cities = {
    sackville: {
        city: sackville,
        data: sackvilleData,
    },
    waterloo: {
        city: waterloo,
        data: waterlooData,
    },
    hamburg: {
        city: hamburg,
        data: hamburgData,
    }
}