export type District = {
	id: string,
	name: string,
}

export class DistrictApi {

	getList = async (params): Promise<District[]> => {

		const response = await fetch(`${import.meta.env.VITE_GIS_API}/master/kecamatan?prov=${params.provinsi}&kab=${params.kabupaten}`);
		const result = await response.json();

		if (response.ok) {
			return result;
		} else {
			throw new Error(result);
		}
	};
}