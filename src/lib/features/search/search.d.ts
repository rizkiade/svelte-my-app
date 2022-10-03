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