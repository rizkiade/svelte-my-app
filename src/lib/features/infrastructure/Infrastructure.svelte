<script>
	import { Row, Spinner } from "sveltestrap";
	import { slide } from "svelte/transition";
	import { InfrastructureApi } from "./infrastructure.d.ts";
	import { toasts } from "svelte-toasts";
	import { assets_features, count_asset } from "../../../store/map.js";

	const infrastructure = [
		{ id: 2, name: "Danau", checked: false },
		{ id: 3, name: "Bendungan", checked: false },
		{ id: 4, name: "Bendung", checked: false },
		{ id: 5, name: "Embung", checked: false },
		{ id: 6, name: "Air Tanah", checked: false },
		{ id: 7, name: "Air Baku", checked: false },
		{ id: 8, name: "Pengendali Sedimen", checked: false },
		{ id: 12, name: "Pengaman Pantai", checked: false },
		{ id: 13, name: "Posko Banjir", checked: false },
		{ id: 14, name: "Pos Curah Hujan", checked: false },
		{ id: 15, name: "Pos Duga Air", checked: false },
		{ id: 16, name: "Pos Klimatologi", checked: false }
	];

	const _api = new InfrastructureApi();

	let result;
	let handleClick = async (e) => {
		let _id = parseInt(e.target.id);


		if (e.target.checked) {
			e.target.disabled = true;

			let spinnerEl = document.querySelector(`#spinner_${_id}`);
			let labelEl = document.querySelector(`#label_${_id}`);

			spinnerEl["style"].display = "inline-block";
			labelEl["style"].display = "none";

			result = await _api.getAsset(_id);

			$assets_features.features = [...$assets_features.features, ...result.features];
			toasts.info(`${result.features.length} features add.`);
			e.target.disabled = false;

			spinnerEl["style"].display = "none";
			labelEl["style"].display = "inline";

		} else {
			$assets_features.features = $assets_features.features.filter(i => i.properties.type_id !== _id);
		}

	};

</script>

<div transition:slide>
  <div class="card" style="background-color: rgba(104,129,169,0.35)">
    <div class="card-header text-center" style="background-color: rgba(87,107,131,0.5)">List Infrastructure</div>
  </div>

  <div class="d-flex flex-column bd-highlight">
    {#each infrastructure as { id, name, checked, disabled }}
      <Row>
        <div class="btn-group mt-2" role="group" aria-label="Basic example">
          <button class="btn bg-warning" style="border-radius: 15px 0 0 0; border: none; width: 25%" disabled>
            <Spinner size="sm" style="display: none" id="spinner_{id}" />
            <b id="label_{id}">
              {$count_asset[id] ?? 0}
            </b>
          </button>
          <div class="d-inline-block" style="width: 75%">
            <input type="checkbox" class="btn-check" id="{id}" bind:checked="{checked}" autocomplete="off" on:change={handleClick}>
            <label class="btn btn-primary text-start d-block" for="{id}" style="border-radius: 0 0 15px 0">{name}
              <i class="fa-regular fa-circle-check float-end text-warning"></i>
            </label>
          </div>

          <button type="button" class="btn" style="border: transparent; background: transparent; width: 10%">
            <i class="fa-solid fa-filter text-danger"></i>
          </button>
        </div>
      </Row>

    {/each}
  </div>
</div>