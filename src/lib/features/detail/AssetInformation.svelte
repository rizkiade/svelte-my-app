<script>
	import { Button, Table } from "sveltestrap";
	import { selected_asset } from "../../../store/map.js";

	let closeDetail = () => {
		$selected_asset.id = undefined;
	};
</script>

<div class="card" style="background-color: rgba(104,129,169,0.35)">
  <div class="card-header text-center bg-card-title text-light">Detail Information</div>
</div>
<Button class="btn-sm btn-danger mt-2" on:click={closeDetail}>Hide</Button>

<Table borderless size="sm" class="mt-4">
  <tbody>
  <tr>
    <td>Asset</td>
    <td>:</td>
    <td>{$selected_asset.name ?? '-'}</td>
  </tr>
  <tr>
    <td>Type</td>
    <td>:</td>
    <td>{$selected_asset.type ?? '-'}</td>
  </tr>
  <tr>
    <td>Pengelola</td>
    <td>:</td>
    <td>{$selected_asset.pengelola ?? '-'}</td>
  </tr>
  <tr>
    <td>WS</td>
    <td>:</td>
    <td>{$selected_asset.ws ?? '-'}</td>
  </tr>
  <tr>
    <td>DAS</td>
    <td>:</td>
    <td>{$selected_asset.das ?? '-'}</td>
  </tr>
  <tr>
    <td>Provinsi</td>
    <td>:</td>
    <td>{$selected_asset.provinsi ?? '-'}</td>
  </tr>
  <tr>
    <td>Kabupaten</td>
    <td>:</td>
    <td>{$selected_asset.kabupaten ?? '-'}</td>
  </tr>
  <tr>
    <td>Kecamatan</td>
    <td>:</td>
    <td>{$selected_asset.kecamatan ?? '-'}</td>
  </tr>
  <tr>
    <td>Desa</td>
    <td>:</td>
    <td>{$selected_asset.desa ?? '-'}</td>
  </tr>
  <tr>
    <td>Coordinate</td>
    <td>:</td>
    <td><span class="text-danger">{$selected_asset.coordinate}</span></td>
  </tr>
  </tbody>
</Table>
