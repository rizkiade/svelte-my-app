<script>
	import { Row } from "sveltestrap";
	import { slide } from "svelte/transition";


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


	let handleClick = async (e) => {
		let _id = parseInt(e.target.id);
		let checked = e.target.checked;
	};
</script>

<div transition:slide>
  <div class="card" style="background-color: rgba(104,129,169,0.35)">
    <div class="card-header text-center" style="background-color: rgba(87,107,131,0.5)">Geo Information</div>
  </div>

  <div class="d-flex flex-column bd-highlight">
    {#each infrastructure as { id, name, checked }}
      <Row>
        <div class="btn-group mt-2" role="group" aria-label="Basic example">
          <button class="btn bg-warning" style="border-radius: 35px 0 0 5px; width: 25%" disabled><b>0</b></button>
          <div class="d-inline-block" style="width: 75%">
            <input type="checkbox" class="btn-check" id="{id}" bind:checked="{checked}" autocomplete="off" on:change={handleClick}>
            <label class="btn btn-primary text-start d-block" for="{id}" style="border-radius: 0 5px 35px 0">{name}
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