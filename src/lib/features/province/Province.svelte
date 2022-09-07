<script>
	import Select from "svelte-select";
	import { FormGroup, Input, Row } from "sveltestrap";
	import { prov_visible, filter_asset, paramsAdm, province, provinceByWs } from "../../../store/map";
	import { ProvinceApi } from "./province.d.ts";
	import SelectLoading from "../../component/loader/SelectLoading.svelte";
	import { toasts } from "svelte-toasts";
	import { featureExistAdm, prov_features } from "../../../store/features.js";

	let _api_province = new ProvinceApi();

	let justValue;
	let provSelect = (e) => {

		$filter_asset.provinsi = e.detail.label;
		$filter_asset.kabupaten = undefined;
		$filter_asset.kecamatan = undefined;
		$filter_asset.kelurahan = undefined;

		paramsAdm.set({
			provId: justValue,
			kabId: undefined,
			kecId: undefined,
			desaId: undefined
		});

		// Create new object ON feature Administratif.
		// eslint-disable-next-line no-prototype-builtins
		if (!$featureExistAdm.hasOwnProperty($paramsAdm.provId)) {
			$featureExistAdm[$paramsAdm.provId] = {
				feature: undefined,
				kabupaten: []
			};
		}

		showAreaProv();

	};

	let toggleProvince = (e) => {
		if ($filter_asset.provinsi) {
			$prov_visible = !$prov_visible;
			showAreaProv();
		} else {
			e.target.checked = false;
			$prov_visible = false;
			toasts.error("Pilih Provinsi terlebih dahulu.");
		}
	};

	let showAreaProv = async () => {
		if ($prov_visible && $paramsAdm.provId) {
			if (!$featureExistAdm[$paramsAdm.provId].feature) {
				onProvReq = true;
				// Request new Feature
				let result = await _api_province.getArea($paramsAdm.provId);
				$featureExistAdm[$paramsAdm.provId].feature = { ...result };
				$prov_features = { ...result };
				toasts.success(`${result.features.length} feature has been added.`);
				onProvReq = false;
			} else {
				// existing Feature
				$prov_features = { ...$featureExistAdm[$paramsAdm.provId].feature };
			}
		}
	};

	let fieldClear = () => {
		justValue = null;
		$filter_asset.provinsi = undefined;
		$filter_asset.kabupaten = undefined;
		$filter_asset.kecamatan = undefined;
		$filter_asset.kelurahan = undefined;
	};

	let onProvReq = false;
</script>

<Row>

  {#await _api_province.getList()}
    <SelectLoading />
  {:then result}

    {#if onProvReq}
      <SelectLoading />
    {:else }
      <Select placeholder="Select Province" items="{$provinceByWs.length !== 0 ? $provinceByWs : $province}"
              on:select={provSelect}
              on:clear={fieldClear}
              bind:justValue
              value="{$filter_asset.provinsi}"
              clearable="true">
        <div slot="clear-icon">❌</div>
      </Select>
    {/if}
  {/await}
  <FormGroup>
    <Input id="province" type="switch" label="Show Area" on:change={toggleProvince} checked={$prov_visible} />
  </FormGroup>
</Row>