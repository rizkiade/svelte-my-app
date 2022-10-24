<script>
	import { slide } from "svelte/transition";
	import { Spinner } from "sveltestrap";
	import { assetDetail, onAssetDetailReq, selected_asset } from "../../../store/map.js";
	import AssetInformation from "./AssetInformation.svelte";


	$: if ($selected_asset.id !== undefined) {
		$onAssetDetailReq = true;
		// https://gis.pusair-pu.go.id/api/v1/infrastructure/pos/0ce22cf0-8aac-49bc-99f4-be085bfd2782
		let _url_type = `asset/${$selected_asset.id}`;
		if ([14, 15, 16].includes($selected_asset.infrastructure_id)) {
			_url_type = `pos/${$selected_asset.id}?infId=${$selected_asset.infrastructure_id}`;
		}

		fetch(`${import.meta.env.VITE_GIS_API}/infrastructure/${_url_type}`).then(response => response.json()).then(data => {
			$assetDetail = data;
			onAssetDetailReq.set(false);
		});
	}

</script>


<div transition:slide>

  <AssetInformation />

  {#if [14, 15, 16].includes($selected_asset.infrastructure_id)}

    {#if $onAssetDetailReq}
      <h5 class="text-center mt-5 mb-5">
        <Spinner color="primary" type="grow" />
        Loading...
      </h5>
    {:else}
      {#each $assetDetail.status_data as row}

        <div class="card text-center mt-2">
          <div class="card-header text-bg-primary">
            {row.jenis_pos}
          </div>
          <div class="card-body">
            <h5 class="card-title">{row.name}</h5>
            <div class="row">
              <div class="col-6">
                TMA Sebelumnya : <i class="fa-solid fa-caret-right text-warning blinking"></i><i class="fa-solid fa-caret-right text-warning blinking"></i> {parseInt(row.tma_before)}
              </div>
              <div class="col-6">
                TMA Terakhir : <i class="fa-solid fa-caret-up text-success blinking"></i> {parseInt(row.tma_after)}
              </div>
            </div>
          </div>
          <div class="card-footer text-muted">
            time_update 2 days ago
          </div>
        </div>

      {/each}
    {/if}

  {/if}


  <!--    <TabContent>-->
  <!--      <TabPane tabId="kegiatan" tab="Kegiatan">-->
  <!--        {#if $onAssetDetailReq}-->
  <!--          <h5 class="text-center mt-5 mb-5">-->
  <!--            <Spinner color="primary" type="grow" />-->
  <!--            Loading...-->
  <!--          </h5>-->
  <!--        {:else}-->
  <!--          <ul class="mt-4">-->
  <!--            {#if $assetDetail.activity.length !== 0}-->
  <!--              {#each $assetDetail.activity as item}-->
  <!--                <li>{JSON.parse(item).tahun + ' : ' + JSON.parse(item).aktivitas}</li>-->
  <!--              {/each}-->
  <!--            {/if}-->
  <!--          </ul>-->
  <!--        {/if}-->
  <!--      </TabPane>-->
  <!--    </TabContent>-->
  <!--    -->

</div>

<style>

    .blinking {
        animation: animate 1.5s linear infinite;
    }

    @keyframes animate {
        0% {
            opacity: 0;
        }

        50% {
            opacity: 0.7;
        }

        100% {
            opacity: 0;
        }
    }
</style>