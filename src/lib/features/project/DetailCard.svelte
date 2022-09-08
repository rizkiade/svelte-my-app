<script>
	import { Progress, Row } from "sveltestrap";
	import { slide } from "svelte/transition";
	import { countProject } from "../../../store/map.js";

</script>

<div class="card-detail-project" transition:slide>

  <Row>

    <div class="d-flex justify-content-evenly">
      <div class="card-mini">
        <i class="fa-solid fa-paper-plane text-primary" style="font-size: 25px"></i>
        <h5>Rencana : {$countProject.persiapan}</h5>
      </div>
      <div class="card-mini">
        <i class="fa-solid fa-bars-progress text-primary" style="font-size: 25px"></i>
        <h5>On Going : {$countProject.pelaksanaan}</h5>
      </div>
      <div class="card-mini">
        <i class="fa-solid fa-circle-check text-primary" style="font-size: 25px"></i>
        <h5>Selesai : {$countProject.selesai}</h5>
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
    <h5>Progress Tahun <span style="color: deeppink">{new Date().getFullYear()}</span> :
      <span class="float-end">60%</span>
      <Progress value={60} class="mt-1" />
    </h5>
  </Row>
</div>


<style>
    .card-detail-project {
        position: absolute;
        width: 80vh;
        height: 200px;
        background: rgba(255, 255, 255, 0.42);
        border-radius: 15px;
        bottom: 20px;
        left: 20%;
        z-index: 100;
        border: 2px solid darkgray;
        justify-content: space-between;
        padding: 10px;
    }

    .card-mini {
        display: inline-block;
        position: relative;
        width: 120px;
        padding: 5px;
        background: lightslategray;
        border-radius: 10px;
        text-align: center;
    }

</style>