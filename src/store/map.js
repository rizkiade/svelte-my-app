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

const kabupaten = writable([]);
const kabupatenByProv = writable([]);
const kabupaten_visible = writable(false);

const kecamatanByKab = writable([]);
const kecamatan_visible = writable(false);

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
	wsLabel: undefined,
	dasId: undefined,
	dasLabel: undefined,
	provinsi: undefined,
	kabupaten: undefined,
	kecamatan: undefined,
	kelurahan: undefined
});

let filter_asset_sub = writable({
	3: {
		status_infrastructure: [
			{ value: "Tahap Rencana", name: "Tahap Rencana", checked: true },
			{ value: "Sedang Dibangun", name: "Sedang Dibangun", checked: true },
			{ value: "Sudah Terbangun", name: "Sudah Terbangun", checked: true },
			{ value: "", name: "Lainnya", checked: true }
		],
		manfaat_irigasi: null
	},
	7: {
		type_air_baku: [
			{ value: "INTAKE_SUNGAI", name: "INTAKE SUNGAI", checked: true },
			{ value: "TAMPUNGAN", name: "TAMPUNGAN", checked: true }
		]
	},
	14: {
		type_pos: [
			{ id: "pos_manual", name: "Manual", checked: true },
			{ id: "pos_otomatik", name: "Automatic", checked: true },
			{ id: "pos_telemetri", name: "Telemetry", checked: true },
			{ id: "pos_undefined", name: "Lainnya", checked: true }
		]
	},
	15: {
		type_pos: [
			{ id: "pos_manual", name: "Manual", checked: true },
			{ id: "pos_otomatik", name: "Automatic", checked: true },
			{ id: "pos_telemetri", name: "Telemetry", checked: true },
			{ id: "pos_undefined", name: "Lainnya", checked: true }
		]
	},
	16: {
		type_pos: [
			{ id: "pos_manual", name: "Manual", checked: true },
			{ id: "pos_otomatik", name: "Automatic", checked: true },
			{ id: "pos_telemetri", name: "Telemetry", checked: true },
			{ id: "pos_undefined", name: "Lainnya", checked: true }
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

// single feature only using search asset.
const search_features = writable({
	id: undefined,
	name: undefined,
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

const geo_features = writable({
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

const refIdOnly = writable(false);

export {
	mapKey,
	preloader,
	ws_visible,
	wsp_visible,
	ordo_visible,
	paramsKewenangan,
	pengelola,
	ws,
	wsFilter,
	onDasReq,
	das_visible,
	province,
	provinceByWs,
	prov_visible,
	kabupaten,
	kabupatenByProv,
	kabupaten_visible,
	kecamatanByKab,
	kecamatan_visible,
	paramsAdm,
	assets_features,
	count_asset,
	filter_asset,
	filter_asset_sub,
	selected_asset,
	search_features,
	geo_features,
	categoryProject,
	projectLayer,
	assetDetail,
	onAssetDetailReq,
	countProject,
	refIdOnly
};