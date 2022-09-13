<script>
	import { FormGroup, Input, Row } from "sveltestrap";
	import Select from "svelte-select";
	import SelectLoading from "../../component/loader/SelectLoading.svelte";
	import { featureExist } from "../../../store/features.js";
	import { das_visible, filter_asset, onDasReq } from "../../../store/map.js";
	import { toasts } from "svelte-toasts";

	let das = [];
	let list_das = () => {
		das = [];
		if ($filter_asset.wsId !== undefined) {
			// eslint-disable-next-line no-prototype-builtins
			if ($featureExist[$filter_asset.wsId].hasOwnProperty(24)) {
				das = $featureExist[$filter_asset.wsId][24].features.map(item => {
					return { value: item.properties.id, label: item.properties.name !== "" ? item.properties.name : "-", kode_das: item.properties.kode_das };
				});
			}
		}
	};
	$: list_das($featureExist[$filter_asset.wsId]);

	let justValue;
	let dasSelect = (e) => {
		$filter_asset.dasId = e.detail.value;
		$filter_asset.dasLabel = e.detail.label;
	};

	let fieldClear = () => {
		justValue = null;
		$filter_asset.dasId = undefined;
	};

	let toggleDAS = (e) => {
		if ($filter_asset.wsId) {
			$das_visible = !$das_visible;
		} else {
			e.target.checked = false;
			$das_visible = false;
			toasts.error("Pilih Wilayah Sungai terlebih dahulu.");
		}
	};

</script>

<Row class="mt-4">

  {#if $onDasReq}
    <SelectLoading />
  {:else }
    <Select placeholder="Select Daerah Aliran Sungai" } items="{das}" on:select={dasSelect} on:clear={fieldClear} clearable="true">
      <div slot="clear-icon">❌</div>
      <div slot="item" let:item>
        {item.kode_das}: {item.label}
      </div>
    </Select>
  {/if}
  <FormGroup>
    <Input id="daerah_aliran_sungai" type="switch" label="Show Area" on:change={toggleDAS} checked={$das_visible} />
  </FormGroup>
</Row>