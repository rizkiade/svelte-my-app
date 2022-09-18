<script>

	import { getContext } from "svelte";
	import { mapKey, paramsAdm } from "../../../store/map.js";
	import VectorSource from "ol/source/Vector.js";
	import VectorLayer from "ol/layer/Vector.js";
	import { GeoJSON } from "ol/format.js";
	import { prov_visible } from "../../../store/map";
	import { styleArea } from "../../helper/style.js";
	import { featureExistAdm } from "../../../store/features.js";

	const { getMap } = getContext(mapKey);
	const map = getMap();

	const VSourceProvince = new VectorSource();
	const VLayerProvince = new VectorLayer({
		source: VSourceProvince
	});

	let feature = {
		type: "FeatureCollection",
		features: []
	};

	let reloadMap = () => {

		if (map) {
			map.removeLayer(VLayerProvince);
		}

		// eslint-disable-next-line no-prototype-builtins
		if ($featureExistAdm.hasOwnProperty($paramsAdm.provId)) {
			if ($featureExistAdm[$paramsAdm.provId].feature)
				feature = $featureExistAdm[$paramsAdm.provId].feature;
		}

		VSourceProvince.clear();
		VSourceProvince.addFeatures(new GeoJSON().readFeatures(feature));
		VLayerProvince.setZIndex(4);
		VLayerProvince.setStyle(styleArea);
		if ($paramsAdm.provId !== undefined) {
			VLayerProvince.setVisible($prov_visible);
		} else {
			VLayerProvince.setVisible(false);
		}

		if (map) {
			map.addLayer(VLayerProvince);
		}
	};

	$: reloadMap($paramsAdm.provId, $prov_visible, $featureExistAdm);

</script>
