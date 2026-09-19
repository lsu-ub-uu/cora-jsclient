/*
 *     Copied from https://github.com/noamtcohen/SlimJS
 */

function ShouldIBuyMilk() {
	var _dollars;
	var _pints;
	var _creditCard;

	this.setCashInWallet = function(dollars) {
		_dollars = dollars;
	};

	this.setPintsOfMilkRemaining = function(pints) {
		_pints = pints;
	};

	this.setCreditCard = function(valid) {
		_creditCard = "yes" === valid;
	};

	this.goToStore = function() {
		var ret = (_pints == 0 && (_dollars > 2 || _creditCard)) ? "yes" : "no";
		return ret;
	};
}

export { ShouldIBuyMilk };
