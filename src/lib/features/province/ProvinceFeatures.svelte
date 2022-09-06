<script>

	import { getContext } from "svelte";
	import { filter_asset, mapKey } from "../../../store/map.js";
	import VectorSource from "ol/source/Vector.js";
	import VectorLayer from "ol/layer/Vector.js";
	import { GeoJSON } from "ol/format.js";
	import { prov_visible } from "../../../store/map";
	import { styleArea } from "../../helper/style.js";

	const { getMap } = getContext(mapKey);
	const map = getMap();

	let feature = {
		type: "FeatureCollection",
		features: []
	};

	const VSourceProvince = new VectorSource({
		features: new GeoJSON().readFeatures(feature)
	});
	const VLayerProvince = new VectorLayer({
		source: VSourceProvince
	});

	let reloadMap = () => {

		if (map) {
			map.removeLayer(VLayerProvince);
		}

		VSourceProvince.clear();
		VSourceProvince.addFeatures(new GeoJSON().readFeatures(feature));
		VLayerProvince.setZIndex(4);
		VLayerProvince.setStyle(styleArea);
		// VLayerProvince.setVisible($prov_visible);
		if ($filter_asset.provinsi !== undefined) {
			VLayerProvince.setVisible($prov_visible);
		} else {
			VLayerProvince.setVisible(false);
		}

		if (map) {
			map.addLayer(VLayerProvince);
		}
	};

	// $: reloadMap($prov_features, $paramsAdm.provId, $prov_visible);

</script>
