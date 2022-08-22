<script lang="ts">
	import { getContext } from "svelte";
	import { FormGroup, Input, Row } from "sveltestrap";
	import Select from "svelte-select";
	import { toasts } from "svelte-toasts";
	import { PengelolaApi } from "./pengelola.ts";
	import SelectLoading from "$lib/component/loader/SelectLoading.svelte";

	import { mapKey, preloader, ws, ws_visible, wsp_visible, wsFilter, filter_asset } from "../../../store/map.js";
	import { wsp_features, featureExistWSP } from "../../../store/features.js";

	const itemId = "id";
	const label = "name";

	const mapContext = getContext(mapKey);
	const map = mapContext;

	const _api = new PengelolaApi();

	let pengelolaSelect = (e) => {
		filter_asset.set({
			pengelolaId: parseInt(e.detail.id),
			wsId: undefined,
			dasId: undefined,
			provinsi: undefined,
			kabupaten: undefined,
			kecamatan: undefined,
			kelurahan: undefined
		});


		$wsFilter = JSON.parse(e.detail.ws_area);
		showAreaPengelola();
		// $provinceByWs = [];

		// $wsFilter.map(val => {
		// 	JSON.parse(val.province).map(provinces => {
		// 		if (!$provinceByWs.find(p => p.id === provinces.id)) {
		// 			$provinceByWs.push(provinces);
		// 		}
		// 	});
		// });
	};

	let fieldClear = () => {
		$filter_asset.pengelolaId = undefined;
		$filter_asset.wsId = undefined;
		$filter_asset.dasId = undefined;
		$wsFilter = $ws;
		$wsp_visible = false;
		$ws_visible = false;
		// $dasFilter = [];
		// $das_visible = false;
		// $provinceByWs = [];
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
  {#await _api.getList()}
    <SelectLoading />
  {:then pengelolaItems}
    <Select placeholder="Pilih Pengelola" } items="{pengelolaItems}" {itemId} {label} on:select={pengelolaSelect} on:clear={fieldClear}>
      <div slot="clear-icon">❌</div>
    </Select>
  {/await}
  <FormGroup>
    <Input id="pengelola" type="switch" label="Show Area" on:change={togglePengelola} checked={$wsp_visible} />
  </FormGroup>
</Row>