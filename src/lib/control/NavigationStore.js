import { writable } from "svelte/store";

const panel = writable({
	left: undefined, // name component
	right: undefined // name panel
});
const rightWidth = writable(0);

const infrastructure = writable([
	{ id: 2, name: "Danau", checked: false },
	{ id: 3, name: "Bendungan", checked: false },
	{ id: 4, name: "Bendung", checked: false },
	{ id: 5, name: "Embung", checked: false },
	{ id: 6, name: "Air Tanah", checked: false },
	{ id: 7, name: "Air Baku", checked: false },
	{ id: 8, name: "Pengendali Sedimen", checked: false },
	{ id: 12, name: "Pengaman Pantai", checked: false },
	{ id: 13, name: "Posko Banjir", checked: false },
	{ id: 14, name: "Pos Curah Hujan", checked: false },
	{ id: 15, name: "Pos Duga Air", checked: false },
	{ id: 16, name: "Pos Klimatologi", checked: false }
]);


export { panel, rightWidth, infrastructure };
