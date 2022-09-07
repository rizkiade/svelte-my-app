import { writable } from "svelte/store";

// currently show WS & WSP
const ws_features = writable({
	type: "FeatureCollection", features: []
});

let wsp_features = writable({
	type: "FeatureCollection", features: []
});
// End currently show WS & WSP


// Master WSP Store after request complete.
let featureExistWSP = writable({});

// Project Source
let projectLayerSource = writable([]);

// Sungai & DAS stored in above variable
let featureExist = writable({});

// Features Administratif
let featureExistAdm = writable({});

let prov_features = writable({
	type: "FeatureCollection", features: []
});

let kab_features = writable({
	type: "FeatureCollection", features: []
});

let kec_features = writable({
	type: "FeatureCollection", features: []
});

let desa_features = writable({
	type: "FeatureCollection", features: []
});


export { ws_features, wsp_features, featureExistWSP, projectLayerSource, featureExist, featureExistAdm, prov_features, kab_features };