<script context="module">

	import { filter_asset_sub } from "../../../../../store/map.js";

	let intake_sungai = true;
	let tampungan = true;
	filter_asset_sub.subscribe(value => {
		let val = value[7].type_air_baku;
		intake_sungai = val[0].checked;
		tampungan = val[1].checked;
	});

	export function filteredAirBaku(feature) {
		let type_air_baku = feature.get("type");

		if ((type_air_baku === "INTAKE_SUNGAI") && intake_sungai || (type_air_baku === "TAMPUNGAN") && tampungan) {
			return true;
		}
	}

</script>