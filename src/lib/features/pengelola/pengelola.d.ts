export type Pengelola = {
	id: number,
	name: string,
}

export type Features = {
	type: "FeatureCollection",
	features: []
}

export class PengelolaApi {
	getList = async (): Promise<Pengelola[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/master/pengelola`);
		const result = await response.json();

		if (response.ok) {
			return result;
		} else {
			throw new Error(result);
		}
	};

	getArea = async (params: number): Promise<Features> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/area/pengelola?id=${params}`);
		const result = await response.json();

		if (response.ok) {
			return result;
		} else {
			throw new Error(result);
		}
	};
}