<script>
	import { Button, Card, Col, Input, Label, Offcanvas, Row } from "sveltestrap";
	import Pengelola from "../features/pengelola/Pengelola.svelte";
	import WilayahSungai from "../features/wilayahsungai/WilayahSungai.svelte";
  import { paramsKewenangan } from "../../store/map.js";
	import Sungai from "../features/sungai/Sungai.svelte";
	import DaerahAliranSungai from "../features/daerahaliransungai/DaerahAliranSungai.svelte";
	import Province from "../features/province/Province.svelte";
	import City from "../features/city/City.svelte";
	import District from "../features/district/District.svelte";
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
		// console.log($filter_asset_sub[3].manfaat_irigasi);
		// console.log($featureExistAdm);
		// console.log($filter_asset);
		// console.log($featureExistAdm[32].kabupaten[206]);
	};


	export { isOpen };
</script>

<Offcanvas isOpen={ isOpen === 'layer'} placement="start" backdrop={false} style="width: 310px; background: rgba(255, 255, 255, 0.5);">

  <div class="card" style="background-color: rgba(104,129,169,0.35)">
    <div class="card-header text-center bg-card-title text-light">Asset Filter</div>
  </div>

  <Card body style="background: rgba(104, 129, 169, 0.35); padding-bottom: 10px; margin-top: 10px">
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

  <Card body style="background: rgba(104, 129, 169, 0.35); margin-top: 5px">
    <Label class="text-center">Wilayah Kerja</Label>
    <Pengelola />
    <WilayahSungai />
    <Sungai />
    <DaerahAliranSungai />
  </Card>

  <Card body style="background: rgba(104, 129, 169, 0.35); padding-bottom: 10px; margin-top: 5px">
    <Label class="text-center">Wilayah Administratif</Label>
    <Province />
    <City />
    <District />

  </Card>

  <Button class="mt-2" on:click={print}> CETAK</Button>

</Offcanvas>