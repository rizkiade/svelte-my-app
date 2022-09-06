import { ws } from "../../../store/map.js";
import { featureExist } from "../../../store/features.js";

export type Wilayahsungai = {
	id: string,
	name: string,
}

export class WilayahSungaiApi {
	getList = async (): Promise<Wilayahsungai[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/master/ws`);
		const result = await response.json();

		if (response.ok) {
			const ws_object = [];
			result.map(val => {
				ws_object[val.id] = {};
			});
			featureExist.set(ws_object);
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