<script context="module" lang="ts">
  export const prerender = true;
</script>

<script>
    // import Counter from '$lib/Counter.svelte';
    import Map from "$lib/Map.svelte";
    import FilterLayer from "../lib/control/FilterLayer.svelte";
    import { panel } from "../lib/control/NavigationStore.js";
    import Sidebar from "../lib/sidebar/Sidebar.svelte";


    let isOpen = "layer";

    function handleAction(event) {
        isOpen = event.detail.text;
        $panel.left = event.detail.text;
    }

</script>

<svelte:head>
  <title>Map</title>
  <meta name="description" content="Web GIS SDA" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
</svelte:head>


<Map>
  <FilterLayer isOpen={isOpen} />
  <Sidebar on:action={handleAction} />
</Map>



