<script context="module">
	import { filter_asset, paramsKewenangan, refIdOnly } from "../../store/map.js";
	import { filteredBendungan } from "./infrastructure/filters/bendungan/FilterBendungan.svelte";
	import { filteredPDA } from "./infrastructure/filters/pda/FilterPDA.svelte";
	import { filteredPCH } from "./infrastructure/filters/pch/FilterPCH.svelte";
	import { filteredKlim } from "./infrastructure/filters/pklim/FilterPKlim.svelte";

	let ref_id;
	refIdOnly.subscribe(value => {
		ref_id = value;
	});

	let paramKw;
	paramsKewenangan.subscribe(value => {
		paramKw = value;
	});

	let pengelola, ws, das, province, city, district, urban;
	filter_asset.subscribe(value => {
		pengelola = value.pengelolaId;
		ws = value.wsId;
		das = value.dasId;
		province = value.provinsi;
		city = value.kabupaten;
		district = value.kecamatan;
		urban = value.kelurahan;
	});

	export function filteredAsset(feature) {

		let refId = feature.get("ref_id");
		let kw = feature.get("kewenangan");
		let pengId = feature.get("pengelola_id");
		let wsId = feature.get("ws_id");
		let dasId = feature.get("das_id");
		let provinceText = feature.get("provinsi");
		let kabupatenText = feature.get("kabupaten");
		let kecamatanText = feature.get("kecamatan");
		let kelurahanText = feature.get("kelurahan");
		let inf_id = feature.get("type_id");


		if (ref_id && refId === null) {
			return false;
		} else {

			if (paramKw && paramKw.toUpperCase() !== kw) {
				return false;
			} else {

				if (pengelola && pengelola !== pengId) {
					return false;
				} else {

					if (ws && ws !== wsId) {
						return false;
					} else {

						if (das && das !== dasId) {
							return false;
						} else {

							if (province && province !== provinceText) {
								return false;
							} else {

								if (city && city !== kabupatenText) {
									return false;
								} else {

									if (inf_id === 3) {
										return filteredBendungan(feature);
									}

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
									}

									return true;
								}
							}
						}
					}

					// return !(ws && ws !== wsId);
				}
			}
		}

	}

</script>
