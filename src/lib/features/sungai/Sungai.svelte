<script>
	import { Card, Col, Input, Label, Row } from "sveltestrap";
	import { SungaiApi } from "./sungai.d.ts";
	import { filter_asset, ordo_visible } from "../../../store/map.js";
	import { featureExist } from "../../../store/features.js";
	import { toasts } from "svelte-toasts";

	let _sungai_api = new SungaiApi();

	let handleOrdoSungai = async (e) => {
		let ordo_number = e.target.value;

		if ($filter_asset.wsId) {
			if (e.target.checked) {

				e.target.disabled = true;

				let request = false;
				// eslint-disable-next-line no-prototype-builtins
				if (!$featureExist.hasOwnProperty($filter_asset.wsId)) {
					$featureExist[$filter_asset.wsId] = { 23: { ["ordo_" + ordo_number]: { checked: true, feature: {} } } };
					request = true;

					console.log("new layer ws with sungai kode");
				} else {
					// eslint-disable-next-line no-prototype-builtins
					if (!$featureExist[$filter_asset.wsId].hasOwnProperty(23)) {
						$featureExist[$filter_asset.wsId][23] = { ["ordo_" + ordo_number]: { checked: true, feature: {} } };
						request = true;

						// console.log("new layer sungai with ordo new");
					} else {
						// eslint-disable-next-line no-prototype-builtins
						if (!$featureExist[$filter_asset.wsId][23].hasOwnProperty("ordo_" + ordo_number)) {
							$featureExist[$filter_asset.wsId][23]["ordo_" + ordo_number] = { checked: true, feature: {} };
							request = true;

							// console.log("added ordo append");
						} else {
							$featureExist[$filter_asset.wsId][23]["ordo_" + ordo_number].checked = true;
						}
					}
				}

				if (request) {
					$featureExist[$filter_asset.wsId][23]["ordo_" + ordo_number] = { checked: true, feature: await request_features(e.target.value) };
				}

				$ordo_visible[ordo_number] = true;

			} else {
				// unchecked
				$featureExist[$filter_asset.wsId][23]["ordo_" + ordo_number].checked = false;
				$ordo_visible[ordo_number] = false;
			}

			e.target.disabled = false;

		} else {
			e.target.checked = false;
			toasts.error("Pilih Wilayah Sungai terlebih dahulu.");
		}
	};

	let request_features = async (ordo_number) => {
		return await _sungai_api.getRiverFeature($filter_asset.wsId, parseInt(ordo_number));
	};

</script>

<Card body style="background: rgba(104, 129, 169, 0.35); padding-bottom: 10px;">
  <Label class="text-center">Sungai</Label>
  <Row style="background-color:rgba(104,129,169,0.54); border-radius: 10px">

    {#each [1, 2, 3, 4] as row (row)}
      <Col xs="6">
        <Input type="switch" label="Ordo {row}" value="{row}" on:change={handleOrdoSungai} checked="{$featureExist[$filter_asset.wsId] ? ($featureExist[$filter_asset.wsId][23] ? ($featureExist[$filter_asset.wsId][23][`ordo_${row}`] ? $featureExist[$filter_asset.wsId][23][`ordo_${row}`].checked : false ) : false) : false}" />
      </Col>
    {/each}

  </Row>
</Card>