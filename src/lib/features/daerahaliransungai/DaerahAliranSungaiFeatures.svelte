<script>
	import { getContext } from "svelte";
	import { das_visible, filter_asset, mapKey } from "../../../store/map.js";
	import VectorSource from "ol/source/Vector.js";
	import { GeoJSON } from "ol/format.js";
	import VectorLayer from "ol/layer/Vector.js";
	import { Fill, Stroke, Style } from "ol/style.js";
	import { featureExist } from "../../../store/features.js";

	const { getMap } = getContext(mapKey);
	const map = getMap();

	let feature = {
		type: "FeatureCollection",
		features: []
	};

	const VSourceDAS = new VectorSource({
		features: new GeoJSON().readFeatures(feature)
	});
	const VLayerDAS = new VectorLayer({
		source: VSourceDAS
	});

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	let styleArea = (feature) => {

		let id = feature.get("id");
		let color = feature.get("color");

		if ($filter_asset.dasId) {
			if ($filter_asset.dasId === id) {
				return new Style({
					stroke: new Stroke({
						color: "#502909",
						width: 1
					}),
					fill: new Fill({
						color: "rgba(61,12,30,0.7)"
					})
				});
			}
		} else {
			return new Style({
				stroke: new Stroke({
					color: "#502909",
					width: 1
				}),
				fill: new Fill({
					color: color
				})
			});
		}
	};

	let reloadMap = () => {

		if (map) {
			map.removeLayer(VLayerDAS);
		}

		if ($featureExist[$filter_asset.wsId]) {
			// eslint-disable-next-line no-prototype-builtins
			if ($featureExist[$filter_asset.wsId].hasOwnProperty(24)) {
				feature = $featureExist[$filter_asset.wsId][24];
			}
		}

		VSourceDAS.clear();
		VSourceDAS.addFeatures(new GeoJSON().readFeatures(feature));
		VLayerDAS.setZIndex(3);
		VLayerDAS.setStyle(styleArea);
		if ($filter_asset.wsId !== undefined) {
			VLayerDAS.setVisible($das_visible);
		} else {
			VLayerDAS.setVisible(false);
		}

		if (map) {
			map.addLayer(VLayerDAS);
		}
	};

	$:reloadMap($filter_asset.wsId, $filter_asset.dasId, $das_visible, $featureExist[filter_asset.wsId]);

</script>