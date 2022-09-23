<script>
	import { FormGroup, Input } from "sveltestrap";
	import { filter_asset_sub } from "../../../../../store/map.js";
</script>

Status Infrastructure :
<FormGroup class="mt-2">
  {#each $filter_asset_sub[7].type_air_baku as row, i}
    <Input id="{i}" value="{row.value}" type="checkbox" label="{row.name}" bind:checked="{row.checked}" />
  {/each}

</FormGroup>