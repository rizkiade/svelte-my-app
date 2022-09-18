<script>
	import Select from "svelte-select";
	import { filter_asset, kabupaten, kabupaten_visible, kabupatenByProv, kecamatanByKab, paramsAdm,  province } from "../../../store/map.js";
	import { FormGroup, Input, Row } from "sveltestrap";
	import { CityApi } from "./city.d.ts";
	import SelectLoading from "../../component/loader/SelectLoading.svelte";
	import { onMount } from "svelte";
	import { toasts } from "svelte-toasts";
	import { DistrictApi } from "../district/district.d.ts";
	import { featureExistAdm } from "../../../store/features.js";

	let _api_city = new CityApi();
	let _api_district = new DistrictApi();

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
		if (e.detail.label !== $filter_asset.kabupaten) {
			$filter_asset.kabupaten = e.detail.label;
			$filter_asset.kecamatan = undefined;
			$filter_asset.kelurahan = undefined;

			$paramsAdm.kabId = justValue;
			$paramsAdm.kecId = undefined;
			$paramsAdm.desaId = undefined;

			if ($filter_asset.kabupaten !== undefined) {
				_api_district.getList($filter_asset).then(result => {
					$kecamatanByKab = result.map(({ id, name }) => ({ value: id, label: name }));
				});
			}
			showAreaKabupaten();
		}
	};

	let showAreaKabupaten = () => {
		if ($kabupaten_visible && $paramsAdm.kabId) {
			// Create new object ON feature Administratif.
			// eslint-disable-next-line no-prototype-builtins
			if (!$featureExistAdm.hasOwnProperty($paramsAdm.provId)) {
				$featureExistAdm[$paramsAdm.provId] = {
					feature: undefined,
					kabupaten: {
						[$paramsAdm.kabId]: {
							feature: undefined,
							kecamatan: []
						}
					}
				};
				request_feature();
			} else {
				// eslint-disable-next-line no-prototype-builtins
				if (!$featureExistAdm[$paramsAdm.provId].kabupaten.hasOwnProperty($paramsAdm.kabId)) {
					$featureExistAdm[$paramsAdm.provId].kabupaten[$paramsAdm.kabId] = {
						feature: undefined,
						kecamatan: []
					};
					request_feature();
				}
			}
		}
	};

	let request_feature = () => {
		onCityReq = true;
		return _api_city.getArea($paramsAdm.kabId).then(result => {
			$featureExistAdm[$paramsAdm.provId].kabupaten[$paramsAdm.kabId].feature = { ...result };
			onCityReq = false;
		});
	};

	let toggleCity = (e) => {
		if ($filter_asset.kabupaten) {
			$kabupaten_visible = !$kabupaten_visible;
			showAreaKabupaten();
		} else {
			e.target.checked = false;
			$kabupaten_visible = false;
			toasts.error("Pilih Kabupaten terlebih dahulu.");
		}
	};


	let fieldClear = () => {
		justValue = null;
		$filter_asset.kabupaten = undefined;
		$filter_asset.kecamatan = undefined;
		$filter_asset.kelurahan = undefined;
	};


</script>

<Row>
  {#if onCityReq}
    <SelectLoading />
  {:else }
    <Select placeholder="Select Kabupaten" items="{$kabupatenByProv}"
            on:select={citySelect}
            on:clear={fieldClear}
            bind:justValue
            value="{$filter_asset.kabupaten}"
            clearable="true">
      <div slot="clear-icon">❌</div>
    </Select>
  {/if}
  <FormGroup>
    <Input id="city" type="switch" label="Show Area" on:change={toggleCity} checked={$kabupaten_visible} />
  </FormGroup>
</Row>
