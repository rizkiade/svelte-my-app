<script>
	import { Card } from "sveltestrap";

	export let display;
	export let name;
	export let type;
	export let kewenangan;
	export let status_lintas;
	export let kode_ws;
	export let kode_das;
	export let luas;
	export let status;

</script>


<Card id="card-popup" class="text-warning" style="position: absolute;
        display: {display};
        z-index: 1;
        background-color: rgba(28, 45, 65, 0.7);
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
        min-width: 220px;
        border-radius: 10px;
        border: 1.5px solid #cccccc;
        padding: 15px;">
  {#if type}
    ({type})
  {/if}

  {name}
  {#if kode_das}<span class="text-info" style="font-size: 10px;">#{kode_das}</span>{/if}
  {#if kode_ws}<span class="text-info" style="font-size: 10px;">#{kode_ws}</span>{/if}

  {#if status_lintas}
    <p class="text-light" style="font-size: 10px;"><span class="text-warning" style="font-size: 10px;">{kewenangan}</span> {status_lintas}</p>
  {/if}

  {#if kode_das || kode_ws}
    <p class="text-light" style="font-size: 10px;">Luas : {luas.toLocaleString('id-ID')} (Ha)</p>
  {/if}

  {#if status}
    <em>({status} - 0% ) </em>
  {/if}
</Card>

