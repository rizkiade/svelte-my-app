<script>
	import { mapKey, ws_visible, paramsKewenangan, wsFilter, filter_asset, pengelola, wsp_visible } from "../../../store/map.js";
	import { getContext, onMount, onDestroy } from "svelte";
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

		if ($ws_features.features.length === 0) {
			let result = await _api.getArea();
			feature = { ...result };
			ws_features.set(result);
		} else {
			// copy from existing source
			feature.features = [...$ws_features.features];
		}

		toasts.info("Package build complete.");
	});

	onDestroy(() => {
		// Clear params data store
		filter_asset.set({
			pengelolaId: undefined,
			wsId: undefined,
			dasId: undefined,
			provinsi: undefined,
			kabupaten: undefined,
			kecamatan: undefined,
			kelurahan: undefined
		});
		ws_visible.set(false);
		wsp_visible.set(false);
		paramsKewenangan.set(undefined);
	});

	let styleArea = (feature) => {

		let id = feature.get("id");
		let color = feature.get("color");
		let kw = feature.get("kewenangan");

		if ($filter_asset.wsId) {
			if ($filter_asset.wsId === id) {

				// jika kewenangan terpilih dan tidak sesuai kewenangan area maka setStyle menjadi FALSE;
				if ($paramsKewenangan && $paramsKewenangan.toUpperCase() !== kw) {
					return false;
				}

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
		if ($filter_asset.pengelolaId) {

			let obj_value = $pengelola.find(o => o.id === $filter_asset.pengelolaId.toString());
			$wsFilter = JSON.parse(obj_value.ws_area).filter(item => {
				if ($paramsKewenangan) {
					if (item.kewenangan === paramsKw) {
						return { id: item.id, name: item.name };
					}
				} else {
					return { id: item.id, name: item.name };
				}
			});

		} else {

			let temp = [];
			feature.features = $ws_features.features.filter(val => {
				let prop = val.properties;
				if ($paramsKewenangan) {
					if (prop.kewenangan === paramsKw) {
						temp.push({ id: prop.id, name: prop.name });
						return true;
					}
				}
				return true;
			});
			$wsFilter = [...temp];
		}

		reloadMap();
	};
	$: filterWS($paramsKewenangan, $filter_asset.pengelolaId);

</script>