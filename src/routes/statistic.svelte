<script context="module">
	import { browser, dev } from "$app/env";

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>
<script>
	import { Button, Table } from "sveltestrap";

	let title = "Infrastructure";

</script>

<svelte:head>
  <title>Statistic</title>
  <meta name="description" content="Statistic Infrastructure" />
</svelte:head>

<div class="content">
  <!--  <h1>Statistic Infrastructure</h1>-->

  <div class="d-flex justify-content-between">
    <Button color="primary" on:click={() => title='Danau'}>Danau</Button>
    <Button color="primary" on:click={() => title='Bendungan'}>Bendungan</Button>
    <Button color="primary" on:click={() => title='Bendung'}>Bendung</Button>
    <Button color="primary" on:click={() => title='Embung'}>Embung</Button>
    <Button color="primary" on:click={() => title='Air Tanah'}>Air Tanah</Button>
    <Button color="primary" on:click={() => title='Air Baku'}>Air Baku</Button>
    <Button color="primary" on:click={() => title='Pengendali Sedimen'}>Pengendali Sedimen</Button>
    <Button color="primary" on:click={() => title='Pengaman Pantai'}>Pengaman Pantai</Button>
    <Button color="primary" on:click={() => title='Pos Curah Hujan'}>Pos Curah Hujan</Button>
    <Button color="primary" on:click={() => title='Pos Duga Air'}>Pos Duga Air</Button>
    <Button color="primary" on:click={() => title='Pos Klimatologi'}>Pos Klimatologi</Button>
  </div>

  <div class="card mt-lg-3">
    <div class="card-header text-center">
      {title}
    </div>
    <div class="card-body">
      <h5 class="card-title text-center">Statistic</h5>

      <div class="row">
        <div class="col-lg-3">
          <h1 style="font-size: 50px;" class="align-text-bottom"><span style="color: #b9c6d2;">Total</span> 294</h1>
        </div>
        <div class="col-lg-9" style="border-left: 3px solid sandybrown">
          <dl class="row">
            <div class="col-lg-6">
              <div class="row">
                <dt class="col-sm-3">Rencana</dt>
                <dd class="col-sm-9">0</dd>
              </div>

              <div class="row">
                <dt class="col-sm-3">Pelaksanaan</dt>
                <dd class="col-sm-9">0</dd>
              </div>

              <div class="row">
                <dt class="col-sm-3">Selesai</dt>
                <dd class="col-sm-9">0</dd>
              </div>
            </div>

            <div class="col-lg-6" style="border-left: 3px solid sandybrown">
              <div class="row">
                <dt class="col-sm-6">Total Kapasitas Tampung</dt>
                <dd class="col-sm-6">0 <span class="fill-satuan">(satuan)</span></dd>
              </div>

              <div class="row">
                <dt class="col-sm-6">Tampungan saat ini</dt>
                <dd class="col-sm-6">0 <span class="fill-satuan">(satuan)</span></dd>
              </div>

              <div class="row">
                <dt class="col-sm-6">Irigasi</dt>
                <dd class="col-sm-6">0 <span class="fill-satuan">(satuan)</span></dd>
              </div>

              <div class="row">
                <dt class="col-sm-6">Tenaga Listrik</dt>
                <dd class="col-sm-6">0 <span class="fill-satuan">(satuan)</span></dd>
              </div>

              <div class="row">
                <dt class="col-sm-6">Ketersediaan Air Baku</dt>
                <dd class="col-sm-6">0 <span class="fill-satuan">(satuan)</span></dd>
              </div>
            </div>
          </dl>

        </div>
      </div>

      <hr style="border: 3px solid saddlebrown;">

      <div class="row">
        <div class="col-lg-4">
          <Table size="sm">
            <thead>
            <tr>
              <th>#</th>
              <th>Provinsi</th>
              <th class="text-end">Total</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Jawa Barat</td>
              <td class="text-end">0</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jawa Tengah</td>
              <td class="text-end">0</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Jawa Timur</td>
              <td class="text-end">0</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Bali</td>
              <td class="text-end">0</td>
            </tr>
            <tr>
              <th scope="row">5</th>
              <td>Nusa Tenggara Timur</td>
              <td class="text-end">0</td>
            </tr>
            </tbody>
          </Table>

        </div>
      </div>

      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
    <div class="card-footer text-muted">
      2 days ago
    </div>
  </div>


</div>


<style>
    .content {
        width: 100%;
        max-width: 95%;
        margin: var(--column-margin-top) auto 0 auto;
    }

    .fill-satuan {
        font-style: italic;
        font-weight: bold;
        color: deeppink;
    }
</style>
