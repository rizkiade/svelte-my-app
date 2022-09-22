<script>
	import { Button, FormGroup, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "sveltestrap";
	import { slide } from "svelte/transition";
	import { infrastructure, infrastructure_sub } from "../../control/NavigationStore.js";
	import InfrastructureButton from "./InfrastructureButton.svelte";
	import PosDugaAir from "./filters/pda/PosDugaAir.svelte";
	import BoxContent from "./filters/BoxContent.svelte";
	import PosCurahHujan from "./filters/pch/PosCurahHujan.svelte";
	import PosKlimatologi from "./filters/pklim/PosKlimatologi.svelte";
	import Bendungan from "./filters/bendungan/Bendungan.svelte";
	import { refIdOnly } from "../../../store/map.js";

	let open = false;
	let filterLayerId = undefined;
	let filterLayerLabel = undefined;

	const toggleFilter = (event) => {
		let layerId = event.detail.layerId;
		open = event.detail.value;
		filterLayerId = layerId;
		filterLayerLabel = event.detail.layerLabel;
	};

	let show_integration = () => {
		$refIdOnly = !$refIdOnly;
	};
</script>

<div transition:slide>
  <div class="card" style="background-color: rgba(104,129,169,0.35)">
    <div class="card-header text-center bg-card-title text-light">List Infrastructure</div>
  </div>

  <FormGroup class="mt-2">
    <Input type="switch" label="Show Integration" on:change={show_integration} checked={$refIdOnly} />
  </FormGroup>

  <div class="d-flex flex-column bd-highlight">
    {#each $infrastructure as { id, name, checked }}
      <InfrastructureButton {id} {name} bind:checked={checked} on:open={toggleFilter} />
    {/each}
  </div>

  <div class="card mt-4" style="background-color: rgba(104,129,169,0.35)">
    <div class="card-header text-center bg-card-title text-light">List Infrastructure Sub</div>
  </div>
  {#each $infrastructure_sub as { id, name, checked }}
    <InfrastructureButton {id} {name} bind:checked={checked} on:open={toggleFilter} />
  {/each}

</div>

<Modal isOpen={open} size="sm">
  <ModalHeader>Params
    <em>{filterLayerLabel}</em>
  </ModalHeader>
  <ModalBody>

    {#if filterLayerId === 3}
      <BoxContent>
        <Bendungan />
      </BoxContent>
    {/if}

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