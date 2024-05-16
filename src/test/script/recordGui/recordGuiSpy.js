/*
 * Copyright 2017, 2024 Olov McKie
 * Copyright 2017, 2020 Uppsala University Library
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
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.recordGuiSpy = function() {

		let presentationIdUsed = [];
		let metadataIdsUsedInData = [];
		let returnedPresentations = [];
		let initCalled = 0;
		let dataValidated = 0;
		let validateAnswer = true;
		let spec = {
			"metadataId": "recordTypeGroup",
			"data": {},
			"dataDivider": "cora",
			"permissions": {
				"write": [],
				"read": []
			},
			recordPartPermissionCalculator: CORATEST.recordPartPermissionCalculatorSpy
		};
		let setFocusCalledNoOfTimes = 0;
		const getDependencies = function() {
			return dependencies;
		};
		const getSpec = function() {
			return spec;
		};
		let pubSub = CORATEST.pubSubSpy();

		let dataHolder = CORATEST.dataHolderSpy();
		const getPresentationHolder = function(presentationId, metadataIdUsedInData) {
			presentationIdUsed.push(presentationId);
			metadataIdsUsedInData.push(metadataIdUsedInData);
			let pres = CORATEST.presentationStub(presentationId);
			returnedPresentations.push(pres);
			return pres;
		};
		const initMetadataControllerStartingGui = function() {
			initCalled++;
		};
		const getInitCalled = function() {
			return initCalled;
		};

		const validateData = function() {
			dataValidated++;
			return validateAnswer;
		};
		const setValidateAnswer = function(answer) {
			validateAnswer = answer;
		};
		const getDataValidated = function() {
			return dataValidated;
		};

		const getPresentationIdUsed = function(number) {
			return presentationIdUsed[number];
		};
		const getMetadataIdsUsedInData = function(number) {
			return metadataIdsUsedInData[number];
		};
		const getReturnedPresentations = function(number) {
			return returnedPresentations[number];
		};
		const setSpec = function(specIn) {
			spec = specIn;
		};
		
		return Object.freeze({
			type: "recordGuiSpy",
			getDependencies: getDependencies,
			getSpec: getSpec,
			pubSub: pubSub,
			dataHolder: dataHolder,
			getPresentationHolder: getPresentationHolder,
			initMetadataControllerStartingGui: initMetadataControllerStartingGui,
			getInitCalled: getInitCalled,
			validateData: validateData,
			getDataValidated: getDataValidated,
			setValidateAnswer: setValidateAnswer,
			getPresentationIdUsed: getPresentationIdUsed,
			getMetadataIdsUsedInData: getMetadataIdsUsedInData,
			getReturnedPresentations: getReturnedPresentations,
			setSpec: setSpec
		});
	};
	return coraTest;
}(CORATEST || {}));
