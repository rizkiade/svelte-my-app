<script>
	import { mapKey, ws_visible, paramsKewenangan, wsFilter, filter_asset } from "../../../store/map.js";
	import { getContext, onMount } from "svelte";
	import VectorSource from "ol/source/Vector.js";
	import { GeoJSON } from "ol/format.js";
	import VectorLayer from "ol/layer/Vector.js";
	import { toasts } from "svelte-toasts";
	import { WilayahSungaiApi } from "./wilayahsungai.ts";
	import { Fill, Stroke, Style } from "ol/style.js";
	import { ws_features } from "../../../store/features.js";

	const { getMap } = getContext(mapKey);
	const map = getMap();

	let feature = {
		type: "FeatureCollection",
		features: []
	};

	const VSourceWS = new VectorSource({
		features: new GeoJSON().readFeatures(feature)
	});
	const VLayerWS = new VectorLayer({
		source: VSourceWS
	});

	const _api = new WilayahSungaiApi();

	onMount(async () => {

		let result = await _api.getArea();
		feature = { ...result };

		ws_features.set(result);
		toasts.info("Package build complete.");
	});

	let styleArea = (feature) => {

		let id = feature.get("id");
		let color = feature.get("color");

		if ($filter_asset.wsId) {
			if ($filter_asset.wsId === id) {
				return new Style({
					stroke: new Stroke({
						color: "#502909",
						width: 1
					}),
					fill: new Fill({
						color: "rgba(245,112,9,0.7)"
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
			map.removeLayer(VLayerWS);
		}

		VSourceWS.clear();
		VSourceWS.addFeatures(new GeoJSON().readFeatures(feature, {
			dataProjection: "EPSG:4326",
			featureProjection: "EPSG:4326"
		}));
		VLayerWS.setZIndex(2);
		VLayerWS.setStyle(styleArea);
		VLayerWS.setVisible($ws_visible);
		if (map) {
			map.addLayer(VLayerWS);
		}
	};
	$: reloadMap(feature, $ws_visible, $filter_asset.wsId);

	let filterWS = () => {

		let paramsKw = $paramsKewenangan ? $paramsKewenangan.toUpperCase() : undefined;

		$wsFilter = []; // Clear filter
		feature.features = $ws_features.features.filter(val => {
			let prop = val.properties;

			if ($paramsKewenangan) {
				return prop.kewenangan === paramsKw;
			} else {
				return true;
			}
		});

		// Append list WS to select field;
		$wsFilter = feature.features.map(item => {
			return { id: item.properties.id, name: item.properties.name };
		});

		reloadMap();
	};
	$: filterWS($paramsKewenangan);

</script>