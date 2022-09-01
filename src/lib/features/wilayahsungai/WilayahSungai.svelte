<script lang="ts">
	import { FormGroup, Input, Row } from "sveltestrap";
	import Select from "svelte-select";
	import { WilayahSungaiApi } from "./wilayahsungai.d.ts";
	import SelectLoading from "$lib/component/loader/SelectLoading.svelte";

	import { filter_asset, ws, ws_visible, ordo_visible, wsFilter } from "../../../store/map.js";
	import { featureExist } from "../../../store/features.js";

	const itemId = "id";
	const label = "name";

	const _api = new WilayahSungaiApi();

	let wsSelect = async (e) => {
		$filter_asset.wsId = e.detail.id;
		$filter_asset.dasId = undefined;

		$ordo_visible[1] = $featureExist[$filter_asset.wsId] ? ($featureExist[$filter_asset.wsId][23] ? ($featureExist[$filter_asset.wsId][23]["ordo_1"] ? $featureExist[$filter_asset.wsId][23]["ordo_1"].checked : false) : false) : false;
		$ordo_visible[2] = $featureExist[$filter_asset.wsId] ? ($featureExist[$filter_asset.wsId][23] ? ($featureExist[$filter_asset.wsId][23]["ordo_2"] ? $featureExist[$filter_asset.wsId][23]["ordo_2"].checked : false) : false) : false;
		$ordo_visible[3] = $featureExist[$filter_asset.wsId] ? ($featureExist[$filter_asset.wsId][23] ? ($featureExist[$filter_asset.wsId][23]["ordo_3"] ? $featureExist[$filter_asset.wsId][23]["ordo_3"].checked : false) : false) : false;
		$ordo_visible[4] = $featureExist[$filter_asset.wsId] ? ($featureExist[$filter_asset.wsId][23] ? ($featureExist[$filter_asset.wsId][23]["ordo_4"] ? $featureExist[$filter_asset.wsId][23]["ordo_4"].checked : false) : false) : false;

	};

	let toggleWilayahSungai = () => {
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
  {#if ($ws.length !== 0)}
    <Select placeholder="Pilih Wilayah Sungai" } items="{$wsFilter.length !== 0 ? $wsFilter : $ws }" {itemId} {label} on:select={wsSelect} on:clear={fieldClear} clearable="true">
      <div slot="clear-icon">❌</div>
    </Select>
  {:else}
    {#await _api.getList()}
      <SelectLoading />
    {:then wsItems}
      <Select placeholder="Pilih Wilayah Sungai" } items="{$wsFilter.length !== 0 ? $wsFilter : $ws }" {itemId} {label} on:select={wsSelect} on:clear={fieldClear} clearable="true">
        <div slot="clear-icon">❌</div>
      </Select>
    {/await}
  {/if}

  <FormGroup>
    <Input id="wilayah_sungai" type="switch" label="Show Area" on:change={toggleWilayahSungai} checked={$ws_visible} />
  </FormGroup>
</Row>