<script>
	import { Alert, Card, Row } from "sveltestrap";
	import { slide } from "svelte/transition";
	import Select from "svelte-select";

	import loadOptions from "./search.d.ts";
	import SearchItem from "./SearchItem.svelte";
	import { search_features } from "../../../store/map.js";
	import { onDestroy } from "svelte";

	const itemId = "id";

	const handleSelect = (e) => {
		search_features.set({
			id: e.detail.id,
			name: e.detail.name,
			type: e.detail.type_name,
			pengelola: e.detail.pengelola_name,
			coordinate: e.detail.coordinate,
			ws: e.detail.ws_name,
			das: e.detail.das_name,
			provinsi: e.detail.provinsi,
			kabupaten: e.detail.kabupaten,
			kecamatan: e.detail.kecamatan,
			desa: e.detail.kelurahan
		});
	};

	const handleClear = () => {
		reset_search_data();
	};

	onDestroy(() => {
		reset_search_data();
	});

	let reset_search_data = () => {
		search_features.set({
			id: undefined,
			name: undefined,
			type: undefined,
			pengelola: undefined,
			coordinate: undefined,
			ws: undefined,
			das: undefined,
			provinsi: undefined,
			kabupaten: undefined,
			kecamatan: undefined,
			desa: undefined
		});
	};


</script>

<div transition:slide>

  <Card body style="background: rgba(104,129,169,0.35); z-index: 999" class="mb-2">
    <Row>
      <Select placeholder="Search by name" {itemId} {loadOptions} on:select={handleSelect} on:clear={handleClear}>
        <div class="search" slot="item" let:item let:index>
          <SearchItem {item} />
        </div>

        <div class="search" slot="selection" let:selection>
          <SearchItem item={selection} />
        </div>
      </Select>

    </Row>
  </Card>

  <Card body style="background: rgba(104,129,169,0.35);" class="mb-2 text-center">
    <Alert color="warning">Masukkan nilai coordinate untuk mendapatkan informasi Geo location.
    </Alert>
    <Row>
      <div class="input-group mb-1">
        <input type="text" class="form-control" placeholder="114.780748,-8.212019" aria-label="114.780748,-8.212019" aria-describedby="button-check-geo">
        <button class="btn btn-primary" type="button" id="button-check-geo">Check</button>
      </div>
    </Row>
  </Card>

  <div class="card" style="background-color: rgba(104,129,169,0.35)">
    <div class="card-header text-center" style="background-color: rgba(87,107,131,0.5)">Geo Information</div>
    <div class="card-body">
      <table>
        <tbody>
        <tr>
          <td>WS</td>
          <td>:</td>
          <!--                  <td>{geo_result.ws ?? '-'}</td>-->
        </tr>
        <tr>
          <td>DAS</td>
          <td>:</td>
          <!--                  <td>{geo_result.das ?? '-'}</td>-->
        </tr>
        <tr>
          <td>Provinsi</td>
          <td>:</td>
          <!--                  <td>{geo_result.provinsi ?? '-'}</td>-->
        </tr>
        <tr>
          <td>Kabupaten</td>
          <td>:</td>
          <!--                  <td>{geo_result.kabupaten ?? '-'}</td>-->
        </tr>
        <tr>
          <td>Kecamatan</td>
          <td>:</td>
          <!--                  <td>{geo_result.kecamatan ?? '-'}</td>-->
        </tr>
        <tr>
          <td>Desa</td>
          <td>:</td>
          <!--                  <td>{geo_result.desa ?? '-'}</td>-->
        </tr>
        </tbody>
      </table>
    </div>
  </div>

</div>
