/*
 * Copyright 2016, Uppsala University Library
 * Copyright 2016, 2017, 2018 Olov McKie
 *
 * This file is part of Cora.
 *
 *     Cora is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     Cora is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with Cora.  If not, see <http://www.gnu.org/licenses/>.
 */
"use strict";
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.attachedPVarFactory = function(metadataProvider, pubSub, textProvider, jsBookkeeper,
			fixture, pVarViewFactory) {
		var factor = function(path, metadataIdUsedInData, pVarPresentationId) {
			var cPVarPresentation = CORA.coraData(metadataProvider
					.getMetadataById(pVarPresentationId));
			var dependencies = {
				"clientInstanceProvider" : CORATEST.clientInstanceProviderSpy(),
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"jsBookkeeper" : jsBookkeeper,
				"pVarViewFactory" : pVarViewFactory
			};
			var spec = {
				"path" : path,
				"metadataIdUsedInData" : metadataIdUsedInData,
				"cPresentation" : cPVarPresentation
			};
			var pVar = CORA.pVar(dependencies, spec);
			return {
				spec : spec,
				pVar : pVar,
				fixture : fixture,
				metadataProvider : metadataProvider,
				pubSub : pubSub,
				textProvider : textProvider,
				jsBookkeeper : jsBookkeeper,
				dependencies : dependencies
			};

		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.testVariableSubscription = function(attachedPVar, assert, path, disablePath) {
		var subscriptions = attachedPVar.pubSub.getSubscriptions();
		assert.deepEqual(subscriptions.length, 3);

		var firstSubsription = subscriptions[0];
		assert.strictEqual(firstSubsription.type, "setValue");
		assert.deepEqual(firstSubsription.path, path);
		var pVar = attachedPVar.pVar;
		assert.ok(firstSubsription.functionToCall === pVar.handleMsg);

		var secondSubsription = subscriptions[1];
		assert.strictEqual(secondSubsription.type, "validationError");
		assert.deepEqual(secondSubsription.path, path);
		var pVar = attachedPVar.pVar;
		assert.ok(secondSubsription.functionToCall === pVar.handleValidationError);
		
		var disableSubsription = subscriptions[2];
		assert.strictEqual(disableSubsription.type, "disable");
		assert.stringifyEqual(disableSubsription.path, disablePath);
		assert.ok(disableSubsription.functionToCall === pVar.disableVar);

	};

	coraTest.testVariableMetadata = function(attachedPVar, assert) {
		var pVar = attachedPVar.pVar;
		assert.strictEqual(pVar.getText(), "Exempel textvariabel");
		assert.strictEqual(pVar.getDefText(), "Detta är en exempeldefinition "
				+ "för en textvariabel.");
		assert.strictEqual(pVar.getRegEx(), "^[0-9A-Öa-ö\\s!*.]{2,50}$");
	};

	coraTest.testJSBookkeeperNoCall = function(jsBookkeeper, assert) {
		var dataArray = jsBookkeeper.getDataArray();
		assert.strictEqual(dataArray.length, 0);
	};
	coraTest.testJSBookkeeperOneCallWithValue = function(jsBookkeeper, value, assert) {
		var dataArray = jsBookkeeper.getDataArray();
		assert.strictEqual(dataArray.length, 1);
		assert.strictEqual(dataArray[0].data, value);
	};
	return coraTest;
}(CORATEST || {}));

QUnit.module("presentation/pVarTest.js", {
	beforeEach : function() {
		this.fixture = document.getElementById("qunit-fixture");
		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.jsBookkeeper = CORATEST.jsBookkeeperSpy();
		this.pVarViewFactory = CORATEST.standardFactorySpy("pVarViewSpy");
		this.pVarFactory = CORATEST.attachedPVarFactory(this.metadataProvider, this.pubSub,
				this.textProvider, this.jsBookkeeper, this.fixture, this.pVarViewFactory);
	},
	afterEach : function() {
	}
});

QUnit.test("testGetDependencies", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	assert.strictEqual(attachedPVar.pVar.getDependencies(), attachedPVar.dependencies);
});

QUnit.test("testGetSpec", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	assert.strictEqual(attachedPVar.pVar.getSpec(), attachedPVar.spec);
});

QUnit.test("testInitText", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	assert.strictEqual(attachedPVar.pVar.type, "pVar");

	CORATEST.testVariableSubscription(attachedPVar, assert, attachedPVar.spec.path, attachedPVar.spec.path);
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testFactoredViewCorrectlyForInputTextVariable", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");

	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	var expectedPVarViewSpec = {
		"info" : {
			"defText" : "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo" : [],
			"text" : "Exempel textvariabel"
		},
		"onblurFunction" : attachedPVar.pVar.onBlur,
		"onkeyupFunction" : attachedPVar.pVar.onkeyup,
		"inputType" : "input",
		"mode" : "input",
		"outputFormat" : "text",
		"inputFormat" : "text",
		"placeholderText" : "Skriv din text här",
		"presentationId" : "pVarTextVariableId"
	};
	expectedPVarViewSpec.info.technicalInfo.push({
		"text" : "textId: textVariableIdText",
		"onclickMethod" : attachedPVar.pVar.openTextIdRecord
	}, {
		"text" : "defTextId: textVariableIdDefText",
		"onclickMethod" : attachedPVar.pVar.openDefTextIdRecord
	}, {
		"text" : "metadataId: textVariableId",
		"onclickMethod" : attachedPVar.pVar.openMetadataIdRecord
	}, {
		"text" : "nameInData: textVariableId"
	}, {
		"text" : "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"
	}, {
		"text" : "presentationId: pVarTextVariableId"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);
});

QUnit.test("testGetRegexpShowsMetadataIdUsedInDataIsUsedAndNotPresentationOf", function(assert) {
	var pVarTextVariableId2 = this.metadataProvider.getMetadataById("pVarTextVariableId2");
	var presentationOf2 = pVarTextVariableId2.children[1].children[1].value;
	var textVariableId2 = this.metadataProvider.getMetadataById(presentationOf2);
	assert.strictEqual(textVariableId2.children[0].value, "(^[0-9A-Za-z]{2,50}$)");

	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId2");
	assert.strictEqual(attachedPVar.pVar.getRegEx(), "^[0-9A-Öa-ö\\s!*.]{2,50}$");
});

QUnit.test("testInitTextArea", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "textVariableIdTextAreaPVar");
	CORATEST.testVariableSubscription(attachedPVar, assert, attachedPVar.spec.path, attachedPVar.spec.path);
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

let pathWithTwoLevels = {
		  "name": "linkedPath",
		  "children": [
		    {
		      "name": "nameInData",
		      "value": "recordInfo"
		    },
		    {
		      "name": "linkedPath",
		      "children": [
		        {
		          "name": "nameInData",
		          "value": "dataDivider"
		        }
		      ]
		    }
		  ]
		};

QUnit.test("testInitTextAreaWithTwoLevelPath", function(assert) {
	let topLevelPath = {
			"name" : "linkedPath",
			"children": [
				{
					"name": "nameInData",
					"value": "recordInfo"
				}]
	};
	var attachedPVar = this.pVarFactory.factor(pathWithTwoLevels, "textVariableId", "textVariableIdTextAreaPVar");
	CORATEST.testVariableSubscription(attachedPVar, assert, pathWithTwoLevels, topLevelPath);
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");
	
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});


let pathWithThreeLevels = {
		  "name": "linkedPath",
		  "children": [
		    {
		      "name": "nameInData",
		      "value": "recordInfo"
		    },
		    {
		      "name": "linkedPath",
		      "children": [
		        {
		          "name": "nameInData",
		          "value": "dataDivider"
		        },
		        {
		          "name": "linkedPath",
		          "children": [
		            {
		              "name": "nameInData",
		              "value": "linkedRecordType"
		            }
		          ]
		        }
		      ]
		    }
		  ]
		};

QUnit.test("testInitTextAreaWithThreeLevelPath", function(assert) {
	let topLevelPath = {
			"name" : "linkedPath",
			"children": [
				{
					"name": "nameInData",
					"value": "recordInfo"
				}]
	};
	var attachedPVar = this.pVarFactory.factor(pathWithThreeLevels, "textVariableId", "textVariableIdTextAreaPVar");
	CORATEST.testVariableSubscription(attachedPVar, assert, pathWithThreeLevels, topLevelPath);
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");
	
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});
let pathWithRepeatId = {
		  "name": "linkedPath",
		  "children": [
		    {
		      "name": "nameInData",
		      "value": "userRole"
		    },
		    {
		      "name": "repeatId",
		      "value": "0"
		    },
		    {
		      "name": "linkedPath",
		      "children": [
		        {
		          "name": "nameInData",
		          "value": "userRole"
		        }
		      ]
		    }
		  ]
		};
QUnit.test("testInitTextAreaWithPathWithRepeatId", function(assert) {
	let topLevelPath = {
			"name" : "linkedPath",
			"children": [
				{
					"name": "nameInData",
					"value": "userRole"
				}]
	};
	var attachedPVar = this.pVarFactory.factor(pathWithRepeatId, "textVariableId", "textVariableIdTextAreaPVar");
	CORATEST.testVariableSubscription(attachedPVar, assert, pathWithRepeatId, topLevelPath);
	CORATEST.testVariableMetadata(attachedPVar, assert);
	
	assert.equal(attachedPVar.pVar.getState(), "ok");
	
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

let pathWithAttribute = {"name":"linkedPath","children":[{"name":"nameInData","value":"textPart"},{"name":"attributes","children":[{"name":"attribute","repeatId":"1","children":[{"name":"attributeName","value":"type"},{"name":"attributeValue","value":"alternative"}]}]},{"name":"linkedPath","children":[{"name":"nameInData","value":"text"}]}]};
QUnit.test("testInitTextAreaWithPathWithRepeatId", function(assert) {
	let topLevelPath = {
			  "name": "linkedPath",
			  "children": [
			    {
			      "name": "nameInData",
			      "value": "textPart"
			    },
			    {
			      "name": "attributes",
			      "children": [
			        {
			          "name": "attribute",
			          "repeatId": "1",
			          "children": [
			            {
			              "name": "attributeName",
			              "value": "type"
			            },
			            {
			              "name": "attributeValue",
			              "value": "alternative"
			            }
			          ]
			        }
			      ]
			    }
			  ]
			};
	var attachedPVar = this.pVarFactory.factor(pathWithAttribute, "textVariableId", "textVariableIdTextAreaPVar");
	CORATEST.testVariableSubscription(attachedPVar, assert, pathWithAttribute, topLevelPath);
	CORATEST.testVariableMetadata(attachedPVar, assert);
	
	assert.equal(attachedPVar.pVar.getState(), "ok");
	
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testFactoredViewCorrectlyForInputTextAreaVariable", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "textVariableIdTextAreaPVar");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	var expectedPVarViewSpec = {
		"info" : {
			"defText" : "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo" : [],
			"text" : "Exempel textvariabel"
		},
		"onblurFunction" : attachedPVar.pVar.onBlur,
		"onkeyupFunction" : attachedPVar.pVar.onkeyup,
		"inputType" : "textarea",
		"mode" : "input",
		"outputFormat" : "text",
		"inputFormat" : "text",
		"placeholderText" : "Skriv din text här",
		"presentationId" : "textVariableIdTextAreaPVar"
	};
	expectedPVarViewSpec.info.technicalInfo.push({
		"text" : "textId: textVariableIdText",
		"onclickMethod" : attachedPVar.pVar.openTextIdRecord
	}, {
		"text" : "defTextId: textVariableIdDefText",
		"onclickMethod" : attachedPVar.pVar.openDefTextIdRecord
	}, {
		"text" : "metadataId: textVariableId",
		"onclickMethod" : attachedPVar.pVar.openMetadataIdRecord
	}, {
		"text" : "nameInData: textVariableId"
	}, {
		"text" : "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"
	}, {
		"text" : "presentationId: textVariableIdTextAreaPVar"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);
});

QUnit.test("testInitTextNoInputTypeIsShownAsText", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId",
			"textVariableIdShowTextAreaFalsePVar");

	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	var expectedPVarViewSpec = {
		"info" : {
			"defText" : "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo" : [],
			"text" : "Exempel textvariabel"
		},
		"onblurFunction" : attachedPVar.pVar.onBlur,
		"onkeyupFunction" : attachedPVar.pVar.onkeyup,
		"inputType" : "input",
		"mode" : "input",
		"outputFormat" : "text",
		"inputFormat" : "text",
		"placeholderText" : "Skriv din text här",
		"presentationId" : "textVariableIdShowTextAreaFalsePVar"
	};
	expectedPVarViewSpec.info.technicalInfo.push({
		"text" : "textId: textVariableIdText",
		"onclickMethod" : attachedPVar.pVar.openTextIdRecord
	}, {
		"text" : "defTextId: textVariableIdDefText",
		"onclickMethod" : attachedPVar.pVar.openDefTextIdRecord
	}, {
		"text" : "metadataId: textVariableId",
		"onclickMethod" : attachedPVar.pVar.openMetadataIdRecord
	}, {
		"text" : "nameInData: textVariableId"
	}, {
		"text" : "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"
	}, {
		"text" : "presentationId: textVariableIdShowTextAreaFalsePVar"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);

	CORATEST.testVariableSubscription(attachedPVar, assert, {}, {});
	CORATEST.testVariableMetadata(attachedPVar, assert);

	assert.equal(attachedPVar.pVar.getState(), "ok");

	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextInputFormatPassword", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId",
			"pVarTextVariableIdInputPassword");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	var expectedPVarViewSpec = {
		"info" : {
			"defText" : "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo" : [],
			"text" : "Exempel textvariabel"
		},
		"onblurFunction" : attachedPVar.pVar.onBlur,
		"onkeyupFunction" : attachedPVar.pVar.onkeyup,
		"inputType" : "input",
		"mode" : "input",
		"outputFormat" : "text",
		"inputFormat" : "password",
		"presentationId" : "pVarTextVariableId"
	};
	expectedPVarViewSpec.info.technicalInfo.push({
		"text" : "textId: textVariableIdText",
		"onclickMethod" : attachedPVar.pVar.openTextIdRecord
	}, {
		"text" : "defTextId: textVariableIdDefText",
		"onclickMethod" : attachedPVar.pVar.openDefTextIdRecord
	}, {
		"text" : "metadataId: textVariableId",
		"onclickMethod" : attachedPVar.pVar.openMetadataIdRecord
	}, {
		"text" : "nameInData: textVariableId"
	}, {
		"text" : "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"
	}, {
		"text" : "presentationId: pVarTextVariableId"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);

	CORATEST.testVariableSubscription(attachedPVar, assert, {}, {});
	CORATEST.testVariableMetadata(attachedPVar, assert);
});

QUnit.test("testSetValueInput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	attachedPVar.pVar.setValue("A Value");

	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "A Value");
});

QUnit.test("testHandleMessage", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var data = {
		"data" : "A new value",
		"path" : {}
	};
	attachedPVar.pVar.handleMsg(data);
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "A new value");
});

QUnit.test("testChangedValueEmpty", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var data = {
		"data" : "notEmpty",
		"path" : {}
	};
	attachedPVar.pVar.handleMsg(data);
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnblurWithValue("");
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(attachedPVar.pVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueOk", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnblurWithValue("hej");
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(attachedPVar.pVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);
	pVarViewSpy.callOnblurWithValue("hej");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);

});

QUnit.test("testChangedValueError", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnblurWithValue("hej####/(&/%&/¤/");
	assert.equal(pVarViewSpy.getState(), "error");
	assert.equal(attachedPVar.pVar.getState(), "error");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testHandleValidationError", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var message = {
		"metadataId" : "textVariableId",
		"path" : {}
	};
	attachedPVar.pVar.handleValidationError(message);
	assert.equal(attachedPVar.pVar.getState(), "error");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getState(), "error");
});

QUnit.test("testChangedValueEmpty", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var data = {
		"data" : "notEmpty",
		"path" : {}
	};
	attachedPVar.pVar.handleMsg(data);
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnkeyupWithValue("");
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(attachedPVar.pVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "", assert);
});

QUnit.test("testChangedValueOk", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnkeyupWithValue("hej");
	assert.equal(pVarViewSpy.getState(), "ok");
	assert.equal(attachedPVar.pVar.getState(), "ok");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);
	pVarViewSpy.callOnkeyupWithValue("hej");
	CORATEST.testJSBookkeeperOneCallWithValue(this.jsBookkeeper, "hej", assert);
});

QUnit.test("testChangedValueError", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	pVarViewSpy.callOnkeyupWithValue("hej####/(&/%&/¤/");
	assert.equal(pVarViewSpy.getState(), "errorStillFocused");
	assert.equal(attachedPVar.pVar.getState(), "errorStillFocused");
	CORATEST.testJSBookkeeperNoCall(this.jsBookkeeper, assert);
});

QUnit.test("testInitTextOutput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableIdOutput");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	var expectedPVarViewSpec = {
		"info" : {
			"defText" : "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo" : [],
			"text" : "Exempel textvariabel"
		},
		"onblurFunction" : attachedPVar.pVar.onBlur,
		"onkeyupFunction" : attachedPVar.pVar.onkeyup,
		"inputType" : "input",
		"mode" : "output",
		"outputFormat" : "text",
		"inputFormat" : "text",
		"presentationId" : "pVarTextVariableIdOutput"
	};
	expectedPVarViewSpec.info.technicalInfo.push({
		"text" : "textId: textVariableIdText",
		"onclickMethod" : attachedPVar.pVar.openTextIdRecord
	}, {
		"text" : "defTextId: textVariableIdDefText",
		"onclickMethod" : attachedPVar.pVar.openDefTextIdRecord
	}, {
		"text" : "metadataId: textVariableId",
		"onclickMethod" : attachedPVar.pVar.openMetadataIdRecord
	}, {
		"text" : "nameInData: textVariableId"
	}, {
		"text" : "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"
	}, {
		"text" : "presentationId: pVarTextVariableIdOutput"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);

	CORATEST.testVariableSubscription(attachedPVar, assert, {}, {});
	CORATEST.testVariableMetadata(attachedPVar, assert);
});

QUnit.test("testInitTextOutputFormatImage", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId",
			"pVarTextVariableIdOutputImage");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.deepEqual(pVarViewSpy.type, "pVarViewSpy");
	var expectedPVarViewSpec = {
		"info" : {
			"defText" : "Detta är en exempeldefinition för en textvariabel.",
			"technicalInfo" : [],
			"text" : "Exempel textvariabel"
		},
		"onblurFunction" : attachedPVar.pVar.onBlur,
		"onkeyupFunction" : attachedPVar.pVar.onkeyup,
		"inputType" : "input",
		"mode" : "output",
		"outputFormat" : "image",
		"inputFormat" : "text",
		"presentationId" : "pVarTextVariableId"
	};
	expectedPVarViewSpec.info.technicalInfo.push({
		"text" : "textId: textVariableIdText",
		"onclickMethod" : attachedPVar.pVar.openTextIdRecord
	}, {
		"text" : "defTextId: textVariableIdDefText",
		"onclickMethod" : attachedPVar.pVar.openDefTextIdRecord
	}, {
		"text" : "metadataId: textVariableId",
		"onclickMethod" : attachedPVar.pVar.openMetadataIdRecord
	}, {
		"text" : "nameInData: textVariableId"
	}, {
		"text" : "regEx: ^[0-9A-Öa-ö\\s!*.]{2,50}$"
	}, {
		"text" : "presentationId: pVarTextVariableId"
	});
	assert.deepEqual(pVarViewSpy.getSpec(), expectedPVarViewSpec);

	CORATEST.testVariableSubscription(attachedPVar, assert, {}, {});
	CORATEST.testVariableMetadata(attachedPVar, assert);
});

QUnit.test("testSetValueTextOutput", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableIdOutput");
	var valueView = attachedPVar.valueView;

	attachedPVar.pVar.setValue("A Value");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "A Value");
});

QUnit.test("testSetValueTextOutputFormatImage", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId",
			"pVarTextVariableIdOutputImage");
	var valueView = attachedPVar.valueView;

	attachedPVar.pVar.setValue("http://www.some.domain.nu/image01.jpg");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getValue(), "http://www.some.domain.nu/image01.jpg");
});

QUnit.test("testHandleValidationErrorResetBySetValue", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");
	var message = {
		"metadataId" : "textVariableId",
		"path" : {}
	};
	attachedPVar.pVar.handleValidationError(message);
	assert.equal(attachedPVar.pVar.getState(), "error");
	var pVarViewSpy = this.pVarViewFactory.getFactored(0);
	assert.equal(pVarViewSpy.getState(), "error");

	var data = {
		"data" : "A new value",
		"path" : {}
	};
	attachedPVar.pVar.handleMsg(data);
	assert.equal(pVarViewSpy.getState(), "ok");
});

QUnit.test("testOpenTextIdRecord", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");

	var event = document.createEvent('Event');
	event.ctrlKey = true;
	attachedPVar.pVar.openTextIdRecord(event);

	var jsClient = attachedPVar.dependencies.clientInstanceProvider.getJsClient();
	var expectedOpenInfo = {
		"readLink" : {
			"requestMethod" : "GET",
			"rel" : "read",
			"url" : "http://localhost:8080/therest/rest/record/text/" + "textVariableId" + "Text",
			"accept" : "application/vnd.uub.record+json"
		},
		"loadInBackground" : "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	var event = document.createEvent('Event');
	event.ctrlKey = false;
	attachedPVar.pVar.openTextIdRecord(event);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});

QUnit.test("testOpenDefTextIdRecord", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");

	var event = document.createEvent('Event');
	event.ctrlKey = true;
	attachedPVar.pVar.openDefTextIdRecord(event);

	var jsClient = attachedPVar.dependencies.clientInstanceProvider.getJsClient();
	var expectedOpenInfo = {
		"readLink" : {
			"requestMethod" : "GET",
			"rel" : "read",
			"url" : "http://localhost:8080/therest/rest/record/text/" + "textVariableId"
					+ "DefText",
			"accept" : "application/vnd.uub.record+json"
		},
		"loadInBackground" : "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	var event = document.createEvent('Event');
	event.ctrlKey = false;
	attachedPVar.pVar.openDefTextIdRecord(event);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});
QUnit.test("testOpenMetadataIdRecord", function(assert) {
	var attachedPVar = this.pVarFactory.factor({}, "textVariableId", "pVarTextVariableId");

	var event = document.createEvent('Event');
	event.ctrlKey = true;
	attachedPVar.pVar.openMetadataIdRecord(event);

	var jsClient = attachedPVar.dependencies.clientInstanceProvider.getJsClient();
	var expectedOpenInfo = {
		"readLink" : {
			"requestMethod" : "GET",
			"rel" : "read",
			"url" : "http://localhost:8080/therest/rest/record/" + "metadataTextVariable/"
					+ "textVariableTextVar",
			"accept" : "application/vnd.uub.record+json"
		},
		"loadInBackground" : "false"
	};
	assert.stringifyEqual(jsClient.getOpenInfo(0).readLink, expectedOpenInfo.readLink);
	assert.strictEqual(jsClient.getOpenInfo(0).loadInBackground, "true");

	var event = document.createEvent('Event');
	event.ctrlKey = false;
	attachedPVar.pVar.openMetadataIdRecord(event);
	assert.strictEqual(jsClient.getOpenInfo(1).loadInBackground, "false");
});
