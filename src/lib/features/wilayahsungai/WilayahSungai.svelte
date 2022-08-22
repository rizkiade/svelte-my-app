<script lang="ts">
	import { getContext } from "svelte";
	import { FormGroup, Input, Row } from "sveltestrap";
	import Select from "svelte-select";
	import { toasts } from "svelte-toasts";
	import { WilayahSungaiApi } from "./wilayahsungai.ts";
	import SelectLoading from "$lib/component/loader/SelectLoading.svelte";

	import { mapKey, ws_visible, ws, wsFilter, filter_asset } from "../../../store/map.js";

	const itemId = "id";
	const label = "name";

	// const { getMap } = getContext(mapKey);
	// const map = getMap();

	const _api = new WilayahSungaiApi();

	let wsSelect = async (e) => {
		let wsId = e.detail.id;
		$filter_asset.wsId = wsId;
		$filter_asset.dasId = undefined;

		// console.log(wsId);
		// console.log($ws_visible);
	};

	let toggleWilayahSungai = (e) => {
		$ws_visible = !$ws_visible;
		// toasts.error("Pilih Wilayah Sungai terlebih dahulu.");
		// console.log($filter_asset);
		// console.log(map.getMap().updateSize());
	};

	let fieldClear = () => {
		$filter_asset.wsId = undefined;
		$filter_asset.dasId = undefined;
	};

</script>

<Row>
  {#await _api.getList()}
    <SelectLoading />
  {:then wsItems}
    <Select placeholder="Pilih Wilayah Sungai" } items="{$wsFilter.length !== 0 ? $wsFilter : $ws }" {itemId} {label} on:select={wsSelect} on:clear={fieldClear} clearable="true">
      <div slot="clear-icon">❌</div>
    </Select>
  {/await}
  <FormGroup>
    <Input id="wilayah_sungai" type="switch" label="Show Area" on:change={toggleWilayahSungai} checked={$ws_visible} />
  </FormGroup>
</Row>