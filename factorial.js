export const wasmInstantiate = async (wasmModuleUrl, importObject) => {

	let response = undefined;

	if (!importObject) {
		importObject = {
			env: {
				abort: () => console.log("Error!")
			}
		};
	}

	const instantiateModule = async () => {
		const response = await fetch("./factorial.wasm");
		const buffer = await response.arrayBuffer();
		const obj = await WebAssembly.instantiate(buffer, importObject);
		return obj;
	};

	response = await instantiateModule();
	return response;
};

const executeWasmFactorial = async () => {
	const wasmModule = await wasmInstantiate("./factorial.wasm");
	const factorialResult = wasmModule.instance.exports.factorial(7);
	document.getElementById("factorialResultId").innerHTML = `El resultado es: <span class="c-text--highlight">${factorialResult}</span>`;
}

executeWasmFactorial();