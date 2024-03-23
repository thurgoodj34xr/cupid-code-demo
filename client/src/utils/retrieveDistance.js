import axios from "axios";
export async function retrieveDistance(oLat, oLong, dLat, dLong) {
    const origin = `${oLat},${oLong}`;
    const destination = `${dLat}, ${dLong}`;
    const modes = "foot,car";
    const units = "imperial";
    const apiKey = "prj_test_sk_6e67e5421c7aa8e59af46e20f872471dd53096d6";

    const apiUrl = `https://api.radar.io/v1/route/distance?origin=${origin}&destination=${destination}&modes=${modes}&units=${units}`;
    const headers = {
        "Authorization": apiKey,
    };
    const response = await axios.get(apiUrl, { headers });
    return response
}
