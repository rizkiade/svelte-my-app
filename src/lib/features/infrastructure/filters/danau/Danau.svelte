<script>
	import { advanced_filter_asset } from "../../../../../store/map.js";
</script>

Jenis :
<div class="text-center">
  <ul>
    {#each $advanced_filter_asset[2].jenis as row}
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