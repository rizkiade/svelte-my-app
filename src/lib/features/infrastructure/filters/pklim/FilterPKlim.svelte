<script context="module">

	import { advanced_filter_asset } from "../../../../../store/map.js";


	let pos_manual = true;
	let pos_otomatik = true;
	let pos_telemetri = true;
	let pos_undefined = true;
	advanced_filter_asset.subscribe(value => {
		let val = value[16].type_pos;
		pos_manual = val[0].checked;
		pos_otomatik = val[1].checked;
		pos_telemetri = val[2].checked;
		pos_undefined = val[3].checked;
	});

	export function filteredKlim(feature) {
		let type_pos = feature.get("sensor_type");
		if ((type_pos.includes("MANUAL") && pos_manual) || (type_pos.includes("OTOMATIK") && pos_otomatik) || (type_pos.includes("TELEMETRI") && pos_telemetri) || (type_pos.includes("") && pos_undefined)) {
			return true;
		}

	}
</script>