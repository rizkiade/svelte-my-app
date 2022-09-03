<script>

	import VectorSource from "ol/source/Vector.js";
	import { GeoJSON } from "ol/format.js";
	import VectorLayer from "ol/layer/Vector.js";
	import { styleIcon } from "../../helper/style.js";
	import { assets_features, count_asset, filter_asset, filter_asset_sub, mapKey, paramsKewenangan } from "../../../store/map.js";
	import { getContext } from "svelte";
	import { panel } from "../../control/NavigationStore.js";
	import { filteredAsset } from "../FilterAsset.svelte";

	const VSourceAsset = new VectorSource({
		features: new GeoJSON().readFeatures($assets_features)
	});

	const VLayerAsset = new VectorLayer({
		source: VSourceAsset,
		style: styleIcon,
		zIndex: 10
	});

	const { getMap } = getContext(mapKey);
	const map = getMap();

	let reloadMap = () => {

		if (map) {
			map.removeLayer(VLayerAsset);
		}

		VSourceAsset.clear();
		VSourceAsset.addFeatures(new GeoJSON().readFeatures($assets_features));

		if (map) {
			if ($panel.right === "infrastructure") {
				VLayerAsset.setVisible(true);
			} else {
				VLayerAsset.setVisible(false);
			}
			map.addLayer(VLayerAsset);
		}

	};

	$:reloadMap($assets_features, $panel.right, $paramsKewenangan, $filter_asset, $filter_asset_sub[15].type_pos);

	let countAsset = () => {
		// reset counter
		$count_asset = {};
		VSourceAsset.getFeatures().map(feature => {
			if (filteredAsset(feature)) {
				const id = feature.get("type_id");
				let existID = id in $count_asset;
				if (!existID) {
					$count_asset[id] = 1;
				} else {
					$count_asset[id] = $count_asset[id] + 1;
				}
			}
		});
		// console.log($count_asset);
	};
	$:countAsset($assets_features, $paramsKewenangan, $filter_asset, $filter_asset_sub[15].type_pos);

</script>