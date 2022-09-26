<script>
	import { filter_asset_sub } from "../../../../../store/map.js";
</script>

<div class="text-center">
  Status Infrastructure :
  <ul>
    <li>
      <label>
        <input type="checkbox" name="sungai" bind:checked={$filter_asset_sub[7].type_air_baku[0].checked}>
        <div class="icon-box">
          <i class="fa fa-bacon" aria-hidden="true"></i>
        </div>
        Sungai
      </label>
    </li>
    <li class="text-center">
      <label>
        <input type="checkbox" name="tampungan" bind:checked={$filter_asset_sub[7].type_air_baku[1].checked}>
        <div class="icon-box">
          <i class="fa fa-whiskey-glass" aria-hidden="true"></i>
        </div>
        Tampungan
      </label>
    </li>
  </ul>

</div>

<style lang="scss">
  @import "src/neumorphism.scss";
</style>