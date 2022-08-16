export type WilayahSungai = {
	id: number,
	name: string,
}

export class WilayahSungaiApi {
	getAll = async (): Promise<WilayahSungai[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/master/ws`);
		const result = await response.json();

		if (response.ok) {
			return result;
		} else {
			throw new Error(result);
		}
	};
}