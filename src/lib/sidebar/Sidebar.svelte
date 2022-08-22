<script>
	import { Offcanvas } from "sveltestrap";
	import NavButton from "../component/NavButton.svelte";
	import { panel } from "../control/NavigationStore.js";
	import { ws } from "../../store/map.js";

	let openNav = true;
	let current = undefined;

	function handleAction(event) {

		// isOpen = event.detail.text;
		current = event.detail.text;
		console.log(current);
		// console.log($ws);

	}

</script>


<!--<div class="sidebar-menu d-flex flex-column">-->

<!--    <NavButton src="/nav-icon/search.svg" alt="search" name="search" title="Search" on:action={handleAction}-->
<!--               active="{current === 'search'}"/>-->
<!--    <NavButton src="/nav-icon/layer-shadow.svg" alt="layer" name="{$panel.left === 'layer' ? 'layers':'layer'}"-->
<!--               title="Layer" on:action-->
<!--               active={ $panel.left === 'layer'}/>-->
<!--    <NavButton src="/nav-icon/maps-shadow.svg" alt="infrastructure" name="infrastructure" title="Infrastructure"-->
<!--               on:action={handleAction}-->
<!--               active="{current === 'infrastructure'}"/>-->
<!--</div>-->


<!--<style>-->
<!--    .sidebar-menu {-->
<!--        display: flex;-->
<!--        position: absolute;-->
<!--        align-items: center;-->
<!--        z-index: 99;-->
<!--        background: #ff3e00;-->
<!--        height: 50%;-->
<!--        width: 3.4vw;-->
<!--        right: 0;-->
<!--    }-->
<!--</style>-->


<Offcanvas isOpen="{openNav}" backdrop={false} placement="end"
           style="width: 50px; height: 80%; display: flex; align-items: center; background: rgba(255,255,255,0.42)" body={false}>

  <NavButton src="/nav-icon/search.svg" alt="search" name="search" title="Search" on:action={handleAction}
             active="{current === 'search'}" />
  <NavButton src="/nav-icon/layer-shadow.svg" alt="layer" name="{$panel.left === 'layer' ? 'layers':'layer'}"
             title="Layer" on:action
             active={ $panel.left === 'layer'} />
  <NavButton src="/nav-icon/maps-shadow.svg" alt="infrastructure" name="infrastructure" title="Infrastructure"
             on:action={handleAction}
             active="{current === 'infrastructure'}" />

</Offcanvas>
