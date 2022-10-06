<script>
	import { getContext } from "svelte";
	import { geo_features, mapKey } from "../../../store/map.js";
	import { Feature } from "ol";
	import VectorSource from "ol/source/Vector.js";
	import VectorLayer from "ol/layer/Vector.js";
	import { Point } from "ol/geom.js";
	import { Icon, Style } from "ol/style.js";

	const { getMap } = getContext(mapKey);
	const map = getMap();

	const iconFeature = new Feature();

	const VSourceGeo = new VectorSource({
		features: [iconFeature]
	});
	const VLayerGeo = new VectorLayer({
		source: VSourceGeo,
		zIndex: 10,
		style: new Style({
			image: new Icon({
				anchor: [0.5, 46],
				anchorXUnits: "fraction",
				anchorYUnits: "pixels",
				scale: [0.20, 0.20],
				src: `/marker/map-marker-green-128.png`
			})
		})
	});

	let reloadMap = () => {

		if (map) {
			map.removeLayer(VLayerGeo);
		}

		let coordinate = [undefined, undefined];
		if ($geo_features.coordinate) {
			coordinate = $geo_features.coordinate.split(",");

			iconFeature.setProperties({
				name: "Geo Location in Here"
			});
		}
		iconFeature.setGeometry(new Point([coordinate[0], coordinate[1]]));

		if (map) {
			map.addLayer(VLayerGeo);
		}
	};

	geo_features.subscribe(() => reloadMap());
</script>