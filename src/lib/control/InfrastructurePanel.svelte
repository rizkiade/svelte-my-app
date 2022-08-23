<script>
	import { Col, Row } from "sveltestrap";
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


  {#each infrastructure as { id, name, checked }}
    <Row>
      <Col xs="12" class="mt-2">
        <div class="btn-group d-inline-block" role="group" aria-label="Basic example">
          <button class="btn btn-warning" style="border-radius: 10px 0 0 10px" disabled><b>0</b></button>
          <button type="button" class="btn btn-primary"> {name}</button>
          <button type="button" class="btn btn-outline-dark" style="border: transparent"><i class="fa-solid fa-gear"></i></button>
        </div>
      </Col>
    </Row>

    <!--  <input type="checkbox" class="btn-check" id="{id}" bind:checked="{checked}" autocomplete="off" on:change={handleClick}>-->
    <!--  <label class="btn btn-outline-dark mt-2 text-start" for="{id}" style="border-radius: 13px">-->
    <!--    <Badge color="danger">0</Badge> {name}-->
    <!--  </label>-->
  {/each}
</div>