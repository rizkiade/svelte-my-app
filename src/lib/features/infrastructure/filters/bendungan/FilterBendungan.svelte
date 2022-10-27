<script context="module">

	import { advanced_filter_asset } from "../../../../../store/map.js";


	let potensi = true;
	let persiapan = true;
	let pelaksanaan = true;
	let selesai = true;
	let tanpa_ket = true;
	let manfaat_irigasi = null;
	advanced_filter_asset.subscribe(value => {
		let val = value[3].status_infrastructure;
		potensi = val[0].checked;
		persiapan = val[1].checked;
		pelaksanaan = val[2].checked;
		selesai = val[3].checked;
		tanpa_ket = val[4].checked;
		manfaat_irigasi = value[3].manfaat_irigasi;


	});

	export function filteredBendungan(feature) {
		let status_infrastructure = feature.get("status_infrastructure");
		let irigasi = feature.get("irigasi");

		if ((status_infrastructure === "Potensi") && potensi || (status_infrastructure === "Tahap Rencana") && persiapan || (status_infrastructure === "Sedang Dibangun") && pelaksanaan || (status_infrastructure === "Sudah Terbangun") && selesai || (status_infrastructure === null) && tanpa_ket) {

			if (!manfaat_irigasi)
				return true;

			if (manfaat_irigasi !== null && irigasi >= manfaat_irigasi) {
				return true;
			}
		}
	}
</script>