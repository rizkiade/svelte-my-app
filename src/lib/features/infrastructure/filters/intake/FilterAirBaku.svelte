<script context="module">

	import { advanced_filter_asset } from "../../../../../store/map.js";

	let intake_sungai = true;
	let tampungan = true;
	advanced_filter_asset.subscribe(value => {
		let val = value[27].type_air_baku;
		intake_sungai = val[0].checked;
		tampungan = val[1].checked;
	});

	export function filteredAirBaku(feature) {
		let type_air_baku = feature.get("intake_object");

		if ((type_air_baku === "SUNGAI") && intake_sungai || (type_air_baku === "TAMPUNGAN") && tampungan) {
			return true;
		}
	}

</script>