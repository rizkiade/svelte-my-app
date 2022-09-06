<script>

	import { getContext } from "svelte";
	import { filter_asset, mapKey, ordo_visible } from "../../../store/map.js";
	import VectorSource from "ol/source/Vector.js";
	import VectorLayer from "ol/layer/Vector.js";
	import { GeoJSON } from "ol/format.js";
	import { Stroke, Style } from "ol/style.js";
	import { featureExist } from "../../../store/features.js";

	const { getMap } = getContext(mapKey);
	const map = getMap();

	let feature = {
		type: "FeatureCollection",
		features: []
	};

	const styleSungai = (feature) => {
		let type = feature.getGeometry().getType();
		let ORDO = feature.get("ordo");

		if (type === "MultiLineString" || type === "LineString") {
			let color, width;
			switch (ORDO) {
				case "ORDO 1":
					color = "#05f619";
					width = 2.5;
					break;
				case "ORDO 2":
					color = "#403472";
					width = 2;
					break;
				case "ORDO 3":
					color = "#c205f6";
					width = 1.5;
					break;
				default:
					color = "#002267";
					width = 1;
					break;
			}

			return new Style({
				stroke: new Stroke({
					color: color,
					width: width
				})
			});
		}
	};

	const VSourceSungai = new VectorSource({
		features: new GeoJSON().readFeatures(feature)
	});
	const VLayerSungai = new VectorLayer({
		source: VSourceSungai,
		style: styleSungai
	});


	let reloadMap = () => {

		if (map) {
			map.removeLayer(VLayerSungai);
		}

		VSourceSungai.clear();
		VSourceSungai.addFeatures(new GeoJSON().readFeatures(feature));
		VLayerSungai.setZIndex(4);
		if (map) {
			map.addLayer(VLayerSungai);
		}
	};
	$: reloadMap(feature, $filter_asset.wsId);

	let setSource = () => {

		// reset feature
		feature.features = [];

		if ($featureExist[$filter_asset.wsId]) {
			if ($featureExist[$filter_asset.wsId][23]) {

				let ordo_1 = $featureExist[$filter_asset.wsId][23]["ordo_1"];
				if (ordo_1 && $ordo_visible[1]) {
					if (Object.keys(ordo_1.feature).length !== 0 && ordo_1.feature.constructor === Object) {
						feature.features = [...feature.features, ...ordo_1.feature.features];
					}
				}

				let ordo_2 = $featureExist[$filter_asset.wsId][23]["ordo_2"];
				if (ordo_2 && $ordo_visible[2]) {
					if (Object.keys(ordo_2.feature).length !== 0 && ordo_2.feature.constructor === Object) {
						feature.features = [...feature.features, ...ordo_2.feature.features];
					}
				}

				let ordo_3 = $featureExist[$filter_asset.wsId][23]["ordo_3"];
				if (ordo_3 && $ordo_visible[3]) {
					if (Object.keys(ordo_3.feature).length !== 0 && ordo_3.feature.constructor === Object) {
						feature.features = [...feature.features, ...ordo_3.feature.features];
					}
				}

				let ordo_4 = $featureExist[$filter_asset.wsId][23]["ordo_4"];
				if (ordo_4 && $ordo_visible[4]) {
					if (Object.keys(ordo_4.feature).length !== 0 && ordo_4.feature.constructor === Object) {
						feature.features = [...feature.features, ...ordo_4.feature.features];
					}
				}
			}
		}
		reloadMap();
	};

	$:setSource($ordo_visible, $filter_asset.pengelolaId, $filter_asset.wsId);

</script>