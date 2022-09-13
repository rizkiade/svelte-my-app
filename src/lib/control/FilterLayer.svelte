<script>
	import { Button, Card, Col, Input, Label, Offcanvas, Row } from "sveltestrap";
	import Pengelola from "../features/pengelola/Pengelola.svelte";
	import WilayahSungai from "../features/wilayahsungai/WilayahSungai.svelte";
	import { filter_asset_sub, paramsKewenangan } from "../../store/map.js";
	import Sungai from "../features/sungai/Sungai.svelte";
	import DaerahAliranSungai from "../features/daerahaliransungai/DaerahAliranSungai.svelte";
	import Province from "../features/province/Province.svelte";
	// import { featureExist, projectLayerSource } from "../../store/features.js";

	let isOpen = false;

	let handleKwSwitch = (e) => {
		if (e.target.checked) {
			paramsKewenangan.set(e.target.value);
		} else {
			paramsKewenangan.set(undefined);
		}
	};

	let print = () => {
		console.log($filter_asset_sub[3].manfaat_irigasi);
	};


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
    <Sungai />
    <DaerahAliranSungai />

  </Card>

  <Card body style="background: rgba(104, 129, 169, 0.35); padding-bottom: 10px; margin-top: 5px">
    <Label class="text-center">Wilayah Administratif</Label>
    <Province />

  </Card>

  <Button class="mt-2" on:click={print}> CETAK</Button>

</Offcanvas>