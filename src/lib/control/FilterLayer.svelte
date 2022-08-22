<script>
	import { Card, Col, FormGroup, Input, Label, Offcanvas, Row } from "sveltestrap";
	import Select from "svelte-select";
	import { toasts } from "svelte-toasts";
	import Pengelola from "../features/pengelola/Pengelola.svelte";
	import WilayahSungai from "../features/wilayahsungai/WilayahSungai.svelte";
	import { paramsKewenangan } from "../../store/map.js";

	let isOpen = false;

	let handleSwitch = (e) => {
		if (e.target.checked) {
			paramsKewenangan.set(e.target.value);
		} else {
			paramsKewenangan.set(undefined);
		}
	};

	export { isOpen };
</script>

<Offcanvas isOpen={isOpen === 'layer'} header="Asset Filter" placement="start" backdrop={false} style="width: 310px; background: rgba(255, 255, 255, 0.5);">
  <Card body style="background: rgba(104, 129, 169, 0.35); padding-bottom: 10px;">
    <Label class="text-center">Kewenangan</Label>

    <Row>
      <Col>
        <Input type="switch" label="Pusat" value="pusat" on:change={handleSwitch} checked={$paramsKewenangan === 'pusat'} />
      </Col>
      <Col>
        <Input type="switch" label="Prov" value="provinsi" on:change={handleSwitch} checked={$paramsKewenangan === 'provinsi'} />
      </Col>
      <Col>
        <Input type="switch" label="Kab" value="kabupaten" on:change={handleSwitch} checked={$paramsKewenangan === 'kabupaten'} />
      </Col>
    </Row>

  </Card>

  <Card body style="background: rgba(104, 129, 169, 0.35); padding-bottom: 0; margin-top: 5px">
    <Label class="text-center">Wilayah Kerja</Label>

    <Pengelola />
    <WilayahSungai />

  </Card>
</Offcanvas>