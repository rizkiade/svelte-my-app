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
			province.set(result);
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