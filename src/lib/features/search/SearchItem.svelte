<script>
	export let item = undefined;
</script>

<div class="customItem">
  <div class="customItem_title">
    <i class="fa-solid fa-location-dot text-{item.coordinate === ' ' ? 'danger':'success'}"></i>
    <div class="customItem_name">{item.name}</div>
    <div class="customItem_tagline">{item.type_name}</div>
  </div>
</div>

<style>
    .customItem {
        display: flex;
        align-items: center;
        cursor: default;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .customItem_title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .customItem_name {
        display: inline-block;
        font-weight: 700;
        margin-right: 10px;
    }

    .customItem_tagline {
        display: inline-block;
    }
</style>

