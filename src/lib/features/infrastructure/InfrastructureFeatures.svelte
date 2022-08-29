<script>

	import VectorSource from "ol/source/Vector.js";
	import { GeoJSON } from "ol/format.js";
	import VectorLayer from "ol/layer/Vector.js";
	// import { styleIcon } from "../../helper/style.js";
	import { assets_features, mapKey } from "../../../store/map.js";
	import { getContext } from "svelte";
	import { Icon, Style } from "ol/style.js";
	import { panel } from "../../control/NavigationStore.js";

	let styleIcons = (feature) => {
		// let typeId = feature.get("type_id");
		console.log("aaa");

		let image = "map-marker-red-128.png";
		let type = feature.getGeometry().getType();

		if (type === "Point") {
			return new Style({
				image: new Icon({
					anchor: [0.5, 46],
					anchorXUnits: "fraction",
					anchorYUnits: "pixels",
					scale: [0.20, 0.20],
					src: `/marker/${image}`
				})
			});
		}
	};


	const VSourceAsset = new VectorSource({
		features: new GeoJSON().readFeatures($assets_features)
	});

	const VLayerAsset = new VectorLayer({
		source: VSourceAsset,
		style: styleIcons,
		zIndex: 10
	});

	const { getMap } = getContext(mapKey);
	const map = getMap();

	let reloadMap = () => {

		// console.log($assets_features);

		if (map) {
			map.removeLayer(VLayerAsset);
		}

		// VSourceAsset.clear();

		// VLayerAsset.setVisible(true);
		// VSourceAsset.addFeatures(new GeoJSON().readFeatures($assets_features));

		if (map) {
			map.addLayer(VLayerAsset);
		}


		// console.log(VLayerAsset);

	};

	$:reloadMap($assets_features, $panel.right);


</script>