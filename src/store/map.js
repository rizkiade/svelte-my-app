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

const onDasReq = writable(false);
const das_visible = writable(false);

const province = writable([]);
const provinceByWs = writable([]);
const prov_visible = writable(false);

let paramsAdm = writable({
	provId: undefined,
	kabId: undefined,
	kecId: undefined,
	desaId: undefined
});

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

let filter_asset_sub = writable({
	14: {
		type_pos: [
			{ id: "pos_manual", name: "Pos Manual", checked: true },
			{ id: "pos_otomatik", name: "Pos Automatic", checked: true },
			{ id: "pos_telemetri", name: "Pos Telemetry", checked: true },
			{ id: "pos_undefined", name: "Tanpa Ket", checked: true }
		]
	},
	15: {
		type_pos: [
			{ id: "pos_manual", name: "Pos Manual", checked: true },
			{ id: "pos_otomatik", name: "Pos Automatic", checked: true },
			{ id: "pos_telemetri", name: "Pos Telemetry", checked: true },
			{ id: "pos_undefined", name: "Tanpa Ket", checked: true }
		]
	},
	16: {
		type_pos: [
			{ id: "pos_manual", name: "Pos Manual", checked: true },
			{ id: "pos_otomatik", name: "Pos Automatic", checked: true },
			{ id: "pos_telemetri", name: "Pos Telemetry", checked: true },
			{ id: "pos_undefined", name: "Tanpa Ket", checked: true }
		]
	}
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


const countProject = writable({
	persiapan: 0,
	pelaksanaan: 0,
	selesai: 0
});

export { mapKey, preloader, ws_visible, wsp_visible, ordo_visible, paramsKewenangan, pengelola, ws, wsFilter, onDasReq, das_visible, province, provinceByWs, prov_visible, paramsAdm, assets_features, count_asset, filter_asset, filter_asset_sub, selected_asset, categoryProject, projectLayer, assetDetail, onAssetDetailReq, countProject };