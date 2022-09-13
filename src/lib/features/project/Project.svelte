<script>
	import { Badge, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader, Progress, Row, Table } from "sveltestrap";
	import { slide } from "svelte/transition";
	import { ProjectApi } from "./project.d.ts";
	import { onMount } from "svelte";
	import { categoryProject, projectLayer } from "../../../store/map.js";
	import { projectLayerSource } from "../../../store/features.js";
	import ListLoading from "../../component/loader/ListLoading.svelte";
	import { toasts } from "svelte-toasts";
	import DetailCard from "./DetailCard.svelte";

	const category = [];

	const _api = new ProjectApi();

	onMount(async () => {
		let res = await _api.getListProject();

		if (category.length === 0)
			res.map(val => {
				JSON.parse(val.sub).map(vsub => category.push({ "id": vsub.id, "name": vsub.name, "checked": false }));
			});

	});

	let handleClick = async (e) => {
		let _id = e.target.id;
		let checked = e.target.checked;

		let cat_index = category.find(i => i.id === _id);

		if (checked) {

			// selected_asset_id.push(_id);

			// disabled = true;
			// let result = await getAsset(_id);
			// disabled = false;

			cat_index.checked = true;
			toasts.info(`features add.`);

			// assets.features = [...assets.features, ...result.features];

		} else {
			cat_index.checked = false;
			toasts.info(`removed.`);

			// selected_asset_id = selected_asset_id.filter(i => i !== _id);
			// assets.features = assets.features.filter(i => selected_asset_id.includes(i.properties.type_id));
		}

	};

	let layerSwitch = (e) => {
		let val = e.target.value;

		let qs = "format=json";
		if (e.target.checked) {
			projectLayer.set(val);
			toasts.info("Loaded Data");

			if (val !== "0") {
				qs = `ctgPId=${val}&${qs}`;
			}
			_api.getProject(qs).then(result => {
				projectLayerSource.set(result);
				listProjects = [...result];
			});

		} else {
			projectLayer.set(undefined);
			projectLayerSource.set([]);
		}
	};

	let open = false;
	let fullscreen = true;

	let openDetail = (id) => {
		if (id !== $projectLayer) {
			toasts.error("Tidak dapat menampilkan data, Layer non aktif");
		} else {
			listProjects = [...$projectLayerSource];
			open = true;
		}
	};

	let countProject = [];
	let countProjectYear = 0;
	let countProjectSub = () => {
		countProject = [];
		countProjectYear = 0;
		$projectLayerSource.map(i => {

			if (i.date_end) {
				let year_end = new Date(i.date_end).getFullYear();
				if (new Date().getFullYear() === year_end) {
					countProjectYear += 1;
				}
			}

			if (i.category_sub_id in countProject) {
				countProject[i.category_sub_id] += 1;
			} else {
				countProject[i.category_sub_id] = 1;
			}
		});
	};

	$:countProjectSub($projectLayerSource);

	let listProjects = [];

	function handleAction(event) {
		if ($projectLayer === undefined) {
			toasts.error("Tidak dapat menampilkan data, Layer non aktif");
		} else {
			if (typeof event.detail.value === "number") {
				listProjects = $projectLayerSource.filter(project => {
					if (project.date_end) {
						return new Date(project.date_end).getFullYear() === new Date().getFullYear();
					}
				});
			} else {
				listProjects = $projectLayerSource.filter(project => project.status === event.detail.value.toUpperCase());
			}
			open = event.detail.value;
		}
	}

</script>


<div transition:slide>
  <div class="card" style="background-color: rgba(104,129,169,0.35)">
    <div class="card-header text-center bg-card-title">Project Information</div>
  </div>


  {#if $categoryProject.length === 0}
    <div class="mt-2">
      <ListLoading />
      <ListLoading />
      <ListLoading />
    </div>
  {:else}
    <div class="d-flex flex-column bd-highlight">

      {#each $categoryProject as { id, category, sub }}

        <Input class="mt-4 text-center" type="switch" label="{category}" value="{id}" on:change={layerSwitch} checked={$projectLayer === id} />
        <hr class="mt-0">

        {#each JSON.parse(sub) as { id, name }}

          <Row>
            <div class="btn-group mt-1" role="group" aria-label="Button Project Group">
              <button class="btn" style="border-radius: 15px 0 0 0; border: 2px solid #183153; width: 25%; background: #ffcf23"><b>{countProject[id] ?? 0}</b></button>
              <div class="d-inline-block" style="width: 75%">
                <input type="checkbox" class="btn-check" id="{id}" autocomplete="off" on:change={handleClick}>
                <label class="btn btn-primary text-start d-block" for="{id}" style="border-radius: 0 0 15px 0; border: 2px solid #183153">{name}
                  <i class="fa-regular fa-circle-check float-end text-warning"></i>
                </label>
              </div>
            </div>
          </Row>

        {/each}

        {#if $projectLayer === id}
          <button class="btn mt-2 btn-outline-primary" on:click="{()=> openDetail(id)}"> Detail <i class="fa-solid fa-arrow-up-right-from-square"></i></button>
        {/if}

      {/each}

      <Input class="mt-4 text-center" type="switch" label="KEGIATAN SUMBER DAYA AIR" value="0" on:change={layerSwitch} checked={$projectLayer === 0} />
      <hr class="mt-0">
      {#if $projectLayer === '0'}
        <button class="btn mt-2 btn-outline-primary" on:click="{()=> openDetail('0')}"> Detail <i class="fa-solid fa-arrow-up-right-from-square"></i></button>
      {/if}
    </div>

  {/if}

</div>

<DetailCard on:detail={handleAction} {countProjectYear} />

<Modal isOpen={open} {fullscreen}>
  <ModalHeader>List Project <span style="font-size: 10pt; font-style: italic">(total: {listProjects.length})</span></ModalHeader>
  <ModalBody>
    <Table>
      <thead>
      <tr>
        <th>#</th>
        <th>Asset Name</th>
        <th class="text-center">Progress</th>
        <th class="text-center">Status</th>
        <th class="text-center">Budget</th>
        <th class="text-end">Waktu Pelaksanaan(H)</th>
      </tr>
      </thead>
      <tbody>

      {#each listProjects as item }

        <tr>
          <th scope="row">{item.no}</th>
          <td>
            {#if item.coordinate.length > 2}
              <i class="fa-solid fa-location-dot"></i>
            {/if}
            {item.name.toUpperCase()}
            {#if item.name.toUpperCase().includes('KASKADE') }
              <Badge pill color="success">KASKADE</Badge>
            {/if}
          </td>
          <td>
            <Progress value={Math.floor(Math.random() * 100)}>25%</Progress>
          </td>
          <td class="text-center">{item.status !== null ? item.status.toUpperCase() : '-'}</td>
          <td class="text-end">{new Intl.NumberFormat(`id-ID`, { currency: `IDR`, style: 'currency' }).format(item.cost)}</td>
          <td class="text-end">{`${item.date_begin}  s.d  ${item.date_end}` }</td>
        </tr>

      {/each}

      </tbody>
    </Table>
  </ModalBody>
  <ModalFooter>
    <Button color="danger" on:click={() => open = false}>Close</Button>
  </ModalFooter>
</Modal>