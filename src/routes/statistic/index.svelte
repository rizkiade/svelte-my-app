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
	import { Alert, Button } from "sveltestrap";
	import CardStatistic from "./CardStatistic.svelte";
	import Bendungan from "./body/Bendungan.svelte";
	import Danau from "./body/Danau.svelte";

	let title = undefined;

</script>

<svelte:head>
  <title>Statistic</title>
  <meta name="description" content="Statistic Infrastructure" />
</svelte:head>

<div class="content">

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
    <Button color="primary" on:click={() => title=''}>Pos Klimatologi</Button>
  </div>


  {#if title === undefined}
    <Alert color="info" class="mt-lg-4">
      <h4 class="alert-heading text-capitalize">Info</h4>
      Pilih menu di atas untuk menampilkan data.
    </Alert>
  {/if}

  {#if title === 'Danau'}
    <CardStatistic>
      <span slot="title">{title}</span>
      <Danau />
    </CardStatistic>
  {/if}

  {#if title === 'Bendungan'}
    <CardStatistic>
      <span slot="title">{title}</span>
      <Bendungan />
    </CardStatistic>
  {/if}

  {#if title === 'Bendung'}
    <CardStatistic>
      <span slot="title">{title}</span>
    </CardStatistic>
  {/if}

  {#if title === 'Embung'}
    <CardStatistic>
      <span slot="title">{title}</span>
    </CardStatistic>
  {/if}

  {#if title === 'Air Tanah'}
    <CardStatistic>
      <span slot="title">{title}</span>
    </CardStatistic>
  {/if}

  {#if title === 'Air Baku'}
    <CardStatistic>
      <span slot="title">{title}</span>
    </CardStatistic>
  {/if}


</div>


<style>
    .content {
        width: 100%;
        max-width: 95%;
        margin: var(--column-margin-top) auto 0 auto;
    }
</style>
