<script>
	import { Col, Container, Offcanvas, Row } from "sveltestrap";
	import NavButton from "../component/NavButton.svelte";
	import { panel, rightWidth } from "../control/NavigationStore.js";
	import SearchPanel from "../control/SearchPanel.svelte";
	import InfrastructurePanel from "../control/InfrastructurePanel.svelte";
	import ProjectPanel from "../control/ProjectPanel.svelte";

	let current = undefined;

	function handleAction(event) {
		current = event.detail.text;
		$panel.right = current;
		console.log(current);

		switch (current) {
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

</script>


<Offcanvas isOpen="{true}" backdrop={false} placement="end"
           style="width: {$rightWidth}px; height: 100%; background: rgba(255,255,255,0.42); transition: width 0.25s; border-radius: 15px 0px 0px 15px; overflow:hidden">

  <Container>

    <Row class="justify-content-center">

      {#if $panel.right}
        <Col class="mt-2 me-lg-5 p-0">

          {#if $panel.right === 'search'}
            <SearchPanel />
          {/if}

          {#if $panel.right === 'infrastructure'}
            <InfrastructurePanel />
          {/if}

          {#if $panel.right === 'project'}
            <ProjectPanel />
          {/if}
        </Col>

      {/if}

    </Row>

  </Container>

</Offcanvas>


<Offcanvas isOpen="{true}" backdrop={false} placement="end"
           style="width: 55px; height: 40%; align-items: center; background: {$panel.right ? 'transparent': 'rgba(255,255,255,0.42)'} ; transition: width 0.25s; border-radius: 15px 0px 0px 15px; {$panel.right ? 'border: none': ''}">
  <Container>

    <Row class="justify-content-evenly">
      <Col>
        <NavButton src="/nav-icon/search.svg" alt="search" name="{current === 'search' ? 'searches': 'search'}" title="Search" on:action={handleAction}
                   active="{current === 'search'}" />
        <NavButton src="/nav-icon/layer-shadow.svg" alt="layer" name="{$panel.left === 'layer' ? 'layers':'layer'}"
                   title="Layer" on:action active={ $panel.left === 'layer'} />
        <NavButton src="/nav-icon/maps-shadow.svg" alt="infrastructure" name="{current === 'infrastructure' ? 'infrastructures': 'infrastructure'}" title="Infrastructure"
                   on:action={handleAction}
                   active="{current === 'infrastructure' }" />
        <NavButton src="/nav-icon/list-shadow.svg" alt="project" name="{current === 'project' ? 'projects': 'project'}" title="Project"
                   on:action={handleAction}
                   active="{current === 'project' }" />
      </Col>
    </Row>

  </Container>
</Offcanvas>
