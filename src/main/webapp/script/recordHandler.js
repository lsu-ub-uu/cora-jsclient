/*
 * Copyright 2016, 2017, 2020 Uppsala University Library
 * Copyright 2016, 2017 Olov McKie
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
			let managedGuiItemSpec = {
				"activateMethod": spec.jsClient.showView,
				"removeMethod": spec.jsClient.viewRemoved,
				"callOnMetadataReloadMethod": reloadForMetadataChanges,
				"callMethodAfterShowWorkView": callMethodAfterShowWorkView
			};
			return dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);
		};

		const createRecordHandlerView = function() {
			let recordHandlerViewSpec = {
				"extraClassName": "recordHandler",
				"showDataMethod": showData,
				"copyDataMethod": copyData,
				"showIncomingLinksMethod": showIncomingLinks,
			};
			return dependencies.recordHandlerViewFactory.factor(recordHandlerViewSpec);
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
					//TODO: It is triggered when it lists records. should not be empty
					let permissions = createEmptyPermissions();
					tryToProcessFetchedRecordData(spec.record.data, permissions);
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
			let metadataId = metadataForRecordType.newMetadataId;

			let permissions = createEmptyPermissions();
			recordGui = createRecordGui(metadataId, copiedData, undefined, permissions);

			createAndAddViewsForNew(recordGui, metadataId);
			recordGui.initMetadataControllerStartingGui();
			dataIsChanged = true;
			managedGuiItem.setChanged(dataIsChanged);

			recordHandlerView.addButton("CREATE", sendNewDataToServer, "create");
		};

		const createAndAddViewsForNew = function(recordGuiIn, metadataId) {
			if ("true" !== spec.partOfList) {
				addNewEditPresentationToView(recordGuiIn, metadataId);
				addViewPresentationToView(recordGuiIn, metadataId);
				addMenuPresentationToView(recordGuiIn, metadataId);
			} else {
				addListPresentationToView(recordGuiIn, metadataId);
			}
		};

		const createRecordGui = function(metadataId, data, dataDivider, permissions) {
			let recordGuiSpec = {
				metadataId: metadataId,
				data: data,
				dataDivider: dataDivider,
				permissions: permissions
			};

			let createdRecordGui = dependencies.recordGuiFactory.factor(recordGuiSpec);

			let pubSub = createdRecordGui.pubSub;
			subscribeToAllMessagesForAllPaths(pubSub);
			return createdRecordGui;
		};

		const subscribeToAllMessagesForAllPaths = function(pubSub) {
			pubSub.subscribe("*", {}, undefined, handleMsg);
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
			let newPresentationFormId = metadataForRecordType.newPresentationFormId;
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
		};

		const sendNewDataToServer = function() {
			let createLink = metadataForRecordType.actionLinks.create;

			validateAndSendDataToServer(createLink);
		};

		const validateAndSendDataToServer = function(link) {
			if (recordGui.validateData()) {
				busy.show();

				let callAfterAnswer = resetViewsAndProcessFetchedRecord;
				let callSpec = {
					"requestMethod": link.requestMethod,
					"url": link.url,
					"contentType": link.contentType,
					"accept": link.accept,
					"loadMethod": callAfterAnswer,
					"errorMethod": callError,
					"data": JSON.stringify(recordGui.dataHolder.getData())
				};
				dependencies.ajaxCallFactory.factor(callSpec);
			}
		};

		const resetViewsAndProcessFetchedRecord = function(answer) {
			resetViewsAndProcessFetchedRecord2(answer);
			let messageSpec = {
				"message": "Tjohoo, det där gick ju bra, data sparat på servern!",
				"type": CORA.message.POSITIVE
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
				"requestMethod": readLink.requestMethod,
				"url": readLink.url,
				"contentType": readLink.contentType,
				"accept": readLink.accept,
				//processFetchedRecord
				"loadMethod": callAfterAnswer,
				"errorMethod": callError
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
			let permissions = {};
			permissions.write = [];
			permissions.read = [];
			return permissions;
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

			let metadataId = metadataForRecordType.metadataId;
			recordGui = createRecordGui(metadataId, data, dataDivider, permissions);
			createAndAddViewsForExisting(recordGui, metadataId);
			recordGui.initMetadataControllerStartingGui();

			addEditButtonsToView();
			possiblyShowShowIncomingLinksButton();
			recordHandlerView.addReloadRecordUsingFunction(reloadRecordFromServer);
			busy.hideWithEffect();
		};

		const createAndAddViewsForExisting = function(recordGuiIn, metadataId) {
			if ("true" !== spec.partOfList) {
				if (recordHasUpdateLink()) {
					addEditPresentationToView(recordGuiIn, metadataId);
				}
				addViewPresentationToView(recordGuiIn, metadataId);
				addMenuPresentationToView(recordGuiIn, metadataId);
			} else {
				addListPresentationToView(recordGuiIn, metadataId);
			}
		};

		const getRecordPartFromAnswer = function(answer) {
			return JSON.parse(answer.responseText).record;
		};

		const getDataDividerFromData = function(cData) {
			let cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			let cDataDivider = CORA.coraData(cRecordInfo.getFirstChildByNameInData("dataDivider"));
			return cDataDivider.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const getRecordTypeIdFromData = function(cData) {
			let cRecordInfo = CORA.coraData(cData.getFirstChildByNameInData("recordInfo"));
			let cTypeGroup = CORA.coraData(cRecordInfo.getFirstChildByNameInData("type"));
			return cTypeGroup.getFirstAtomicValueByNameInData("linkedRecordId");
		};

		const addEditPresentationToView = function(currentRecordGui, metadataIdUsedInData) {
			let editViewId = metadataForRecordType.presentationFormId;

			let editView = currentRecordGui.getPresentationHolder(editViewId, metadataIdUsedInData)
				.getView();
			recordHandlerView.addToEditView(editView);
		};

		const addEditButtonsToView = function() {
			if (recordHasDeleteLink()) {
				recordHandlerView.addButton("DELETE", shouldRecordBeDeleted, "delete");
			}
			if (recordHasUpdateLink()) {
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

		const showData = function() {
			let messageSpec = {
				"message": JSON.stringify(recordGui.dataHolder.getData()),
				"type": CORA.message.INFO,
				"timeout": 0
			};
			messageHolder.createMessage(messageSpec);
		};

		const copyData = function() {
			let recordHandlerSpec = {
				"fetchLatestDataFromServer": "false",
				"partOfList": "false",
				"createNewRecord": "true",
				"record": recordGui.dataHolder.getDataWithActionLinks(),
				"jsClient": spec.jsClient,
				"recordTypeRecordIdForNew": recordTypeId
			};
			let recordHandlerNew = dependencies.recordHandlerFactory.factor(recordHandlerSpec);
			let managedGuiItemNew = recordHandlerNew.getManagedGuiItem();
			spec.jsClient.addGuiItem(managedGuiItemNew);
			spec.jsClient.showView(managedGuiItemNew);
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
			let questionSpec = {
				"text": "Är du säker på att du vill ta bort posten?",
				"buttons": [{
					"text": "Nej"
				}, {
					"text": "Ja",
					"onclickFunction": sendDeleteDataToServer
				}]
			};
			let question = CORA.question(questionSpec);
			let questionView = question.getView();
			managedGuiItem.addWorkPresentation(questionView);
		};

		const afterDelete = function() {
			managedGuiItem.remove();
		};

		const sendDeleteDataToServer = function() {
			busy.show();
			let deleteLink = fetchedRecord.actionLinks["delete"];
			let callSpec = {
				"requestMethod": deleteLink.requestMethod,
				"url": deleteLink.url,
				"loadMethod": afterDelete,
				"errorMethod": callError
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
				"loadMethod": showIndexMessage,
				"timeoutMethod": showTimeoutMessage
			};
			let indexHandler = dependencies.indexHandlerFactory.factor(indexHandlerSpec);
			indexHandler.indexData(fetchedRecord);
		};

		const showIndexMessage = function() {
			busy.hideWithEffect();
			let messageSpec = {
				"message": "Posten är indexerad",
				"type": CORA.message.POSITIVE
			};
			messageHolder.createMessage(messageSpec);
		};

		const showTimeoutMessage = function() {
			busy.hideWithEffect();
			let messageSpec = {
				"message": "TIMEOUT",
				"type": CORA.message.ERROR
			};
			messageHolder.createMessage(messageSpec);
		};

		const callError = function(answer) {
			busy.hideWithEffect();
			let messageSpec = {
				"message": answer.status,
				"type": CORA.message.ERROR
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
			let permissions = recordGuiSpec.permissions;

			recordGui = createRecordGui(metadataId, data, dataDivider, permissions);
			if ("true" === createNewRecord) {
				createAndAddViewsForNew(recordGui, metadataId);
			} else {
				createAndAddViewsForExisting(recordGui, metadataId);
			}
			recordGui.initMetadataControllerStartingGui();
		};

		const callMethodAfterShowWorkView = function() {
			if (recordGui !== undefined) {
				recordGui.pubSub.publish("viewJustMadeVisible", {
					"data": "",
					"path": {}
				});
			}
		};

		const showIncomingLinks = function() {
			let illhSpec = {
				"read_incoming_links": fetchedRecord.actionLinks.read_incoming_links
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
		let out = Object.freeze({
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
			shouldRecordBeDeleted: shouldRecordBeDeleted,
			getManagedGuiItem: getManagedGuiItem,
			reloadForMetadataChanges: reloadForMetadataChanges,
			showIncomingLinks: showIncomingLinks,
			showIndexMessage: showIndexMessage,
			showTimeoutMessage: showTimeoutMessage,
			callMethodAfterShowWorkView: callMethodAfterShowWorkView
		});
		return out;
	};
	return cora;
}(CORA));