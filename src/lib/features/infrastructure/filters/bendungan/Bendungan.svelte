<script>
	import { FormGroup, Input, Label } from "sveltestrap";
	import { filter_asset_sub } from "../../../../../store/map.js";
</script>

Status Infrastructure :
<FormGroup class="mt-2">
  {#each $filter_asset_sub[3].status_infrastructure as row, i}
    <Input id="{i}" value="{row.value}" type="checkbox" label="{row.name}" bind:checked="{row.checked}" />
  {/each}

</FormGroup>

<FormGroup>
  <Label for="manfaatIrigasi">Manfaat Irigasi <em class="text-danger">(ha)</em></Label>
  <Input
    type="number"
    name="number"
    bind:value={$filter_asset_sub[3].manfaat_irigasi}
    id="manfaatIrigasi"
    placeholder=" value > 0"
  />
</FormGroup>