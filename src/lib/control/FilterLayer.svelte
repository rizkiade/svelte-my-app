<script>
	import { Card, FormGroup, Input, Label, Offcanvas, Row } from "sveltestrap";
	import Select from "svelte-select";
	import { toasts } from "svelte-toasts";
	import Pengelola from "../features/pengelola/Pengelola.svelte";

	let isOpen = false;


	export { isOpen };
</script>

<Offcanvas isOpen={isOpen === 'layer'} header="Asset Filter" placement="start" backdrop={false} style="width: 300px; background: rgba(255, 255, 255, 0.5);">
  <Card body style="background: rgba(104, 129, 169, 0.35); padding-bottom: 0;">
    <Label class="text-center">Wilayah Kerja</Label>

    <Pengelola />
    
  </Card>
</Offcanvas>

<style>

    /*:global(.offcanvas) {*/
    /*    background: rgba(255, 255, 255, 0.5) !important;*/
    /*    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25) !important;*/
    /*    padding: 0 !important;*/
    /*}*/

    /*:global(.offcanvas-body) {*/
    /*    margin: auto !important;*/
    /*    padding: 1rem 0.3rem !important;*/
    /*}*/
</style>