<script>
	import { Row, Spinner } from "sveltestrap";
	import { assets_features, count_asset } from "../../../store/map.js";
	import { toasts } from "svelte-toasts";
	import { InfrastructureApi } from "./infrastructure.d.ts";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();
	const _api = new InfrastructureApi();

	let result;
	let onRequested = false;
	let handleChanged = async (e) => {
		let _id = parseInt(e.target.id);

		if (e.target.checked) {
			e.target.disabled = true;
			onRequested = true;

			result = await _api.getAsset(_id);

			$assets_features.features = [...$assets_features.features, ...result.features];
			toasts.info(`${result.features.length} features add.`);
			e.target.disabled = false;
			onRequested = false;
		} else {
			$assets_features.features = $assets_features.features.filter(i => i.properties.type_id !== _id);
		}
	};

	let toggleFilter = () => {
		dispatch("open", {
			value: true,
			layerId: id,
			layerLabel: name
		});
	};

	let id;
	let name;
	let checked;

	export { id, name, checked };
</script>

<Row>
  <div class="btn-group mt-2" role="group" aria-label="Basic example">
    <button class="btn" style="border-radius: 15px 0 0 0; border: 2px solid #183153; width: 25%; background: #ffcf23">
      {#if onRequested}
        <Spinner size="sm" />
      {:else }
        <b>
          {$count_asset[id] ?? 0}
        </b>
      {/if}
    </button>
    <div class="d-inline-block" style="width: 75%">
      <input type="checkbox" class="btn-check" bind:checked="{checked}" id="{id}" autocomplete="off" on:change={handleChanged}>
      <label class="btn btn-primary text-start d-block" for="{id}" style="border-radius: 0 0 15px 0;border: 2px solid #183153;">{name}

        {#if checked}
          <i class="fa-regular fa-circle-check float-end text-warning"></i>
        {/if}
      </label>
    </div>

    <button type="button" class="btn" style="border: transparent; background: transparent; width: 10%" on:click={toggleFilter}>
      <i class="fa-solid fa-filter text-danger"></i>
    </button>
  </div>
</Row>