<script>
	import { Alert, Card, Row } from "sveltestrap";
	import Select from "svelte-select";
	import { slide } from "svelte/transition";
</script>

<div transition:slide>

  <Card body style="background: rgba(104,129,169,0.35);" class="mb-2">
    <Row>
      <Select placeholder="Search by name" />
    </Row>
  </Card>

  <Card body style="background: rgba(104,129,169,0.35);" class="mb-2 text-center">
    <Alert color="warning">Masukkan nilai coordinate untuk mendpatkan informasi Geo location.
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
