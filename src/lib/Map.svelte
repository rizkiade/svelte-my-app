<script lang="ts">
	import { browser } from "$app/env";

	import { Map, View } from "ol";
	import { onMount, setContext } from "svelte";
	import { Tile } from "ol/layer.js";
	import { OSM } from "ol/source.js";
	import { ScaleLine } from "ol/control.js";
	import Overlay from "ol/Overlay.js";


	import "ol/ol.css";
	import { mapKey, preloader, selected_asset } from "../store/map.js";
	import Preloader from "./component/loader/Preloader.svelte";
	import Popup from "./component/Popup.svelte";

	setContext(mapKey, {
		getMap: () => map
	});

	let target: HTMLDivElement;
	let map: Map;

	const mapLng = 118.0148634;
	const mapLat = -2.548926;

	const attributions =
		"<a href=\"https://openlayers.org/\" target=\"_blank\">&copy; OpenLayers</a> " +
		"<a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\">&copy; OpenStreetMap contributors</a>";

	onMount(() => {
		if (browser) {

			props.display = "inline-block";
			const container = document.getElementById("card-popup");
			const overlay = new Overlay({
				element: container,
				autoPan: {
					animation: {
						duration: 250
					}
				}
			});
			// overlay.setPosition([111.25585774134638, -7.715808856799736]);

			const view = new View({ projection: "EPSG:4326", center: [mapLng, mapLat], zoom: 5.35 });
			const layers = [new Tile({ source: new OSM({ attributions: attributions }) })];

			map = new Map({ target, view, layers });
			map.addControl(new ScaleLine({ units: "us" }));
			map.addOverlay(overlay);

			map.on("pointermove", function(e) {
				let feature = map.forEachFeatureAtPixel(e.pixel, function(feature) {
					return feature;
				});

				if (feature) {
					props.type = feature.get("type_name") ?? "";
					props.name = feature.get("name");
					props.kewenangan = feature.get("kewenangan") ?? "";
					props.status_lintas = feature.get("status_lintas") ?? "";
					props.kode_ws = feature.get("kode_ws") ?? "";
					props.kode_das = feature.get("kode_das") ?? "";
					props.luas = feature.get("luas") ?? "";
					props.status = feature.get("status");
					overlay.setPosition(e.coordinate);
				} else {
					overlay.setPosition(undefined);
				}
			});

			map.on("click", function(e) {

				let feature = map.forEachFeatureAtPixel(e.pixel, function(feature) {
					return feature;
				});

				if (feature && feature.get("type_name")) {

					let _id = feature.get("id");
					if ($selected_asset.id !== _id) {

						selected_asset.set({
							id: _id,
							name: feature.get("name"),
							type: feature.get("type_name"),
							pengelola: feature.get("pengelola_name"),
							coordinate: feature.getGeometry().getCoordinates(),
							ws: feature.get("ws_name"),
							das: feature.get("das_name"),
							provinsi: feature.get("provinsi"),
							kabupaten: feature.get("kabupaten"),
							kecamatan: feature.get("kecamatan"),
							desa: feature.get("kelurahan"),
							infrastructure_id: feature.get("type_id")
						});
					}
				}
			});

		}

		let el = document.querySelector(".ol-zoom");
		el["style"].top = "5em";

		setTimeout(function() {
			// Update container size if change container not full width
			map.updateSize();
		}, 1000);
	});

	const props = {
		display: "none",
		name: undefined,
		type: undefined,
		kewenangan: undefined,
		status_lintas: undefined,
		kode_ws: undefined,
		kode_das: undefined,
		luas: undefined,
		status: undefined
	};

</script>

<style>
    :global(html, body, #svelte),
    div {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>

<div class="ol-container" bind:this={target}>
  {#if map}
    <slot />
  {/if}
  <Popup {...props} />
</div>

{#if $preloader}
  <Preloader />
{/if}



