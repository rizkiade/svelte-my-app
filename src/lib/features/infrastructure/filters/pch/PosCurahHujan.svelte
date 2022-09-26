<script>
	import { filter_asset_sub } from "../../../../../store/map.js";

	const icon = {
		"pos_manual": "fa-m",
		"pos_otomatik": "fa-a",
		"pos_telemetri": "fa-t",
		"pos_undefined": "fa-circle-exclamation"
	};
</script>


<div class="text-center">
  <ul>
    {#each $filter_asset_sub[14].type_pos as row}
      <li>
        <label>
          <input type="checkbox" name="{row.id}" bind:checked={row.checked}>
          <div class="icon-box">
            <i class="fa {icon[row.id]}" aria-hidden="true"></i>
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