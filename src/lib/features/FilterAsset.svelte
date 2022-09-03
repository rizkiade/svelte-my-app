<script context="module">
	import { filter_asset, filter_asset_sub, paramsKewenangan } from "../../store/map.js";

	let paramKw;
	paramsKewenangan.subscribe(value => {
		paramKw = value;
	});

	let pengelola;
	let ws;
	filter_asset.subscribe(value => {
		pengelola = value.pengelolaId;
		ws = value.wsId;
	});

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


	export function filteredAsset(feature) {

		//...add logic..

		let kw = feature.get("kewenangan");
		let pengId = feature.get("pengelola_id");
		let wsId = feature.get("ws_id");
		let type_pos = feature.get("jenis_pos");
		let inf_id = feature.get("type_id");


		if (paramKw && paramKw.toUpperCase() !== kw) {
			return false;
		} else {

			if (pengelola && pengelola !== pengId) {
				return false;
			} else {

				if (ws && ws !== wsId) {
					return false;
				} else {

					if ([14, 15, 16].includes(inf_id)) {

						if ((type_pos.includes("pos_manual") && pos_manual) || (type_pos.includes("pos_otomatik") && pos_otomatik) || (type_pos.includes("pos_telemetri") && pos_telemetri) || (type_pos.includes("") && pos_undefined)) {
							// console.log("ada pos manual");
							return true;
						}

					} else {

						return true;
					}

				}

				// return !(ws && ws !== wsId);
			}
		}

	}

</script>
