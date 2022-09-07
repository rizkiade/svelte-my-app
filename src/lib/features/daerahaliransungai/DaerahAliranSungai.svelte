<script>
	import { FormGroup, Input, Row } from "sveltestrap";
	import Select from "svelte-select";
	import SelectLoading from "../../component/loader/SelectLoading.svelte";
	import { featureExist } from "../../../store/features.js";
	import { das_visible, filter_asset, onDasReq } from "../../../store/map.js";
	import { toasts } from "svelte-toasts";

	const itemId = "id";
	const label = "name";

	let das = [];
	let list_das = () => {
		das = [];
		if ($filter_asset.wsId !== undefined) {
			// eslint-disable-next-line no-prototype-builtins
			if ($featureExist[$filter_asset.wsId].hasOwnProperty(24)) {
				das = $featureExist[$filter_asset.wsId][24].features.map(item => {
					return { id: item.properties.id, name: item.properties.name !== "" ? `${item.properties.kode_das} - ${item.properties.name}` : "-" };
				});
			}
		}
	};
	$: list_das($featureExist[$filter_asset.wsId]);

	let dasSelect = (e) => {
		$filter_asset.dasId = e.detail.id;
	};

	let fieldClear = () => {
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
    <Select placeholder="Select Daerah Aliran Sungai" } items="{das}" {itemId} {label} on:select={dasSelect} on:clear={fieldClear} clearable="true">
      <div slot="clear-icon">❌</div>
    </Select>
  {/if}
  <FormGroup>
    <Input id="daerah_aliran_sungai" type="switch" label="Show Area" on:change={toggleDAS} checked={$das_visible} />
  </FormGroup>
</Row>