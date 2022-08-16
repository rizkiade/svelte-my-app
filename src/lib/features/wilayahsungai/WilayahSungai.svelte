<script lang="ts">
	import { getContext } from "svelte";
	import { FormGroup, Input, Row } from "sveltestrap";
	import Select from "svelte-select";
	import { toasts } from "svelte-toasts";
	import { WilayahSungaiApi } from "./wilayahsungai.ts";
	import SelectLoading from "$lib/component/loader/SelectLoading.svelte";

	import { mapKey } from "../../../store/map.js";

	const itemId = "id";
	const label = "name";

	const mapContext = getContext(mapKey);
	const map = mapContext;

	const _api = new WilayahSungaiApi();

	let toggleWilayahSungai = (e) => {
		toasts.error("Pilih Wilayah Sungai terlebih dahulu.");
		console.log(map.getMap().updateSize());
	};

</script>

<Row>
  {#await _api.getAll()}
    <SelectLoading />
  {:then wsItems}
    <Select placeholder="Pilih Wilayah Sungai" } items="{wsItems}" {itemId} {label}>
      <div slot="clear-icon">❌</div>
    </Select>
  {/await}
  <FormGroup>
    <Input id="wilayah_sungai" type="switch" label="Show Area" on:change={toggleWilayahSungai} />
  </FormGroup>
</Row>