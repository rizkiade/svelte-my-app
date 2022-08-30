<script context="module">
	import { filter_asset, paramsKewenangan } from "../../store/map.js";

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
		// console.log(kw);
		// console.log(typeof pengId);
		// console.log(typeof pengelola);

		// let x = get(paramsKewenangan);

		if (paramKw && paramKw.toUpperCase() !== kw) {
			return false;
		} else {

			if (pengelola && pengelola !== pengId) {
				return false;
			} else {

				return !(ws && ws !== wsId);
			}
		}

	}

</script>
