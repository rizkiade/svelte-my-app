export type Features = {
	type: "FeatureCollection",
	features: []
}

export class SungaiApi {
	getRiverFeature = async (ws: string, ordo_number: number): Promise<Features[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/area/sungai?ws=${ws}&ordo=${ordo_number}`);
		const result = await response.json();

		if (response.ok) {
			// assets_features.set(result);
			return result;
		} else {
			throw new Error(result);
		}
	};

}