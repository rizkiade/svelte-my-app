<script>

	import VectorSource from "ol/source/Vector.js";
	import { GeoJSON } from "ol/format.js";
	import VectorLayer from "ol/layer/Vector.js";
	import { wsp_features } from "../../../store/features.js";
	import { getContext } from "svelte";
	import { filter_asset, mapKey, paramsKewenangan, wsFilter, wsp_visible } from "../../../store/map.js";
	import { Fill, Stroke, Style } from "ol/style.js";

	const VSourceWSP = new VectorSource({
		features: new GeoJSON().readFeatures($wsp_features)
	});
	const VLayerWSP = new VectorLayer({
		source: VSourceWSP
	});

	const mapContext = getContext(mapKey);
	const map = mapContext.getMap();


	let styleWSP = (feature) => {
		let bws_permen = feature.get("bws_permen");
		let bws_kerja = feature.get("bws_kerja");
		let color = feature.get("color");
		let kw = feature.get("kewenangan");

		/*set jika bws_kerja & bws_permen sama*/
		if (bws_permen === bws_kerja) {
			color = "rgba(248,215,7,0.7)";
		}

		// Kondisi jika kewenangan terpilih
		if ($paramsKewenangan) {
			if ($paramsKewenangan.toUpperCase() === kw)
				return new Style({
					stroke: new Stroke({
						color: "#502909",
						width: 1
					}),
					fill: new Fill({
						color: color
					})
				});

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
			map.removeLayer(VLayerWSP);
		}

		VSourceWSP.clear();
		VSourceWSP.addFeatures(new GeoJSON().readFeatures($wsp_features, {
			dataProjection: "EPSG:4326",
			featureProjection: "EPSG:4326"
		}));
		VLayerWSP.setZIndex(1);
		VLayerWSP.setStyle(styleWSP);
		VLayerWSP.setVisible($wsp_visible);
		if (map) {
			map.addLayer(VLayerWSP);
		}
	};
	$: reloadMap($wsp_features, $wsp_visible, $filter_asset.pengelolaId, $paramsKewenangan);


</script>