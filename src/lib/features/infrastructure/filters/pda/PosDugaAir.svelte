<script>
	import { FormGroup, Input } from "sveltestrap";
	import { filter_asset_sub } from "../../../../../store/map.js";
</script>


Type Alat :
<FormGroup class="mt-2">
  {#each $filter_asset_sub[15].type_pos as row}
    <Input id="{row.id}" value="{row.id}" type="checkbox" label="{row.name}" bind:checked="{row.checked}" />
  {/each}
</FormGroup>