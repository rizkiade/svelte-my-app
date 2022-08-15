let CapitalizeString = (string) => {
	console.log(string);
	return string.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
};

export { CapitalizeString };