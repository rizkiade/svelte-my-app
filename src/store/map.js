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


let assets_features = writable({
	"type": "FeatureCollection",
	"features": []
});
let count_asset = writable({});

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
const project_visible = writable(false);


export { mapKey, preloader, ws_visible, wsp_visible, paramsKewenangan, pengelola, ws, wsFilter, dasFilter, assets_features, count_asset, filter_asset, categoryProject, projectLayer, project_visible };