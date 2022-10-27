<script context="module">

	import { advanced_filter_asset } from "../../../../../store/map.js";

	let danau = true;
	let situ = true;
	let other = true;

	advanced_filter_asset.subscribe(value => {
		let val = value[2].jenis;

		danau = val[0].checked;
		situ = val[1].checked;
		other = val[2].checked;

	});

	export function filteredDanau(feature) {
		let jenis = feature.get("jenis");

		if ((jenis === "Danau") && danau || (jenis === "Situ") && situ || (jenis === null) && other) {
			return true;
		}
	}
</script>