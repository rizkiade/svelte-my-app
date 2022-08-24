import { writable } from "svelte/store";

const panel = writable({
	left: undefined, // name component
	right: undefined // name panel
});
const rightWidth = writable(0);


export { panel, rightWidth };
