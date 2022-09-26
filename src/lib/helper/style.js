import { Fill, Icon, Stroke, Style } from "ol/style.js";

import { filteredAsset } from "../features/FilterAsset.svelte";

const iconList = {
	2: "_danau.png",
	3: "_bendungan.png",
	4: "_bendung.png",
	5: "_embung.png",
	6: "_air_tanah.png",
	7: "_air_baku.png",
	8: "_sabo.png",
	// 9: '_posko_banjir.png',
	// 10: '10_di.png',
	12: "_pengaman_pantai.png",
	13: "_posko_banjir.png",
	14: "_pos_curah_hujan.png",
	15: "_pos_duga_air.png",
	17: "map-marker-red.png",
	16: "_pos_klimatologi.png",
	25: "_air_baku.png",
	26: "_sumur.png"
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
let styleIcon = (feature) => {

	let typeId = feature.get("type_id");
	let image = iconList[typeId] ?? "map-marker-red-128.png";
	let type = feature.getGeometry().getType();

	if (filteredAsset(feature)) {

		if (type === "Point") {
			return new Style({
				image: new Icon({
					// anchor: [0.5, 200],
					anchor: [0.5, 46],
					anchorXUnits: "fraction",
					anchorYUnits: "pixels",
					scale: [0.20, 0.20],
					src: `/marker/${image}`
				})
			});
		}

	}
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
let styleArea = (feature) => {
	let color = feature.get("color");

	return new Style({
		stroke: new Stroke({
			color: "#502909",
			width: 1
		}),
		fill: new Fill({
			color: color
		})
	});

};

export { styleIcon, styleArea, iconList };
