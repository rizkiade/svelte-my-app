<script>
	import Select from "svelte-select";
	import { filter_asset, kabupaten, kabupatenByProv, paramsAdm, province } from "../../../store/map.js";
	import { Row } from "sveltestrap";
	import { CityApi } from "./city.d.ts";
	import SelectLoading from "../../component/loader/SelectLoading.svelte";
	import { onMount } from "svelte";

	let _api_city = new CityApi();

	let onCityReq = false;
	onMount(() => {
		if ($province.length === 0) {
			onCityReq = true;
			_api_city.getList().then(result => {
				$kabupaten = result.map(({ id, name, province_id }) => ({ value: id, label: name, prov_id: province_id }));
				onCityReq = false;
			});
		}
	});

	let justValue;
	let citySelect = (e) => {

		$filter_asset.kabupaten = e.detail.label;
		$filter_asset.kecamatan = undefined;
		$filter_asset.kelurahan = undefined;

		$paramsAdm.kecId = undefined;
		$paramsAdm.desaId = undefined;


	};

	let fieldClear = () => {
		justValue = null;
		$filter_asset.kabupaten = undefined;
		$filter_asset.kecamatan = undefined;
		$filter_asset.kelurahan = undefined;
	};


</script>
{#if onCityReq}
  <SelectLoading />
{:else }
  <Row>
    <Select placeholder="Select Kabupaten" items="{$kabupatenByProv}"
            on:select={citySelect}
            on:clear={fieldClear}
            bind:justValue
            value="{$filter_asset.kabupaten}"
            clearable="true">
      <div slot="clear-icon">❌</div>
    </Select>
  </Row>
{/if}

