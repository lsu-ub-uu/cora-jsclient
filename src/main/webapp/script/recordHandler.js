/*
 * Copyright 2016, 2017, 2020, 2021 Uppsala University Library
 * Copyright 2016, 2017, 2023 Olov McKie
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
	cora.recordHandler = function(dependencies, spec) {
		const textProvider = dependencies.textProvider;
		let createNewRecord = spec.createNewRecord;
		let fetchLatestDataFromServer = spec.fetchLatestDataFromServer;
		let managedGuiItem;
		let messageHolder;
		let recordHandlerView;
		let busy;
		let recordGui;
		let fetchedRecord;
		let initComplete = false;
		let dataIsChanged = false;
		let metadataForRecordType;
		let recordTypeId;
		let validationTypeId;
		let createDefinitionId;
		let updateDefinitionId;
		let	definitionId;
		let actionLinks;

		const start = function() {
			managedGuiItem = createManagedGuiItem();

			messageHolder = CORA.messageHolder();
			managedGuiItem.addWorkPresentation(messageHolder.getView());

			recordHandlerView = createRecordHandlerView();
			managedGuiItem.addWorkPresentation(recordHandlerView.getView());
			busy = CORA.busy();
			managedGuiItem.addWorkPresentation(busy.getView());
			createNewOrFetchDataFromServerForExistingRecord();
		};

		const createManagedGuiItem = function() {
			let managedGuiItemSpec = assembleManagedGuiItemSpec();
			return dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);
		};

		const assembleManagedGuiItemSpec = function() {
			return {
				activateMethod: spec.jsClient.showView,
				removeMethod: spec.jsClient.viewRemoved,
				callOnMetadataReloadMethod: reloadForMetadataChanges,
				callMethodAfterShowWorkView: callMethodAfterShowWorkView,
			};
		};

		const createRecordHandlerView = function() {
			let recordHandlerViewSpec = assembleRecordHandlerViewSpec();
			return dependencies.recordHandlerViewFactory.factor(recordHandlerViewSpec);
		};

		const assembleRecordHandlerViewSpec = function() {
			return {
				extraClassName: "recordHandler",
				showDataMethod: showData,
				copyDataMethod: copyData,
				showIncomingLinksMethod: showIncomingLinks,
				texts : {
					showDefinitionViewer : getTranslation("showDefinitionViewerButton"),	
					showDefinitionViewerValidationType : getTranslation("showDefinitionViewerValidationTypeButton"),	
					showDefinitionViewerRecordType : getTranslation("showDefinitionViewerRecordTypeButton")	
				}
			};
		};
		
		const getTranslation = function(textId){
			return textProvider.getTranslation(`theClient_${textId}Text`);
		};

		const createNewOrFetchDataFromServerForExistingRecord = function() {
			if ("true" === createNewRecord) {
				createGuiForNew(spec.record);
			} else {
				actionLinks = spec.record.actionLinks;
				if ("true" === fetchLatestDataFromServer) {
					fetchDataFromServer(processFetchedRecord);
				} else {
					fetchedRecord = spec.record;
					let permissions = preparePermissionsForRecordGuiFromFetchedRecord();
					tryToProcessFetchedRecordData(fetchedRecord.data, permissions);
				}
			}
		};

		const createGuiForNew = function(oldData) {
			try {
				tryToCreateGuiForNew(oldData);
			} catch (error) {
				showErrorInView(error, oldData);
			}
		};

		const tryToCreateGuiForNew = function(copiedData) {
			recordTypeId = spec.recordTypeRecordIdForNew;
			metadataForRecordType = spec.jsClient.getMetadataForRecordTypeId(recordTypeId);

			if(copiedDataExists(copiedData)){
				let cCopiedData = CORA.coraData(copiedData);
				validationTypeId = getValidationTypeIdFromData(cCopiedData);
				tryToCreateGuiForNewWithKnownValidationType(copiedData);
			}else if(onlyOneValiationType()) {
				validationTypeId = Object.keys(metadataForRecordType.validationTypes)[0];
				tryToCreateGuiForNewWithKnownValidationType();
			} else {
				chooseValidationType();
			}
		};
		
		const copiedDataExists = function(copiedData){
			return undefined != copiedData;
		};
		
		const onlyOneValiationType = function(){
			return 1 == Object.keys(metadataForRecordType.validationTypes).length;
		};
		
		const chooseValidationType = function() {
			let questionSpec = assembleValidationQuestionSpec();
			let question = dependencies.questionFactory.factor(questionSpec);
			let questionView = question.getView();
			managedGuiItem.addWorkPresentation(questionView);
		};

		const assembleValidationQuestionSpec = function() {
			let spec = {
				text: "Välj validation type för posten!",
				buttons: []
			};
			for(const validationType of Object.keys(metadataForRecordType.validationTypes)){
				spec.buttons.push({text: validationType, onclickFunction: function(){
					chosenValidationType(validationType);
				}});
			}
			return spec;
		};
		const chosenValidationType = function(z) {
			validationTypeId = z; 
			tryToCreateGuiForNewWithKnownValidationType();
		};
		
		const tryToCreateGuiForNewWithKnownValidationType = function(copiedData) {
			let validationType = metadataForRecordType.validationTypes[validationTypeId];
			createDefinitionId = validationType.createDefinitionId;
			definitionId = metadataForRecordType.metadataId;

			let permissions = createEmptyPermissions();
			let recordPartPermissionCalculator = createRecordPartPermissionCalculator(definitionId,
				permissions);
			recordGui = createRecordGui(createDefinitionId, copiedData, undefined, recordPartPermissionCalculator);
			createAndAddViewsForNew(recordGui, createDefinitionId, definitionId);
			recordGui.initMetadataControllerStartingGui();
			dataIsChanged = true;
			managedGuiItem.setChanged(dataIsChanged);
			managedGuiItem.setSendDataToServer(sendNewDataToServer);
			recordHandlerView.addButton("CREATE", sendNewDataToServer, "create");
			recordHandlerView.addDefinitionViewerOpenFunctionValidationType(showDefinitionViewerValidationType);
			recordHandlerView.addDefinitionViewerOpenFunctionRecordType(showDefinitionViewerRecordType);
		};
		
		const createAndAddViewsForNew = function(recordGuiIn, createDefinitionId, definitionId) {
			if ("true" !== spec.partOfList) {
				addNewEditPresentationToView(recordGuiIn, createDefinitionId);
				addViewPresentationToView(recordGuiIn, definitionId);
				addMenuPresentationToView(recordGuiIn, definitionId);
			} else {
				addListPresentationToView(recordGuiIn, definitionId);
			}
		};


		const createRecordGui = function(metadataId, data, dataDivider, recordPartPermissionCalculator) {
			let recordGuiSpec = {
				metadataId: metadataId,
				data: data,
				dataDivider: dataDivider,
				recordPartPermissionCalculator: recordPartPermissionCalculator
			};

			let createdRecordGui = dependencies.recordGuiFactory.factor(recordGuiSpec);

			let pubSub = createdRecordGui.pubSub;
			subscribeToAllMessagesForAllPaths(pubSub);
			return createdRecordGui;
		};

		const subscribeToAllMessagesForAllPaths = function(pubSub) {
			pubSub.subscribe("*", [], undefined, handleMsg);
		};

		const handleMsg = function(dataFromMsg, msg) {
			if (initComplete && msgChangesData(msg)) {
				dataIsChanged = true;
				managedGuiItem.setChanged(dataIsChanged);
			}
			if (messageSaysInitIsComplete(msg)) {
				initComplete = true;
			}
			if (messageSaysUpdateRecord(msg)) {
				sendUpdateDataToServer();
			}
		};

		const msgChangesData = function(msg) {
			return msg.endsWith("setValue") || msg.endsWith("remove") || msg.endsWith("move");
		};

		const messageSaysInitIsComplete = function(msg) {
			return msg.endsWith("initComplete");
		};

		const messageSaysUpdateRecord = function(msg) {
			return msg.endsWith("updateRecord");
		};

		const addNewEditPresentationToView = function(currentRecordGui, metadataIdUsedInData) {
			let newPresentationFormId = metadataForRecordType.validationTypes[validationTypeId].createFormId;

			let presentationView = currentRecordGui.getPresentationHolder(newPresentationFormId,
				metadataIdUsedInData).getView();
			recordHandlerView.addToEditView(presentationView);
		};

		const addViewPresentationToView = function(currentRecordGui, metadataIdUsedInData) {
			let showViewId = metadataForRecordType.presentationViewId;
			let showView = currentRecordGui.getPresentationHolder(showViewId, metadataIdUsedInData)
				.getView();
			recordHandlerView.addToShowView(showView);
		};

		const addMenuPresentationToView = function(currentRecordGui, metadataIdUsedInData) {
			let menuPresentationViewId = metadataForRecordType.menuPresentationViewId;
			let menuPresentationView = currentRecordGui.getPresentationHolder(
				menuPresentationViewId, metadataIdUsedInData).getView();
			managedGuiItem.clearMenuView();
			managedGuiItem.addMenuPresentation(menuPresentationView);
		};

		const addListPresentationToView = function(currentRecordGui, metadataIdUsedInData) {
			let viewId = metadataForRecordType.listPresentationViewId;
			let presentation = currentRecordGui.getPresentationHolder(viewId, metadataIdUsedInData)
				.getView();
			managedGuiItem.addListPresentation(presentation);
		};

		const showErrorInView = function(error, data) {
			recordHandlerView
				.addObjectToEditView("something went wrong, probably missing metadata, "
					+ error);
			recordHandlerView.addObjectToEditView(data);
			recordHandlerView.addObjectToEditView(error.stack);
			throw(error);
		};

		const sendNewDataToServer = function() {
			let createLink = metadataForRecordType.actionLinks.create;
			validateAndSendDataToServer(createLink);
		};

		const validateAndSendDataToServer = function(link) {
			if (recordGui.validateData()) {
				busy.show();
				let callSpec = assembleCallSpec(link)
				dependencies.ajaxCallFactory.factor(callSpec);
			}
		};

		const assembleCallSpec = function(link) {
			let callAfterAnswer = resetViewsAndProcessFetchedRecord;
			return {
				requestMethod: link.requestMethod,
				url: link.url,
				contentType: link.contentType,
				accept: link.accept,
				loadMethod: callAfterAnswer,
				errorMethod: callError,
				data: JSON.stringify(recordGui.dataHolder.getData())
			};
		};

		const resetViewsAndProcessFetchedRecord = function(answer) {
			resetViewsAndProcessFetchedRecord2(answer);
			let messageSpec = {
				message: "Tjohoo, det där gick ju bra, data sparat på servern!",
				type: CORA.message.POSITIVE
			};
			messageHolder.createMessage(messageSpec);
		};

		const resetViewsAndProcessFetchedRecord2 = function(answer) {
			busy.hideWithEffect();
			recordHandlerView.clearViews();
			initComplete = false;
			dataIsChanged = false;
			managedGuiItem.setChanged(dataIsChanged);
			processFetchedRecord(answer);
		};

		const fetchDataFromServer = function(callAfterAnswer) {
			busy.show();
			let readLink = actionLinks.read;
			let callSpec = {
				requestMethod: readLink.requestMethod,
				url: readLink.url,
				contentType: readLink.contentType,
				accept: readLink.accept,
				loadMethod: callAfterAnswer,
				errorMethod: callError
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		};

		const processFetchedRecord = function(answer) {
			fetchedRecord = getRecordPartFromAnswer(answer);
			let data = fetchedRecord.data;
			actionLinks = fetchedRecord.actionLinks;
			let permissions = preparePermissionsForRecordGuiFromFetchedRecord();
			processFetchedRecordData(data, permissions);
		};

		const preparePermissionsForRecordGuiFromFetchedRecord = function() {
			let fetchedPermissions = fetchedRecord.permissions;

			let permissions = createEmptyPermissions();
			return possiblyAddFetchedPermissions(permissions, fetchedPermissions);
		};

		const createEmptyPermissions = function() {
			return {
				write: [],
				read: []
			};
		};

		const possiblyAddFetchedPermissions = function(permissions, fetchedPermissions) {
			if (fetchedPermissions) {
				permissions = possiblyAddFetchedWritePermissions(permissions, fetchedPermissions);
				permissions = possiblyAddFetchedReadPermissions(permissions, fetchedPermissions);
			}
			return permissions;
		};

		const possiblyAddFetchedWritePermissions = function(permissions, fetchedPermissions) {
			if (fetchedPermissions.write !== undefined) {
				permissions.write = fetchedPermissions.write;
			}
			return permissions;
		};

		const possiblyAddFetchedReadPermissions = function(permissions, fetchedPermissions) {
			if (fetchedPermissions.read !== undefined) {
				permissions.read = fetchedPermissions.read;
			}
			return permissions;
		};

		const processFetchedRecordData = function(data, permissions) {
			try {
				tryToProcessFetchedRecordData(data, permissions);
			} catch (error) {
				showErrorInView(error, data);
			}
		};

		const tryToProcessFetchedRecordData = function(data, permissions) {
			let cData = CORA.coraData(data);
			let dataDivider = getDataDividerFromData(cData);
			recordTypeId = getRecordTypeIdFromData(cData);
			metadataForRecordType = spec.jsClient.getMetadataForRecordTypeId(recordTypeId);
			validationTypeId = getValidationTypeIdFromData(cData);
			let validationType = metadataForRecordType.validationTypes[validationTypeId];
			updateDefinitionId = validationType.updateDefinitionId;

			definitionId = metadataForRecordType.metadataId;
			let recordPartPermissionCalculator = createRecordPartPermissionCalculator(definitionId,
				permissions);
			recordGui = createRecordGui(updateDefinitionId, data, dataDivider, recordPartPermissionCalculator);
			createAndAddViewsForExisting(recordGui, updateDefinitionId, definitionId);
			recordGui.initMetadataControllerStartingGui();

			addEditButtonsToView();
			possiblyShowShowIncomingLinksButton();
			possiblyShowShowDefinitionButton();
			recordHandlerView.addReloadRecordUsingFunction(reloadRecordFromServer);
			busy.hideWithEffect();
		};

		const createRecordPartPermissionCalculator = function(metadataId, permissions) {
			let calculatorSpec = {
				metadataId: metadataId,
				permissions: permissions
			}
			return dependencies.recordPartPermissionCalculatorFactory.factor(calculatorSpec);
		}

		const createAndAddViewsForExisting = function(recordGuiIn, updateDefinitionId, definitionId) {
			if ("true" !== spec.partOfList) {
				if (recordHasUpdateLink()) {
					addEditPresentationToView(recordGuiIn, updateDefinitionId);
				}
				addViewPresentationToView(recordGuiIn, definitionId);
				addMenuPresentationToView(recordGuiIn, definitionId);
			} else {
				addListPresentationToView(recordGuiIn, definitionId);
			}
		};

		const getRecordPartFromAnswer = function(answer) {
			return JSON.parse(answer.responseText).record;
		};

		const getDataDividerFromData = function(cData) {
			let cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getLinkedRecordIdFromFirstChildLinkWithNameInData("dataDivider");
		};

		const getRecordTypeIdFromData = function(cData) {
			let cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getLinkedRecordIdFromFirstChildLinkWithNameInData("type");
		};

		const getValidationTypeIdFromData = function(cData) {
			let cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			return cRecordInfo.getLinkedRecordIdFromFirstChildLinkWithNameInData("validationType");
		};

		const addEditPresentationToView = function(currentRecordGui, metadataIdUsedInData) {
			let editViewId = metadataForRecordType.validationTypes[validationTypeId].updateFormId;

			let editView = currentRecordGui.getPresentationHolder(editViewId, metadataIdUsedInData)
				.getView();
			recordHandlerView.addToEditView(editView);
		};

		const addEditButtonsToView = function() {
			if (recordHasDeleteLink()) {
				recordHandlerView.addButton("DELETE", shouldRecordBeDeleted, "delete");
			}
			if (recordHasUpdateLink()) {
				managedGuiItem.setSendDataToServer(sendUpdateDataToServer);
				recordHandlerView.addButton("UPDATE", sendUpdateDataToServer, "update");
			}
			if (recordHasIndexLink()) {
				recordHandlerView.addButton("INDEX", sendIndexDataToServer, "index");
			}
		};

		const possiblyShowShowIncomingLinksButton = function() {
			if (recordHasIncomingLinks()) {
				recordHandlerView.showShowIncomingLinksButton();
			}
		};

		const recordHasIncomingLinks = function() {
			let readIncomingLinks = fetchedRecord.actionLinks.read_incoming_links;
			return readIncomingLinks !== undefined;
		};
		
		const possiblyShowShowDefinitionButton = function() {
			if (recordHandlesMetadata() && "true" !== spec.partOfList) {
				recordHandlerView.addDefinitionViewerOpenFunction(showDefinitionViewer);
			}
			recordHandlerView.addDefinitionViewerOpenFunctionValidationType(showDefinitionViewerValidationType);
			recordHandlerView.addDefinitionViewerOpenFunctionRecordType(showDefinitionViewerRecordType);
		};

		const recordHandlesMetadata = function() {
			const name = fetchedRecord.data.name;
			return "metadata" === name;
		};

		const showDefinitionViewer = function() {
			let cData = CORA.coraData(fetchedRecord.data);
			let cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			let id = cRecordInfo.getFirstAtomicValueByNameInData("id");
			spec.jsClient.openDefinitionViewerForId(id);
		};
		
		const showDefinitionViewerValidationType = function() {
			if(createDefinitionId){
				spec.jsClient.openDefinitionViewerForId(createDefinitionId);
			}else{
				spec.jsClient.openDefinitionViewerForId(updateDefinitionId);
			}
		};
		
		const showDefinitionViewerRecordType = function() {
			spec.jsClient.openDefinitionViewerForId(definitionId);
		};

		const showData = function() {
			let messageSpec = {
				message: JSON.stringify(recordGui.dataHolder.getData()),
				type: CORA.message.INFO,
				renderHtml: false,
				timeout: 0
			};
			messageHolder.createMessage(messageSpec);
		};

		const copyData = function() {
			let recordHandlerSpec = assembleRecordHandlerSpec();
			let recordHandlerNew = dependencies.recordHandlerFactory.factor(recordHandlerSpec);
			let managedGuiItemNew = recordHandlerNew.getManagedGuiItem();
			spec.jsClient.addGuiItem(managedGuiItemNew);
			spec.jsClient.showView(managedGuiItemNew);
		};

		const assembleRecordHandlerSpec = function() {
			return {
				fetchLatestDataFromServer: "false",
				partOfList: "false",
				createNewRecord: "true",
				record: recordGui.dataHolder.getDataWithActionLinks(),
				jsClient: spec.jsClient,
				recordTypeRecordIdForNew: recordTypeId
			};
		};

		const recordHasDeleteLink = function() {
			let deleteLink = fetchedRecord.actionLinks["delete"];
			return deleteLink !== undefined;
		};

		const recordHasUpdateLink = function() {
			let updateLink = fetchedRecord.actionLinks.update;
			return updateLink !== undefined;
		};

		const recordHasIndexLink = function() {
			let indexLink = fetchedRecord.actionLinks["index"];
			return indexLink !== undefined;
		};

		const shouldRecordBeDeleted = function() {
			let questionSpec = assembleQuestionSpec();
			let question = dependencies.questionFactory.factor(questionSpec);
			let questionView = question.getView();
			managedGuiItem.addWorkPresentation(questionView);
		};

		const assembleQuestionSpec = function() {
			return {
				text: "Är du säker på att du vill ta bort posten?",
				buttons: [{
					text: "Nej"
				}, {
					text: "Ja",
					onclickFunction: sendDeleteDataToServer
				}]
			};
		};

		const afterDelete = function() {
			managedGuiItem.remove();
		};

		const sendDeleteDataToServer = function() {
			busy.show();
			let deleteLink = fetchedRecord.actionLinks["delete"];
			let callSpec = {
				requestMethod: deleteLink.requestMethod,
				url: deleteLink.url,
				loadMethod: afterDelete,
				errorMethod: callError
			};
			dependencies.ajaxCallFactory.factor(callSpec);
		};

		const sendUpdateDataToServer = function() {
			let updateLink = fetchedRecord.actionLinks.update;
			validateAndSendDataToServer(updateLink);
		};

		const sendIndexDataToServer = function() {
			busy.show();
			let indexHandlerSpec = {
				loadMethod: showIndexMessage,
				timeoutMethod: showTimeoutMessage
			};
			let indexHandler = dependencies.indexHandlerFactory.factor(indexHandlerSpec);
			indexHandler.indexData(fetchedRecord);
		};

		const showIndexMessage = function() {
			busy.hideWithEffect();
			let messageSpec = {
				message: "Posten är indexerad",
				type: CORA.message.POSITIVE
			};
			messageHolder.createMessage(messageSpec);
		};

		const showTimeoutMessage = function() {
			busy.hideWithEffect();
			let messageSpec = {
				message: "TIMEOUT",
				type: CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		};

		const callError = function(answer) {
			busy.hideWithEffect();
			let messageSpec = {
				message: answer.status + " " + answer.response,
				type: CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		};

		const getDataIsChanged = function() {
			return dataIsChanged;
		};

		const getManagedGuiItem = function() {
			return managedGuiItem;
		};

		const reloadForMetadataChanges = function() {
			recordHandlerView.clearDataViews();
			initComplete = false;
			let data = recordGui.dataHolder.getDataWithActionLinks();
			let recordGuiSpec = recordGui.getSpec();

			let metadataId = recordGuiSpec.metadataId;
			let dataDivider = recordGuiSpec.dataDivider;
			let recordPartPermissionCalculator = recordGuiSpec.recordPartPermissionCalculator;
			recordGui = createRecordGui(metadataId, data, dataDivider,
				recordPartPermissionCalculator);
			if ("true" === createNewRecord) {
				createAndAddViewsForNew(recordGui, createDefinitionId, definitionId);
			} else {
				createAndAddViewsForExisting(recordGui, updateDefinitionId, definitionId);
			}
			recordGui.initMetadataControllerStartingGui();
		};

		const callMethodAfterShowWorkView = function() {
			if (recordGui !== undefined) {
				recordGui.pubSub.publish("viewJustMadeVisible", {
					data: "",
					path: []
				});
			}
		};

		const showIncomingLinks = function() {
			let illhSpec = {
				read_incoming_links: fetchedRecord.actionLinks.read_incoming_links
			};
			let incomingLinksListHandler = dependencies.globalFactories.incomingLinksListHandlerFactory
				.factor(illhSpec);
			recordHandlerView.addToIncomingLinksView(incomingLinksListHandler.getView());
		};

		const reloadRecordFromServer = function() {
			fetchDataFromServer(resetViewsAndProcessFetchedRecord2);
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		start();
		return Object.freeze({
			type: "recordHandler",
			getDependencies: getDependencies,
			getSpec: getSpec,
			processFetchedRecord: processFetchedRecord,
			resetViewsAndProcessFetchedRecord: resetViewsAndProcessFetchedRecord,
			afterDelete: afterDelete,
			handleMsg: handleMsg,
			getDataIsChanged: getDataIsChanged,
			copyData: copyData,
			showData: showData,
			sendUpdateDataToServer: sendUpdateDataToServer,
			sendNewDataToServer : sendNewDataToServer,
			shouldRecordBeDeleted: shouldRecordBeDeleted,
			getManagedGuiItem: getManagedGuiItem,
			reloadForMetadataChanges: reloadForMetadataChanges,
			showIncomingLinks: showIncomingLinks,
			showIndexMessage: showIndexMessage,
			showTimeoutMessage: showTimeoutMessage,
			callMethodAfterShowWorkView: callMethodAfterShowWorkView,
			showDefinitionViewer: showDefinitionViewer,
			showDefinitionViewerValidationType: showDefinitionViewerValidationType,
			showDefinitionViewerRecordType: showDefinitionViewerRecordType,
			sendDeleteDataToServer: sendDeleteDataToServer
		});
	};
	return cora;
}(CORA));