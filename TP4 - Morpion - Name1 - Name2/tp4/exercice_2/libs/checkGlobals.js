let checkGlobals = (function() {
	let getGlobalNumbers = () => Object.keys(window).length;
	let globalsNumbers = getGlobalNumbers();
	return function() {
		return getGlobalNumbers() - globalsNumbers;
	}
})();
