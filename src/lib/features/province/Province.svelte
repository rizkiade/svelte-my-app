<script>
	import Select from "svelte-select";
	import { FormGroup, Input, Row } from "sveltestrap";
	import { prov_visible, filter_asset, paramsAdm, province, provinceByWs, kabupaten, kabupatenByProv } from "../../../store/map";
	import { ProvinceApi } from "./province.d.ts";
	import SelectLoading from "../../component/loader/SelectLoading.svelte";
	import { toasts } from "svelte-toasts";
	import { featureExistAdm } from "../../../store/features.js";
	import { onMount } from "svelte";

	let _api_province = new ProvinceApi();

	let onProvReq = false;
	onMount(() => {
		if ($province.length === 0) {
			onProvReq = true;
			_api_province.getList().then(result => {
				$province = result.map(({ id, name, province }) => ({ value: id, label: name, province: province }));
				onProvReq = false;
			});
		}
	});

	let justValue;
	let provSelect = (e) => {
		if (e.detail.label !== $filter_asset.provinsi) {
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

			$kabupatenByProv = $kabupaten.filter(kab => kab.prov_id === justValue);
			showAreaProv();
		}

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

	let showAreaProv = () => {
		console.log(justValue);
		if ($prov_visible && $paramsAdm.provId) {

			// eslint-disable-next-line no-prototype-builtins
			if (!$featureExistAdm.hasOwnProperty($paramsAdm.provId)) {

				// Create new object ON feature Administratif.
				$featureExistAdm[$paramsAdm.provId] = {
					feature: undefined,
					kabupaten: []
				};

				onProvReq = true;
				// Request new Feature
				_api_province.getArea($paramsAdm.provId).then(result => {
					$featureExistAdm[$paramsAdm.provId].feature = { ...result };
					toasts.success(`${result.features.length} feature has been added.`);
					onProvReq = false;
				});
			}
		}
	};

	let fieldClear = () => {
		justValue = null;
		$filter_asset.provinsi = undefined;
		$filter_asset.kabupaten = undefined;
		$filter_asset.kecamatan = undefined;
		$filter_asset.kelurahan = undefined;

		$kabupatenByProv = [];
	};

</script>

<Row>

  {#if onProvReq}
    <SelectLoading />
  {:else }
    <Select placeholder="Select Provinsi" items="{$provinceByWs.length !== 0 ? $provinceByWs : $province}"
            on:select={provSelect}
            on:clear={fieldClear}
            bind:justValue
            value="{$filter_asset.provinsi}"
            clearable="true">
      <div slot="clear-icon">❌</div>
    </Select>
  {/if}
  <FormGroup>
    <Input id="province" type="switch" label="Show Area" on:change={toggleProvince} checked={$prov_visible} />
  </FormGroup>
</Row>