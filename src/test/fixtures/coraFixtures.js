import CORA from "../../main/webapp/script/aCoraNameSpace.js";
import CORAFIXTURES from "./aCoraFixturesNameSpace.js";

const coraFixtures = CORAFIXTURES;

coraFixtures.coraData = function() {
		var firstChild = {
			"name" : "textVariableId",
			"value" : "A Value",
			"repeatId" : "1"
		};

		var secondChild = {
			"name" : "textVariableId",
			"value" : "A Value2",
			"repeatId" : "2"
		};

		var dataOneLevel = {
			"name" : "groupIdOneTextChild",
			"children" : [ firstChild, secondChild ]
		};

		var coraData = CORA.coraData(dataOneLevel);

		function setTrams() {

		}

		function getStuff() {
			return JSON.stringify(coraData.getFirstChildByNameInData("textVariableId"));
		}

		return Object.freeze({
			setTrams : setTrams,
			getStuff : getStuff
		});
	};

export default CORAFIXTURES;
