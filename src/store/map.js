// For setContext & getContext
import { writable } from "svelte/store";

let mapKey = {};

const preloader = writable(false);

const ws_visible = writable(false);
const wsp_visible = writable(false);
let paramsKewenangan = writable(undefined);

const pengelola = writable([]);
const ws = writable([]);
const wsFilter = writable([]);
const dasFilter = writable([]);


// Store filter assets
let filter_asset = writable({
	pengelolaId: undefined,
	wsId: undefined,
	dasId: undefined,
	provinsi: undefined,
	kabupaten: undefined,
	kecamatan: undefined,
	kelurahan: undefined
});

const categoryProject = writable([]);
let projectLayer = writable(undefined);


export { mapKey, preloader, ws_visible, wsp_visible, paramsKewenangan, pengelola, ws, wsFilter, dasFilter, filter_asset, categoryProject, projectLayer };