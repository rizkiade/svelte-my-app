<script context="module" lang="ts">
	export const prerender = true;
</script>

<script>
	import "bootstrap/dist/css/bootstrap.min.css";
	import Map from "$lib/Map.svelte";
	import FilterLayer from "../lib/control/FilterLayer.svelte";
	import { panel } from "../lib/control/NavigationStore.js";
	import Sidebar from "../lib/sidebar/Sidebar.svelte";
	import PengelolaFeatures from "../lib/features/pengelola/PengelolaFeatures.svelte";
	import WilayahSungaiFeatures from "../lib/features/wilayahsungai/WilayahSungaiFeatures.svelte";
	import SearchPanel from "../lib/control/SearchPanel.svelte";
	import InfrastructurePanel from "../lib/control/InfrastructurePanel.svelte";

	let isOpen = undefined;

	function handleAction(event) {
		isOpen = event.detail.text;
		$panel.left = event.detail.text;
	}

</script>

<svelte:head>
  <title>Map</title>
  <meta name="description" content="Web GIS SDA" />
  <script src="https://kit.fontawesome.com/f21c89a90b.js" crossorigin="anonymous"></script>
</svelte:head>

<Map>


  <PengelolaFeatures />
  <WilayahSungaiFeatures />

  <FilterLayer isOpen={isOpen} />
  <Sidebar on:action={handleAction}>
    {#if $panel.right === 'search'}
      <SearchPanel />
    {/if}

    {#if $panel.right === 'infrastructure'}
      <InfrastructurePanel />
    {/if}
  </Sidebar>
</Map>



