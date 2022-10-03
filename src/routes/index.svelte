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
	import ProjectFeatures from "../lib/features/project/ProjectFeatures.svelte";
	import InfrastructureFeatures from "../lib/features/infrastructure/InfrastructureFeatures.svelte";
	import SungaiFeatures from "../lib/features/sungai/SungaiFeatures.svelte";
	import DaerahAliranSungaiFeatures from "../lib/features/daerahaliransungai/DaerahAliranSungaiFeatures.svelte";
	import ProvinceFeatures from "../lib/features/province/ProvinceFeatures.svelte";
	import CityFeatures from "../lib/features/city/CityFeatures.svelte";
	import SearchFeatures from "../lib/features/search/SearchFeatures.svelte";

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
  <SungaiFeatures />
  <DaerahAliranSungaiFeatures />
  <ProvinceFeatures />
  <CityFeatures />

  <SearchFeatures />
  <InfrastructureFeatures />
  <ProjectFeatures />

  <FilterLayer isOpen={isOpen} />
  <Sidebar on:action={handleAction} />

</Map>



