<script>
	import { Progress } from "sveltestrap";
</script>

<div class="card-detail-project">

  <div style="width: 100%">
    <ul class="mt-3">
      <li>
        <h5>Rencana : 0</h5>
      </li>
      <li>
        <h5>On Going : 0</h5>
      </li>
      <li>
        <h5>Selesai : 0</h5>
      </li>
    </ul>
    <h4>Total
      <span class="float-end">75%</span>
      <Progress value={75} class="mt-1" />
    </h4>
  </div>
</div>


<style>
    .card-detail-project {
        display: flex;
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
</style>