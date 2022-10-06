<script>

	import { getContext } from "svelte";
	import { mapKey, search_features } from "../../../store/map.js";
	import VectorSource from "ol/source/Vector.js";
	import VectorLayer from "ol/layer/Vector.js";
	import { styleIcon } from "../../helper/style.js";
	import { Feature } from "ol";
	import { Point } from "ol/geom.js";

	const { getMap } = getContext(mapKey);
	const map = getMap();

	const iconFeature = new Feature();

	const VSourceSearch = new VectorSource({
		features: [iconFeature]
	});
	const VLayerSearch = new VectorLayer({
		source: VSourceSearch,
		zIndex: 10,
		style: styleIcon
	});

	let reloadMap = () => {

		if (map) {
			map.removeLayer(VLayerSearch);
		}

		let coordinate = [undefined, undefined];
		if ($search_features.coordinate) {
			coordinate = $search_features.coordinate.split(" ");

			iconFeature.setProperties({
				id: $search_features.id,
				name: $search_features.name,
				type_name: $search_features.type,
				pengelola_name: $search_features.pengelola,
				ws_name: $search_features.ws,
				das_name: $search_features.das,
				provinsi: $search_features.provinsi,
				kabupaten: $search_features.kabupaten,
				kecamatan: $search_features.kecamatan,
				kelurahan: $search_features.desa
			});
		}
		iconFeature.setGeometry(new Point([coordinate[0], coordinate[1]]));

		if (map) {
			map.addLayer(VLayerSearch);
		}
	};

	search_features.subscribe(() => reloadMap());
</script>