export type Pengelola = {
	id: number,
	name: string,
}

export class PengelolaApi {
	getAll = async (): Promise<Pengelola[]> => {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/master/pengelola`);
		const result = await response.json();

		if (response.ok) {
			return result;
		} else {
			throw new Error(result);
		}
	};
}