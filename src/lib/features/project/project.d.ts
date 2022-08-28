import { categoryProject } from "../../../store/map.js";
import { projectLayerSource } from "../../../store/features.js";

export type Project = {
	id: number,
	name: string,
}

// export type Features = {
// 	type: "FeatureCollection",
// 	features: []
// }

export type Json = [];

export class ProjectApi {
	getListProject = async (): Promise<Project[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/master/category`);
		const result = await response.json();

		if (response.ok) {
			categoryProject.set(result);
			return result;
		} else {
			throw new Error(result);
		}
	};

	getProject = async (params: string): Promise<Json[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/infrastructure/project_feature?${params}`);
		const result = await response.json();

		if (response.ok) {
			projectLayerSource.set(result);
			return result;
		} else {
			throw new Error(result);
		}
	};
}