<script lang="ts">
	import { FormGroup, Input, Row } from "sveltestrap";
	import Select from "svelte-select";
	import { toasts } from "svelte-toasts";
	import { PengelolaApi } from "./pengelola.d.ts";
	import SelectLoading from "$lib/component/loader/SelectLoading.svelte";

	import { preloader, ws, ws_visible, wsp_visible, das_visible, ordo_visible, wsFilter, pengelola, filter_asset, provinceByWs } from "../../../store/map.js";
	import { wsp_features, featureExistWSP } from "../../../store/features.js";
	import { onMount } from "svelte";
	import { log2 } from "ol/math";

	const _api = new PengelolaApi();

	let onReq = false;
	onMount(() => {
		if ($pengelola.length === 0) {
			onReq = true;
			_api.getList().then(result => {
				$pengelola = result.map(({ id, name, ws_area }) => ({ value: id, label: name, ws: ws_area }));
				onReq = false;
			});
		}
	});

	let pengelolaSelect = (e) => {
		filter_asset.set({
			pengelolaId: parseInt(e.detail.value),
			wsId: undefined,
			dasId: undefined,
			provinsi: undefined,
			kabupaten: undefined,
			kecamatan: undefined,
			kelurahan: undefined
		});

		ordo_visible.set({ 1: false, 2: false, 3: false, 4: false });

		showAreaPengelola();
	};

	let fieldClear = () => {
		$filter_asset.pengelolaId = undefined;
		$filter_asset.wsId = undefined;
		$filter_asset.wsLabel = undefined;
		$filter_asset.dasId = undefined;
		$filter_asset.dasLabel = undefined;
		$wsFilter = $ws;
		$wsp_visible = false;
		$ws_visible = false;
		$das_visible = false;
		$provinceByWs = [];
	};

	let togglePengelola = (e) => {
		if ($filter_asset.pengelolaId) {
			$wsp_visible = !$wsp_visible;
			showAreaPengelola();
		} else {
			e.target.checked = false;
			$wsp_visible = false;
			toasts.error("Pilih Pengelola terlebih dahulu.");
		}
	};

	let showAreaPengelola = async () => {

		if ($wsp_visible && $filter_asset.pengelolaId) {

			// eslint-disable-next-line no-prototype-builtins
			if (!$featureExistWSP.hasOwnProperty($filter_asset.pengelolaId)) {
				$preloader = true;
				// disabled = true;

				let result = await _api.getArea($filter_asset.pengelolaId);
				$featureExistWSP[$filter_asset.pengelolaId] = { ...result };
				wsp_features.set(result);

				$preloader = false;
				// disabled = false;

			} else {
				wsp_features.set($featureExistWSP[$filter_asset.pengelolaId]);
			}

		}
	};
</script>

<Row>
  {#if onReq}
    <SelectLoading />
  {:else }
    <Select placeholder="Select Pengelola" } items="{$pengelola}" on:select={pengelolaSelect} on:clear={fieldClear}>
      <div slot="clear-icon">❌</div>
    </Select>
  {/if}

  <FormGroup>
    <Input id="pengelola" type="switch" label="Show Area" on:change={togglePengelola} checked={$wsp_visible} />
  </FormGroup>
</Row>