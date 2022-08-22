import { ws } from "../../../store/map.js";

export type WilayahSungai = {
	id: number,
	name: string,
}

export class WilayahSungaiApi {
	getList = async (): Promise<WilayahSungai[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/master/ws`);
		const result = await response.json();

		if (response.ok) {
			ws.set(result);
			return result;
		} else {
			throw new Error(result);
		}
	};

	getArea = async (): Promise<[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/area/ws`);
		const result = await response.json();

		if (response.ok) {
			return result;
		} else {
			throw new Error(result);
		}
	};
}