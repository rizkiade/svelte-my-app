// For setContext & getContext
import { writable } from "svelte/store";

let mapKey = {};

const preloader = writable(false);

const ws_visible = writable(false);
const wsp_visible = writable(false);
const ordo_visible = writable({
	1: false,
	2: false,
	3: false,
	4: false
});
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

let selected_asset = writable({
	id: undefined,
	name: undefined,
	infrastructure_id: undefined,
	type: undefined,
	pengelola: undefined,
	coordinate: undefined,
	ws: undefined,
	das: undefined,
	provinsi: undefined,
	kabupaten: undefined,
	kecamatan: undefined,
	desa: undefined
});

const categoryProject = writable([]);
let projectLayer = writable(undefined);

let assetDetail = writable({
	technic: undefined,
	activity: [],
	status_data: []
});
let onAssetDetailReq = writable(false);


export { mapKey, preloader, ws_visible, wsp_visible, ordo_visible, paramsKewenangan, pengelola, ws, wsFilter, dasFilter, assets_features, count_asset, filter_asset, selected_asset, categoryProject, projectLayer, assetDetail, onAssetDetailReq };