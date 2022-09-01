<script>
	import { Card, Col, Input, Label, Offcanvas, Row } from "sveltestrap";
	import Pengelola from "../features/pengelola/Pengelola.svelte";
	import WilayahSungai from "../features/wilayahsungai/WilayahSungai.svelte";
	import { SungaiApi } from "../features/sungai/sungai.d.ts";
	import { toasts } from "svelte-toasts";
	import { filter_asset, ordo_visible, paramsKewenangan } from "../../store/map.js";
	import { featureExist } from "../../store/features.js";

	let isOpen = false;

	let handleKwSwitch = (e) => {
		if (e.target.checked) {
			paramsKewenangan.set(e.target.value);
		} else {
			paramsKewenangan.set(undefined);
		}
	};

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


	// let print = () => {
	// 	console.log($featureExist);
	// 	console.log($ordo_visible);
	// };
	//
	// let addNew = () => {
	// 	$featureExist[$filter_asset.wsId] = { 24: "DAS" };
	// };

	export { isOpen };
</script>

<Offcanvas isOpen={ isOpen === 'layer'} header="Asset Filter" placement="start" backdrop={false} style="width: 310px; background: rgba(255, 255, 255, 0.5);">
  <Card body style="background: rgba(104, 129, 169, 0.35); padding-bottom: 10px;">
    <Label class="text-center">Kewenangan</Label>

    <Row style="background-color:rgba(104,129,169,0.54); border-radius: 10px">
      <Col>
        <Input type="switch" label="Pusat" value="pusat" on:change={handleKwSwitch} checked={$paramsKewenangan === 'pusat'} />
      </Col>
      <Col>
        <Input type="switch" label="Prov" value="provinsi" on:change={handleKwSwitch} checked={$paramsKewenangan === 'provinsi'} />
      </Col>
      <Col>
        <Input type="switch" label="Kab" value="kabupaten" on:change={handleKwSwitch} checked={$paramsKewenangan === 'kabupaten'} />
      </Col>
    </Row>

  </Card>

  <Card body style="background: rgba(104, 129, 169, 0.35); padding-bottom: 10px; margin-top: 5px">
    <Label class="text-center">Wilayah Kerja</Label>

    <Pengelola />
    <WilayahSungai />

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

  </Card>

  <!--  <Button on:click={print}> CETAK</Button>-->
  <!--  <Button on:click={addNew}> Add</Button>-->

</Offcanvas>