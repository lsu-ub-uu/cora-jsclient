/*
 * Copyright 2019, 2024, 2025 Uppsala University Library
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
var CORA = (function(cora) {
	"use strict";
	cora.passwordLogin = function(dependencies, spec) {
		const recordGuiFactory = dependencies.recordGuiFactory;
		const passwordLoginViewFactory = dependencies.passwordLoginViewFactory;
		const ajaxCallFactory = dependencies.ajaxCallFactory;

		let view;
		let recordGui;
		let loginId;

		const start = function() {
			view = createView();
			recordGui = createRecordGui();
			let presentationView = recordGui.getPresentationHolder(spec.presentationId,
				spec.metadataId).getView();
			view.addPresentationToLoginFormHolder(presentationView);
			recordGui.initMetadataControllerStartingGui();
		};

		const createView = function() {
			let viewSpec = {
				loginMethod: login
			};
			return passwordLoginViewFactory.factor(viewSpec);
		};

		const createRecordGui = function() {
			let recordGuiSpec = {
				metadataId: spec.metadataId,
				permissions: createEmptyPermissions()
			};
			return recordGuiFactory.factor(recordGuiSpec);
		};

		const createEmptyPermissions = function() {
			return {
				write: [],
				read: []
			};
		};

		const login = function() {
			let loginData = CORA.coraData(recordGui.dataHolder.getData());
			loginId = loginData.getFirstAtomicValueByNameInData("loginId");
			let password = loginData.getFirstAtomicValueByNameInData("password");
			let callSpec = createCallSpec(loginId, password);
			ajaxCallFactory.factor(callSpec);
		};

		const createCallSpec = function(loginId, password) {
			return {
				requestMethod: spec.requestMethod,
				url: spec.url,
				contentType: spec.contentType,
				accept: spec.accept,
				loadMethod: handleResponse,
				errorMethod: spec.errorCallback,
				timeoutMethod: spec.timeoutCallback,
				data: loginId + '\n' + password,
				timeoutInMS: 15000
			};
		};

		const handleResponse = function(answer) {
			let everything = JSON.parse(answer.responseText);
			let data = everything.data;
			let cData = CORA.coraData(data);
			let token = cData.getFirstAtomicValueByNameInData("token");
			let userId = cData.getFirstAtomicValueByNameInData("userId");
			let validUntil = cData.getFirstAtomicValueByNameInData("validUntil");
			let renewUntil = cData.getFirstAtomicValueByNameInData("renewUntil");
			let firstName = cData.getFirstAtomicValueByNameInData("firstName");
			let lastName = cData.getFirstAtomicValueByNameInData("lastName");
			let authInfo = {
				userId: userId,
				loginId: loginId,
				token: token,
				firstName: firstName,
				lastName: lastName,
				validUntil: validUntil,
				renewUntil: renewUntil,
				actionLinks: everything.actionLinks
			};
			spec.authInfoCallback(authInfo);
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		const getView = function() {
			return view.getView();
		};

		start();
		return Object.freeze({
			type: "passwordLogin",
			getDependencies: getDependencies,
			getSpec: getSpec,
			getView: getView,
			login: login,
			handleResponse: handleResponse
		});
	};

	return cora;
}(CORA));