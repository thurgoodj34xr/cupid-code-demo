import { retrieveDistance } from "./retrieveDistance";

export async function calculateDistanceCupidStandard(oLat, oLong, dLat, dLong, setState) {
    try {
        const distanceResp = await retrieveDistance(
            oLat,
            oLong.longitude,
            dLat,
            dLong
        );
        console.log(distanceResp)
        if (distanceResp.data.routes.car.duration.value == 0) {
            setState("Within 2 miles");
        } else {
            setState(distanceResp.data.routes.car.distance.text);
        }
    } catch (error) {
        setState("Error")
    }

}