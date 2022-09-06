<script>
	import Select from "svelte-select";
	import { FormGroup, Input, Row } from "sveltestrap";
	import { filter_asset, province, provinceByWs } from "../../../store/map.js";
	import { prov_visible } from "../../../store/map";
	import { ProvinceApi } from "./province.d.ts";
	import SelectLoading from "../../component/loader/SelectLoading.svelte";

	const itemId = "id";
	const label = "name";

	let _api_province = new ProvinceApi();

  let provId = undefined;
	let provSelect = (e) => {
	  provId = e.detail.id;

	  $filter_asset.provinsi = e.detail.name;
	  $filter_asset.kabupaten = undefined;
	  $filter_asset.kecamatan = undefined;
	  $filter_asset.kelurahan = undefined;

	};

	let toggleProvince = () => {
		$prov_visible = !$prov_visible;
		// toasts.error("Pilih Wilayah Sungai terlebih dahulu.");
		// console.log($filter_asset);
		// console.log(map.getMap().updateSize());
	};

	let fieldClear = () => {
	  provId = undefined;
	  $filter_asset.provinsi = undefined;
	  $filter_asset.kabupaten = undefined;
	  $filter_asset.kecamatan = undefined;
	  $filter_asset.kelurahan = undefined;
	};
</script>

<Row>

  {#await _api_province.getList()}
    <SelectLoading />
  {:then result}
    <Select placeholder="Select Province" items="{$provinceByWs.length !== 0 ? $provinceByWs : $province}" {itemId} {label}
            on:select={provSelect}
            on:clear={fieldClear}
            clearable="true">
      <div slot="clear-icon">❌</div>
    </Select>
  {/await}
  <FormGroup>
    <Input type="switch" label="Show Area" on:change={toggleProvince} checked={$prov_visible} />
  </FormGroup>
</Row>