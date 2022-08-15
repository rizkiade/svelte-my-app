<script lang="ts">
	import { FormGroup, Input, Row } from "sveltestrap";
	import Select from "svelte-select";
	import { toasts } from "svelte-toasts";
	import { PengelolaApi } from "./pengelola.ts";
	import SelectLoading from "$lib/component/loader/SelectLoading.svelte";

	const optionIdentifier = "id";
	const labelIdentifier = "name";

	const _api = new PengelolaApi();

	let togglePengelola = (e) => {
		toasts.error("Pilih Pengelola terlebih dahulu.");
	};

</script>

<Row>
  {#await _api.getAll()}
    <SelectLoading />
  {:then pengelolaItems}
    <Select placeholder="Pilih Pengelola" } items="{pengelolaItems}" {optionIdentifier} {labelIdentifier}>
      <div slot="clear-icon">❌</div>
    </Select>
  {/await}
  <FormGroup>
    <Input id="pengelola" type="switch" label="Show Area" on:change={togglePengelola} />
  </FormGroup>
</Row>