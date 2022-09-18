export type City = {
	id: string,
	name: string,
}

export class CityApi {

	getList = async (): Promise<City[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/master/kabupaten`);
		const result = await response.json();

		if (response.ok) {
			return result;
		} else {
			throw new Error(result);
		}
	};

	getArea = async (params): Promise<[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/area/kabupaten?id=${params}`);
		const result = await response.json();

		if (response.ok) {
			return result;
		} else {
			throw new Error(result);
		}
	};
}