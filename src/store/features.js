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


export { ws_features, wsp_features, featureExistWSP, projectLayerSource, featureExist };