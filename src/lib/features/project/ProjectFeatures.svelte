<script>

	import { Feature } from "ol";
	import VectorSource from "ol/source/Vector.js";
	import VectorLayer from "ol/layer/Vector.js";
	import { Icon, Style } from "ol/style.js";
	import { getContext } from "svelte";
	import { countProject, filter_asset, mapKey, paramsKewenangan } from "../../../store/map.js";
	import { projectLayerSource } from "../../../store/features.js";
	import { Point } from "ol/geom.js";
	import { panel } from "../../control/NavigationStore.js";

	let styleIcon = (feature) => {
		// let typeId = feature.get("type_id");
		let image;
		let type = feature.getGeometry().getType();
		let status = feature.get("status");

		switch (status) {
			case "SELESAI":
				image = "map-marker-green-128.png";
				break;
			case "PELAKSANAAN":
				image = "map-marker-blue-128.png";
				break;
			default:
				image = "map-marker-red-128.png";
				break;
		}

		if (type === "Point") {
			return new Style({
				image: new Icon({
					anchor: [0.5, 100],
					anchorXUnits: "fraction",
					anchorYUnits: "pixels",
					scale: [0.20, 0.20],
					src: `/marker/${image}`
					// src: 'https://openlayers.org/en/latest/examples/data/icon.png'
				})
			});
		}
	};

	let features = [];
	const VSourceProject = new VectorSource();
	const VLayerProject = new VectorLayer({
		source: VSourceProject,
		zIndex: 10,
		style: styleIcon
	});

	const { getMap } = getContext(mapKey);
	const map = getMap();


	let reloadMap = () => {

		if (map) {
			map.removeLayer(VLayerProject);
			features = [];
		}

		// reset counter
		countProject.set({
			persiapan: 0,
			pelaksanaan: 0,
			selesai: 0
		});

		$projectLayerSource.map(i => {
			let status = i.status;
			if (status !== null) {
				if (status.toLowerCase() === "persiapan") {
					$countProject.persiapan += 1;
				} else if (status.toLowerCase() === "pelaksanaan") {
					$countProject.pelaksanaan += 1;
				} else if (status.toLowerCase() === "selesai") {
					$countProject.selesai += 1;
				}
			}

			let coordinate = i.coordinate.replaceAll(" ", "").split(",");
			if (coordinate[0].length !== 0 && coordinate[1].length !== 0) {
				const feature = new Feature({
					geometry: new Point([coordinate[0], coordinate[1]]),
					name: i.name,
					id: i.id,
					status: i.status,
					infrastructure_id: i.infrastructure_id,
					type_name: i.type_name
				});

				features.push(feature);
			}
		});

		VLayerProject.setSource(new VectorSource({
			features: features
		}));

		if (map) {

			if ($panel.right === "project") {
				VLayerProject.setVisible(true);
			} else {
				VLayerProject.setVisible(false);
			}
			map.addLayer(VLayerProject);
		}

	};

	$:reloadMap($projectLayerSource, $panel.right, $filter_asset, $paramsKewenangan);
</script>