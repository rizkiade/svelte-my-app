import { province } from "../../../store/map.js";

export type Province = {
	id: string,
	name: string,
}


export class ProvinceApi {

	getList = async (): Promise<Province[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/master/province`);
		const result = await response.json();

		if (response.ok) {
			const result_clean = result.map(({ id, name }) => ({ value: id, label: name }));
			province.set(result_clean);
		} else {
			throw new Error(result);
		}
	};

	getArea = async (params): Promise<[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/area/province?id=${params}`);
		const result = await response.json();

		if (response.ok) {
			return result;
		} else {
			throw new Error(result);
		}
	};
}