<script lang="ts">
	import { FormGroup, Input, Row } from "sveltestrap";
	import Select from "svelte-select";
	import SelectLoading from "$lib/component/loader/SelectLoading.svelte";

	import { filter_asset, ws, ws_visible, ordo_visible, wsFilter, das_visible, provinceByWs, onDasReq } from "../../../store/map.js";
	import { featureExist } from "../../../store/features.js";

	import { WilayahSungaiApi } from "./wilayahsungai.d.ts";
	import { DaerahAliranSungaiApi } from "../daerahaliransungai/daerahaliransungai.d.ts";
	import { onMount } from "svelte";

	// const itemId = "id";
	// const label = "name";

	const _api_ws = new WilayahSungaiApi();
	const _api_das = new DaerahAliranSungaiApi();

	let onReq = false;
	onMount(() => {
		if ($ws.length === 0) {
			onReq = true;
			_api_ws.getList().then(result => {
				// console.log(result);
				$ws = result.map(({ id, name, province }) => ({ value: id, label: name, province: province }));
				onReq = false;
			});
		}
	});

	let justValue;
	let wsSelect = (e) => {
		let current_wsId = e.detail.value;
		$filter_asset.wsId = justValue;
		$filter_asset.wsLabel = e.detail.label;
		$filter_asset.dasId = undefined;

		// set sungai checked variable
		$ordo_visible[1] = $featureExist[$filter_asset.wsId] ? ($featureExist[$filter_asset.wsId][23] ? ($featureExist[$filter_asset.wsId][23]["ordo_1"] ? $featureExist[$filter_asset.wsId][23]["ordo_1"].checked : false) : false) : false;
		$ordo_visible[2] = $featureExist[$filter_asset.wsId] ? ($featureExist[$filter_asset.wsId][23] ? ($featureExist[$filter_asset.wsId][23]["ordo_2"] ? $featureExist[$filter_asset.wsId][23]["ordo_2"].checked : false) : false) : false;
		$ordo_visible[3] = $featureExist[$filter_asset.wsId] ? ($featureExist[$filter_asset.wsId][23] ? ($featureExist[$filter_asset.wsId][23]["ordo_3"] ? $featureExist[$filter_asset.wsId][23]["ordo_3"].checked : false) : false) : false;
		$ordo_visible[4] = $featureExist[$filter_asset.wsId] ? ($featureExist[$filter_asset.wsId][23] ? ($featureExist[$filter_asset.wsId][23]["ordo_4"] ? $featureExist[$filter_asset.wsId][23]["ordo_4"].checked : false) : false) : false;

		// set DAS
		// eslint-disable-next-line no-prototype-builtins
		if (!$featureExist[$filter_asset.wsId].hasOwnProperty(24)) {
			$onDasReq = true;
			_api_das.getArea(current_wsId).then(response => {
				$featureExist[current_wsId][24] = { ...response };
				$onDasReq = false;
			});
		}

		if (e.detail.province !== null) {
			$provinceByWs = JSON.parse(e.detail.province).map(val => val);
		}


	};

	let toggleWilayahSungai = () => {
		$ws_visible = !$ws_visible;
	};

	let fieldClear = () => {
		justValue = null;
		$filter_asset.wsId = undefined;
		$filter_asset.wsLabel = undefined;
		$filter_asset.dasId = undefined;
		$filter_asset.dasLabel = undefined;
		$das_visible = false;

		if (!$filter_asset.pengelolaId) {
			$provinceByWs = [];
		} else {
			$provinceByWs = [];
			$wsFilter.map(val => {
				JSON.parse(val.province).map(provinces => {
					if (!$provinceByWs.find(p => p.id === provinces.id)) {
						$provinceByWs.push(provinces);
					}
				});
			});
		}
	};

</script>

<Row>

  {#if onReq}
    <SelectLoading />
  {:else }
    <Select placeholder="Select Wilayah Sungai" } items="{$wsFilter.length !== 0 ? $wsFilter : $ws}"
            on:select={wsSelect}
            on:clear={fieldClear}
            bind:justValue
            value="{$filter_asset.wsLabel}">
      <div slot="clear-icon">❌</div>
    </Select>
  {/if}

  <!--{#if ($ws.length !== 0)}-->
  <!--  <Select placeholder="Select Wilayah Sungai" } items="{$wsFilter.length !== 0 ? $wsFilter : $ws }" {itemId} {label} on:select={wsSelect} on:clear={fieldClear} clearable="true">-->
  <!--    <div slot="clear-icon">❌</div>-->
  <!--  </Select>-->
  <!--{:else}-->
  <!--  {#await _api_ws.getList()}-->
  <!--    <SelectLoading />-->
  <!--  {:then wsItems}-->
  <!--    <Select placeholder="Select Wilayah Sungai" } items="{$wsFilter.length !== 0 ? $wsFilter : $ws }" {itemId} {label} on:select={wsSelect} on:clear={fieldClear} clearable="true">-->
  <!--      <div slot="clear-icon">❌</div>-->
  <!--    </Select>-->
  <!--  {/await}-->
  <!--{/if}-->

  <FormGroup>
    <Input id="wilayah_sungai" type="switch" label="Show Area" on:change={toggleWilayahSungai} checked={$ws_visible} />
  </FormGroup>
</Row>