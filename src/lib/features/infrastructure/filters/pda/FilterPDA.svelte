<script context="module">

	import { filter_asset_sub } from "../../../../../store/map.js";


	let pos_manual = true;
	let pos_otomatik = true;
	let pos_telemetri = true;
	let pos_undefined = true;
	filter_asset_sub.subscribe(value => {
		let val = value[15].type_pos;
		pos_manual = val[0].checked;
		pos_otomatik = val[1].checked;
		pos_telemetri = val[2].checked;
		pos_undefined = val[3].checked;
	});

	export function filteredPDA(feature) {
		let type_pos = feature.get("jenis_pos");
		if ((type_pos.includes("pos_manual") && pos_manual) || (type_pos.includes("pos_otomatik") && pos_otomatik) || (type_pos.includes("pos_telemetri") && pos_telemetri) || (type_pos.includes("") && pos_undefined)) {
			return true;
		}

	}
</script>