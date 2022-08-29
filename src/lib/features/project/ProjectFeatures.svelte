<script>

	import { Feature } from "ol";
	import VectorSource from "ol/source/Vector.js";
	import VectorLayer from "ol/layer/Vector.js";
	import { Icon, Style } from "ol/style.js";
	import { getContext } from "svelte";
	import { mapKey } from "../../../store/map.js";
	import { projectLayerSource } from "../../../store/features.js";
	import { Point } from "ol/geom.js";


	let styleIcon = (feature) => {
		// let typeId = feature.get("type_id");
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

	let features = [];
	const VSourceSearch = new VectorSource();
	const VLayerSearch = new VectorLayer({
		source: VSourceSearch,
		zIndex: 10,
		style: styleIcon
	});

	const { getMap } = getContext(mapKey);
	const map = getMap();


	let reloadMap = () => {

		if (map) {
			map.removeLayer(VLayerSearch);
			features = [];
		}

		$projectLayerSource.map(i => {
			let coordinate = i.coordinate.replaceAll(" ", "").split(",");
			if (coordinate[0].length !== 0 && coordinate[1].length !== 0) {

				const feature = new Feature({
					geometry: new Point([coordinate[0], coordinate[1]]),
					name: i.name
				});

				features.push(feature);
			}
		});

		VLayerSearch.setSource(new VectorSource({
			features: features
		}));

		if (map) {
			map.addLayer(VLayerSearch);
		}

	};

	$:reloadMap($projectLayerSource);
</script>