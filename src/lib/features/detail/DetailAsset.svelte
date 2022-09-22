<script>
	import { slide } from "svelte/transition";
	import { Card, Carousel, CarouselControl, CarouselIndicators, CarouselItem, Spinner, TabContent, TabPane } from "sveltestrap";
	import { assetDetail, onAssetDetailReq, selected_asset } from "../../../store/map.js";
	import AssetInformation from "./AssetInformation.svelte";


	const itemsImage = [
		"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
		"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E",
		"data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
	];
	let activeIndex = 0;

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

  <Card style="background: rgba(104,129,169,0.35)" class="mt-3">

    <TabContent>
      <TabPane tabId="kegiatan" tab="Kegiatan">
        {#if $onAssetDetailReq}
          <h5 class="text-center mt-5 mb-5">
            <Spinner color="primary" type="grow" />
            Loading...
          </h5>
        {:else}
          <ul class="mt-4">
            {#if $assetDetail.activity.length !== 0}
              {#each $assetDetail.activity as item}
                <li>{JSON.parse(item).tahun + ' : ' + JSON.parse(item).aktivitas}</li>
              {/each}
            {/if}
          </ul>
        {/if}
      </TabPane>
      <TabPane tabId="media" tab="Media">
        <Carousel {itemsImage} bind:activeIndex>

          <CarouselIndicators bind:activeIndex {itemsImage} />
          <div class="carousel-inner">
            {#each itemsImage as item, index}
              <CarouselItem bind:activeIndex itemIndex={index}>
                <img src={item} class="d-block w-100" alt={`${item} ${index + 1}`} />
              </CarouselItem>
            {/each}
          </div>

          <CarouselControl direction="prev" bind:activeIndex {itemsImage} />
          <CarouselControl direction="next" bind:activeIndex {itemsImage} />
        </Carousel>

      </TabPane>
      <TabPane tabId="project" tab="Project">
        <h5 class="text-center mt-5 mb-5">Whoops!! Fitur belum tersedia</h5>
      </TabPane>
      <TabPane tabId="files" tab="Files">
        <h5 class="text-center mt-5 mb-5">Whoops!! Fitur belum tersedia</h5>
      </TabPane>

      {#if [14, 15, 16].includes($selected_asset.infrastructure_id)}
        <TabPane tabId="status_data" tab="Status Data">

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

        </TabPane>
      {/if}
    </TabContent>
  </Card>

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