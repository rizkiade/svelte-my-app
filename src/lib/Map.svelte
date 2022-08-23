<script lang="ts">
	import { browser } from "$app/env";

	import { Map, View } from "ol";
	import { onMount, setContext } from "svelte";
	import { Tile } from "ol/layer.js";
	import { OSM } from "ol/source.js";

	import "ol/ol.css";
	import { mapKey, preloader } from "../store/map.js";
	import Preloader from "./component/loader/Preloader.svelte";

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

			const view = new View({ projection: "EPSG:4326", center: [mapLng, mapLat], zoom: 5.35 });
			const layers = [new Tile({ source: new OSM({ attributions: attributions }) })];

			map = new Map({ target, view, layers });
		}

		let el = document.querySelector(".ol-zoom");
		el["style"].top = "5em";

		setTimeout(function() {
			// Update container size if change container not full width
			map.updateSize();
		}, 1000);
	});

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
</div>

{#if $preloader}
  <Preloader />
{/if}



