<script>
	import { FormGroup, Input, Label } from "sveltestrap";
	import { advanced_filter_asset } from "../../../../../store/map.js";
</script>

Status Infrastructure :

<div class="text-center">
  <ul>
    {#each $advanced_filter_asset[3].status_infrastructure as row}
      <li>
        <label>
          <input type="checkbox" name="{row.id}" bind:checked={row.checked}>
          <div class="icon-box">
            <i class="fa fa-circle-exclamation" aria-hidden="true"></i>
          </div>
          {row.name}
        </label>
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  @import "src/neumorphism.scss";
</style>

<!--<FormGroup class="mt-2">-->
<!--  {#each $advanced_filter_asset[3].status_infrastructure as row, i}-->
<!--    <Input id="{i}" value="{row.value}" type="checkbox" label="{row.name}" bind:checked="{row.checked}" />-->
<!--  {/each}-->
<!--</FormGroup>-->

<FormGroup>
  <Label for="manfaatIrigasi">Manfaat Irigasi <em class="text-danger">(ha)</em></Label>
  <Input
    type="number"
    name="number"
    bind:value={$advanced_filter_asset[3].manfaat_irigasi}
    id="manfaatIrigasi"
    placeholder=" value > 0"
  />
</FormGroup>