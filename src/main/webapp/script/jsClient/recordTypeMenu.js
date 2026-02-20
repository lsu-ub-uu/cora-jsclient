/*
 * Copyright 2016, 2017, 2025 Uppsala University Library
 * Copyright 2017 Olov McKie
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
	cora.recordTypeMenu = function(providers, dependencies, spec) {

		let recordTypeProvider = providers.recordTypeProvider;
		let textProvider = providers.textProvider;
		let metadataProvider = providers.metadataProvider;

		let out;
		let recordTypeGroups = [];
		let jsClient;

		const start = function() {
		};

		const getRecordTypeGroups = function(jsClientIn) {
			jsClient = jsClientIn;
			createAndAddGroupOfRecordTypesToList();
			return recordTypeGroups;
		};

		const createAndAddGroupOfRecordTypesToList = function() {
			recordTypeGroups = [];
			let cGroupOfRecordTypesCollection = CORA.coraData(metadataProvider
				.getMetadataById("groupOfRecordTypeCollection"));
			if (cGroupOfRecordTypesCollection
				.containsChildWithNameInData("collectionItemReferences")) {
				let cItemReferences = CORA.coraData(cGroupOfRecordTypesCollection
					.getFirstChildByNameInData("collectionItemReferences"));
				let refs = cItemReferences.getChildrenByNameInData("ref");
				createAndAddGroupOfRecordTypesToListForAllGroups(refs);
			}
		};

		const createAndAddGroupOfRecordTypesToListForAllGroups = function(refs) {
			let counter = 0;
			refs.forEach(function(ref) {
				counter++;
				let cRef = CORA.coraData(ref);
				let itemId = cRef.getFirstAtomicValueByNameInData("linkedRecordId");
				possiblyCreateAndAddGroupOfRecordTypesToListForOneGroup(itemId);
			});
		};

		const possiblyCreateAndAddGroupOfRecordTypesToListForOneGroup = function(itemId) {
			let group = CORA.createSpanWithClassName("recordTypeGroup");
			let cItem = CORA.coraData(metadataProvider.getMetadataById(itemId));

			let groupId = cItem.getFirstAtomicValueByNameInData("nameInData");
			let recordTypeForGroupList = recordTypeProvider.getRecordTypesByGroupId(groupId);

			if (recordTypeGroupHasChildren(recordTypeForGroupList)) {
				let groupHeadline = createTranslatedGroupHeadline(cItem);
				group.appendChild(groupHeadline);
				createAndAddGroupOfRecordTypesToListForOneGroup(recordTypeForGroupList, group);
				recordTypeGroups.push(group);
			}
		};

		const recordTypeGroupHasChildren = function(recordTypeForGroupList) {
			return childListContainsChildren(recordTypeForGroupList)
				&& atLeastOneChildHasListLink(recordTypeForGroupList);
		};

		const childListContainsChildren = function(recordTypeForGroupList) {
			return recordTypeForGroupList.length > 0;
		};

		const atLeastOneChildHasListLink = function(recordTypeForGroupList) {
			for (const recordType of recordTypeForGroupList) {
				if (elementHasListLink(recordType)) {
					return true;
				}
			}
			return false;
		};

		const elementHasListLink = function(element) {
			return element.actionLinks.list !== undefined || element.actionLinks.create !== undefined;
		};

		const createTranslatedGroupHeadline = function(cItem) {
			let groupHeadline = CORA.createSpanWithClassName("recordTypeGroupHeadline");
			let cTextIdGroup = CORA.coraData(cItem.getFirstChildByNameInData("textId"));
			let textId = cTextIdGroup.getFirstAtomicValueByNameInData("linkedRecordId");
			groupHeadline.innerHTML = textProvider.getTranslation(textId);
			return groupHeadline;
		};

		const createAndAddGroupOfRecordTypesToListForOneGroup = function(recordTypeForGroupList, group) {
			recordTypeForGroupList.forEach(function(recordType) {
				let recordTypeHandler = createRecordTypeHandlerForRecord(recordType);
				if (recordTypeHandler.hasCreateOrListAction()) {
					group.appendChild(recordTypeHandler.getView());
				}
			});
		};

		const createRecordTypeHandlerForRecord = function(record) {
			let specRecord = {
				jsClient: jsClient,
				recordTypeRecord: record,
				baseUrl: spec.baseUrl
			};
			return dependencies.recordTypeHandlerFactory.factor(specRecord);
		};

		const getProviders = function() {
			return providers;
		};

		const getDependencies = function() {
			return dependencies;
		};

		const getSpec = function() {
			return spec;
		};

		out = Object.freeze({
			type: "recordTypeMenu",
			getProviders: getProviders,
			getDependencies: getDependencies,
			getSpec: getSpec,
			getRecordTypeGroups: getRecordTypeGroups
		});
		start();

		return out;

	};
	return cora;
}(CORA));