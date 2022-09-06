<script context="module">
	import { filter_asset, paramsKewenangan } from "../../store/map.js";
	import { filteredPDA } from "./infrastructure/filters/pda/FilterPDA.svelte";
	import { filteredPCH } from "./infrastructure/filters/pch/FilterPCH.svelte";
	import { filteredKlim } from "./infrastructure/filters/pklim/FilterPKlim.svelte";

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

	export function filteredAsset(feature) {

		//...add logic..

		let kw = feature.get("kewenangan");
		let pengId = feature.get("pengelola_id");
		let wsId = feature.get("ws_id");
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

						if (inf_id === 14) {
							return filteredPCH(feature);
						}

						if (inf_id === 15) {
							return filteredPDA(feature);
						}

						if (inf_id === 16) {
							return filteredKlim(feature);
						}

						return true;

					} else {

						return true;
					}

				}

				// return !(ws && ws !== wsId);
			}
		}

	}

</script>
