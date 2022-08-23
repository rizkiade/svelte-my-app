<script>
	import { Card, Col, Input, Label, Offcanvas, Row } from "sveltestrap";
	import Pengelola from "../features/pengelola/Pengelola.svelte";
	import WilayahSungai from "../features/wilayahsungai/WilayahSungai.svelte";
	import { filter_asset, paramsKewenangan } from "../../store/map.js";
	import { toasts } from "svelte-toasts";

	let isOpen;

	let handleSwitch = (e) => {
		if (e.target.checked) {
			paramsKewenangan.set(e.target.value);
		} else {
			paramsKewenangan.set(undefined);
		}
	};

	let handleOrdoSungai = (e) => {
		if ($filter_asset.wsId) {
			if (e.target.checked)
				toasts.warning("Feature under development.");
		} else {
			e.target.checked = false;
			toasts.error("Pilih Wilayah Sungai terlebih dahulu.");
		}
	};

	export { isOpen };
</script>

<Offcanvas isOpen={ isOpen === 'layer'} header="Asset Filter" placement="start" backdrop={false} style="width: 310px; background: rgba(255, 255, 255, 0.5);">
  <Card body style="background: rgba(104, 129, 169, 0.35); padding-bottom: 10px;">
    <Label class="text-center">Kewenangan</Label>

    <Row style="background-color:rgba(104,129,169,0.54); border-radius: 10px">
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

  <Card body style="background: rgba(104, 129, 169, 0.35); padding-bottom: 10px; margin-top: 5px">
    <Label class="text-center">Wilayah Kerja</Label>

    <Pengelola />
    <WilayahSungai />

    <Card body style="background: rgba(104, 129, 169, 0.35); padding-bottom: 10px;">
      <Label class="text-center">Sungai Ordo</Label>
      <Row style="background-color:rgba(104,129,169,0.54); border-radius: 10px">
        <Col xs="6">
          <Input type="switch" label="Utama" value="utama" on:change={handleOrdoSungai} />
        </Col>
        <Col xs="6">
          <Input type="switch" label="Satu(1)" value="1" on:change={handleOrdoSungai} />
        </Col>
        <Col xs="6">
          <Input type="switch" label="Dua(2)" value="2" on:change={handleOrdoSungai} />
        </Col>
        <Col xs="6">
          <Input type="switch" label="Tiga(3)" value="3" on:change={handleOrdoSungai} />
        </Col>
      </Row>

    </Card>

  </Card>
</Offcanvas>