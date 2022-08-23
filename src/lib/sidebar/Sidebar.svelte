<script>
	import { Alert, Card, Col, Container, Input, Offcanvas, Row } from "sveltestrap";
	import NavButton from "../component/NavButton.svelte";
	import { panel, rightWidth } from "../control/NavigationStore.js";
	import Select from "svelte-select";

	let current = undefined;

	const optionIdentifier = "id";
	const getOptionLabel = (option) => option.name;
	const getSelectionLabel = (option) => option.name;

	function handleAction(event) {
		current = event.detail.text;
		// console.log(current);

		switch (current) {
			case "search":
			case "infrastructure":
				$panel.right = current;
				rightWidth.set(400);
				break;
			default:
				rightWidth.set(55);
				$panel.right = undefined;
				break;
		}

	}

</script>


<Offcanvas isOpen="{true}" backdrop={false} placement="end"
           style="width: {$rightWidth}px; height: 80%; display: flex; align-items: center; background: rgba(255,255,255,0.42); transition: width 0.25s; border-radius: 15px 0px 0px 15px; " body={false}>

  <Container>
    <Row class="justify-content-evenly">

      <Col xs="auto" class="text-center">
        <NavButton src="/nav-icon/search.svg" alt="search" name="{current === 'search' ? 'searches': 'search'}" title="Search" on:action={handleAction}
                   active="{current === 'search'}" />
        <NavButton src="/nav-icon/layer-shadow.svg" alt="layer" name="{$panel.left === 'layer' ? 'layers':'layer'}"
                   title="Layer" on:action active={ $panel.left === 'layer'} />
        <NavButton src="/nav-icon/maps-shadow.svg" alt="infrastructure" name="{current === 'infrastructure' ? 'infrastructures': 'infrastructure'}" title="Infrastructure"
                   on:action={handleAction}
                   active="{current === 'infrastructure' }" />
      </Col>

      {#if $panel.right}
        <Col xs="10" class="mt-2 p-0">

          <slot />

        </Col>

      {/if}

    </Row>
  </Container>

</Offcanvas>
