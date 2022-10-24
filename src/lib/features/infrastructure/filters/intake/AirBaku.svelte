<script>
	import { advanced_filter_asset } from "../../../../../store/map.js";
</script>

<div class="text-center">
  Object Asset :
  <ul>
    <li>
      <label>
        <input type="checkbox" name="sungai" bind:checked={$advanced_filter_asset[27].type_air_baku[0].checked}>
        <div class="icon-box">
          <i class="fa fa-bacon" aria-hidden="true"></i>
        </div>
        Sungai
      </label>
    </li>
    <li class="text-center">
      <label>
        <input type="checkbox" name="tampungan" bind:checked={$advanced_filter_asset[27].type_air_baku[1].checked}>
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