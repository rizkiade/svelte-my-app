<script>
	import { Progress, Row } from "sveltestrap";
	import { slide } from "svelte/transition";
	import { countProject } from "../../../store/map.js";
	import { createEventDispatcher } from "svelte";

	const dispatch = createEventDispatcher();

	function openDetail(param) {
		dispatch("detail", {
			value: param
		});
	}

	export let countProjectYear;

</script>

<div class="card-detail-project" transition:slide>

  <Row>

    <div class="d-flex justify-content-evenly">
      <div class="card-mini">
        <i class="fa-solid fa-paper-plane mt-1" style="font-size: 25px; color: #d7207f"></i>
        <h5><a class="btn" on:click={()=>openDetail('persiapan')}>Rencana : {$countProject.persiapan}</a></h5>
      </div>
      <div class="card-mini">
        <i class="fa-solid fa-arrow-trend-up text-primary mt-1" style="font-size: 25px"></i>
        <h5><a class="btn" on:click={()=>openDetail('pelaksanaan')}>On Going : {$countProject.pelaksanaan}</a></h5>
      </div>
      <div class="card-mini">
        <i class="fa-solid fa-location-dot mt-1" style="font-size: 25px; color: #91ec0a"></i>
        <h5><a class="btn" on:click={()=>openDetail('selesai')}>Selesai : {$countProject.selesai}</a></h5>
      </div>
    </div>
  </Row>

  <Row class="mt-3">
    <h5>Total Progress :
      <span class="float-end">75%</span>
      <Progress value={75} class="mt-1" />
    </h5>
  </Row>

  <Row class="mt-1">
    <h5>Progress Tahun <span style="color: deeppink">{new Date().getFullYear()} <a class="btn d-inline p-0" on:click={()=>openDetail(new Date().getFullYear())}>({countProjectYear} Asset)</a></span> :
      <span class="float-end">60%</span>
      <Progress value={60} class="mt-1" />
    </h5>
  </Row>
</div>


<style>
    .card-detail-project {
        position: fixed;
        width: 70vh;
        height: 200px;
        background: rgba(255, 255, 255, 0.42);
        border-radius: 15px;
        bottom: 20px;
        left: 25%;
        border: 2px solid darkgray;
        justify-content: space-between;
        padding: 10px;
    }

    .card-mini {
        display: inline-block;
        position: relative;
        width: 120px;
        padding: 5px;
        background: rgba(87, 107, 131, 0.6);
        background: linear-gradient(0deg, rgba(87, 107, 131, 0.6) 0%, rgba(201, 199, 199, 1) 100%);
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.3)
    }

</style>