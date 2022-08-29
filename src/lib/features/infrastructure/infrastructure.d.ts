// import { assets_features } from "../../../store/map.js";

// export type Infrastructure = {
// 	id: number,
// 	name: string,
// }

export type Features = {
	type: "FeatureCollection",
	features: []
}

export class InfrastructureApi {
	getAsset = async (id): Promise<Features[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/infrastructure/asset?id=${id}`);
		const result = await response.json();

		if (response.ok) {
			// assets_features.set(result);
			return result;
		} else {
			throw new Error(result);
		}
	};

	// getArea = async (params: number): Promise<Features[]> => {
	// 	const response = await fetch(`${import.meta.env.VITE_GIS_API}/area/pengelola?id=${params}`);
	// 	const result = await response.json();
	//
	// 	if (response.ok) {
	// 		return result;
	// 	} else {
	// 		throw new Error(result);
	// 	}
	// };
}