import { retrieveGeo } from './retrieveGeo';

export async function useGeo() {
  var resp = await retrieveGeo();
  return {
    latitude: resp.latitude,
    longitude: resp.longitude,
    city: resp.city,
    state: resp.region,
  }
}
