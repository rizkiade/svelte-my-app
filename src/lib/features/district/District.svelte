<script>
	import SelectLoading from "../../component/loader/SelectLoading.svelte";
	import { FormGroup, Input, Row } from "sveltestrap";
	import Select from "svelte-select";
	import { DistrictApi } from "./district.d.ts";
	import { filter_asset, kecamatan_visible, kecamatanByKab, paramsAdm } from "../../../store/map.js";

	const _api_district = new DistrictApi();

	let onDistrictReq = false;


	let justValue;
	let districtSelect = (e) => {

		$filter_asset.kecamatan = e.detail.label;
		$filter_asset.kelurahan = undefined;

		$paramsAdm.desaId = undefined;

	};

	let toggleDistrict = (e) => {
		console.log("aa");
	};

	let fieldClear = () => {
		justValue = null;
		$filter_asset.kecamatan = undefined;
		$filter_asset.kelurahan = undefined;
	};

</script>

<Row>
  {#if onDistrictReq}
    <SelectLoading />
  {:else }
    <Select placeholder="Select Kecamatan" items="{$filter_asset.kabupaten ? $kecamatanByKab : []}"
            on:select={districtSelect}
            on:clear={fieldClear}
            bind:justValue
            value="{$filter_asset.kecamatan}"
            clearable="true">
      <div slot="clear-icon">❌</div>
    </Select>
  {/if}
  <FormGroup>
    <Input id="district" type="switch" label="Show Area" on:change={toggleDistrict} checked={$kecamatan_visible} />
  </FormGroup>
</Row>
