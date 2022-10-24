<script>
	import { Col, Container, Offcanvas, Row } from "sveltestrap";
	import NavButton from "../component/NavButton.svelte";
	import { panel, rightWidth } from "../control/NavigationStore.js";
	import Infrastructure from "../features/infrastructure/Infrastructure.svelte";
	import Project from "../features/project/Project.svelte";
	import { selected_asset } from "../../store/map.js";
	import DetailAsset from "../features/detail/DetailAsset.svelte";
	import DetailProject from "../features/project/DetailProject.svelte";
	import Search from "../features/search/Search.svelte";


	function handleAction(event) {
		$panel.right = event.detail.text;

		switch (event.detail.text) {
			case "search":
			case "infrastructure":
				rightWidth.set(400);
				break;
			case "project":
				rightWidth.set(300);
				break;
			default:
				rightWidth.set(0);
				$panel.right = undefined;
				break;
		}
	}

	$: if ($selected_asset.id !== undefined) {
		rightWidth.set(450);
	} else {
		if ($panel.right === undefined) {
			rightWidth.set(0);
		} else {
			rightWidth.set(400);
		}
	}

</script>


<Offcanvas isOpen="{true}" backdrop={false} placement="end"
           style="width: {$rightWidth}px; height: 100%; background: rgba(255,255,255,0.42); transition: width 0.25s; border-radius: 15px 0px 0px 15px; overflow:hidden">

  <Container>

    <Row class="justify-content-center">

      {#if $panel.right}
        <Col class="mt-2 me-lg-5 p-0">

          {#if $panel.right === 'search'}
            <Search />
          {/if}

          {#if $panel.right === 'infrastructure'}
            {#if $selected_asset.id !== undefined}
              <DetailAsset />
            {:else }
              <Infrastructure />
            {/if}
          {/if}

          {#if $panel.right === 'project'}
            {#if $selected_asset.id !== undefined}
              <DetailProject />
            {:else }
              <Project />
            {/if}
          {/if}
        </Col>

      {/if}

    </Row>

  </Container>

</Offcanvas>


<!--Navigasi button-->
<Offcanvas isOpen="{true}" backdrop={false} placement="end"
           style="width: 55px; height: 40%; align-items: center; background: {$panel.right ? 'transparent': 'rgba(255,255,255,0.42)'} ; transition: width 0.25s; border-radius: 15px 0px 0px 15px; {$panel.right ? 'border: none': ''}">
  <Container>

    <Row class="justify-content-evenly">
      <Col>
        <NavButton src="/nav-icon/search.svg" alt="search" name="{$panel.right === 'search' ? 'searches': 'search'}" title="Search" on:action={handleAction}
                   active="{$panel.right === 'search'}" />
        <NavButton src="/nav-icon/layer-shadow.svg" alt="layer" name="{$panel.left === 'layer' ? 'layers':'layer'}"
                   title="Layer" on:action active={ $panel.left === 'layer'} />
        <NavButton src="/nav-icon/maps-shadow.svg" alt="infrastructure" name="{$panel.right === 'infrastructure' ? 'infrastructures': 'infrastructure'}" title="Infrastructure"
                   on:action={handleAction}
                   active="{$panel.right === 'infrastructure' }" />
        <NavButton src="/nav-icon/list-shadow.svg" alt="project" name="{$panel.right === 'project' ? 'projects': 'project'}" title="Project"
                   on:action={handleAction}
                   active="{$panel.right === 'project' }" />
      </Col>
    </Row>

  </Container>
</Offcanvas>
