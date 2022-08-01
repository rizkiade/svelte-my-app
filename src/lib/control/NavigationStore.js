import { writable } from "svelte/store";

const panel = writable({
    left: undefined, // name component
});
const rightWidth = writable(60);


export { panel, rightWidth };
