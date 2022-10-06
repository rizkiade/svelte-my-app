export default async function getAssetByName(filterText) {
	filterText = filterText ? filterText.replace(" ", "_") : "";

	if (filterText !== "" && filterText.length >= 3) {
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/infrastructure?name=${filterText}`);
		const result = await response.json();

		if (response.ok) {
			return result;
		} else {
			throw new Error(result);
		}
	} else {
		return [];
	}
}

export class SearchApi {
	getGeoLocation = async (params): Promise<[]> => {
		const bodyRaw = {
			"coordinate": params.coordinate_input,
			"radius": params.radius
		};
		const response = await fetch(`${import.meta.env.VITE_GIS_API}/infrastructure/geo`, {
			method: "POST",
			body: JSON.stringify(bodyRaw)
		});
		const result = await response.json();

		if (response.ok) {
			return result;
		} else {
			throw new Error(result);
		}
	};
}