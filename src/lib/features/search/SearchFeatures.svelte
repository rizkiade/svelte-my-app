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

			iconFeature.setProperties({ id: $search_features.id });
			iconFeature.setProperties({ name: $search_features.name });
			iconFeature.setProperties({ type_name: $search_features.type });
			iconFeature.setProperties({ pengelola_name: $search_features.pengelola });
			iconFeature.setProperties({ ws_name: $search_features.ws });
			iconFeature.setProperties({ das_name: $search_features.das });
			iconFeature.setProperties({ provinsi: $search_features.provinsi });
			iconFeature.setProperties({ kabupaten: $search_features.kabupaten });
			iconFeature.setProperties({ kecamatan: $search_features.kecamatan });
			iconFeature.setProperties({ kelurahan: $search_features.desa });
		}
		iconFeature.setGeometry(new Point([coordinate[0], coordinate[1]]));

		if (map) {
			map.addLayer(VLayerSearch);
		}
	};

	search_features.subscribe(() => {
		reloadMap();
	});
</script>