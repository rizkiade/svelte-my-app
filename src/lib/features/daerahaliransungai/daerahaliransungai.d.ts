export class DaerahAliranSungaiApi {
	getArea = async (params): Promise<[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/area/das?ws=${params}`);
		const result = await response.json();

		if (response.ok) {
			return result;
		} else {
			throw new Error(result);
		}
	};
}