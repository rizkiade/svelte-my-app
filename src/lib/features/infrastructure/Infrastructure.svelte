<script>
	import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "sveltestrap";
	import { slide } from "svelte/transition";
	import { infrastructure } from "../../control/NavigationStore.js";
	import InfrastructureButton from "./InfrastructureButton.svelte";
	import PosDugaAir from "./filters/pda/PosDugaAir.svelte";
	import BoxContent from "./filters/BoxContent.svelte";
	import PosCurahHujan from "./filters/pch/PosCurahHujan.svelte";
	import PosKlimatologi from "./filters/pklim/PosKlimatologi.svelte";

	let open = false;
	let filterLayerId = undefined;
	let filterLayerLabel = undefined;

	const toggleFilter = (event) => {
		let layerId = event.detail.layerId;
		open = event.detail.value;
		filterLayerId = layerId;
		filterLayerLabel = event.detail.layerLabel;
	};

</script>

<div transition:slide>
  <div class="card" style="background-color: rgba(104,129,169,0.35)">
    <div class="card-header text-center" style="background-color: rgba(87,107,131,0.5)">List Infrastructure</div>
  </div>

  <div class="d-flex flex-column bd-highlight">
    {#each $infrastructure as { id, name, checked }}
      <InfrastructureButton {id} {name} bind:checked={checked} on:open={toggleFilter} />
    {/each}
  </div>
</div>

<Modal isOpen={open} size="sm">
  <ModalHeader>Params
    <em>{filterLayerLabel}</em>
  </ModalHeader>
  <ModalBody>

    {#if filterLayerId === 14}
      <BoxContent>
        <PosCurahHujan />
      </BoxContent>
    {/if}

    {#if filterLayerId === 15}
      <BoxContent>
        <PosDugaAir />
      </BoxContent>
    {/if}

    {#if filterLayerId === 16}
      <BoxContent>
        <PosKlimatologi />
      </BoxContent>
    {/if}


  </ModalBody>
  <ModalFooter>
    <Button color="danger" on:click={toggleFilter}>Close</Button>
  </ModalFooter>
</Modal>