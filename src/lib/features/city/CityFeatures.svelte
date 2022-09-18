<script>

	import VectorSource from "ol/source/Vector.js";
	import VectorLayer from "ol/layer/Vector.js";
	import { getContext } from "svelte";
	import { mapKey, paramsAdm } from "../../../store/map.js";
	import { GeoJSON } from "ol/format.js";
	import { styleArea } from "../../helper/style.js";
	import { featureExistAdm } from "../../../store/features.js";
	import { kabupaten_visible } from "../../../store/map";

	const { getMap } = getContext(mapKey);
	const map = getMap();

	const VSourceCity = new VectorSource();
	const VLayerCity = new VectorLayer({
		source: VSourceCity
	});

	let feature = {
		type: "FeatureCollection",
		features: []
	};

	let reloadMap = () => {
		if (map) {
			map.removeLayer(VLayerCity);
		}

		// eslint-disable-next-line no-prototype-builtins
		if ($featureExistAdm.hasOwnProperty($paramsAdm.provId)) {
			// eslint-disable-next-line no-prototype-builtins
			if ($featureExistAdm[$paramsAdm.provId].kabupaten.hasOwnProperty($paramsAdm.kabId)) {
				if ($featureExistAdm[$paramsAdm.provId].kabupaten[$paramsAdm.kabId].feature)
					feature = $featureExistAdm[$paramsAdm.provId].kabupaten[$paramsAdm.kabId].feature;
			}
		}

		VSourceCity.clear();
		VSourceCity.addFeatures(new GeoJSON().readFeatures(feature));
		VLayerCity.setZIndex(5);
		VLayerCity.setStyle(styleArea);
		if ($paramsAdm.kabId !== undefined) {
			VLayerCity.setVisible($kabupaten_visible);
		} else {
			VLayerCity.setVisible(false);
		}

		if (map) {
			map.addLayer(VLayerCity);
		}

	};

	$: reloadMap($paramsAdm.kabId, $kabupaten_visible, $featureExistAdm);

</script>