/*
 * Copyright 2016, 2017, 2024 Uppsala University Library
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
	coraTest.searchProviderSpy = function() {
		let searchArray = {};
		let fetchedSearchIds = [];
		let allSearchesNo = 0;
		let searchesByGroupIdNo = 0;
		let noOfReloads = 0;
		let groupId;

		searchArray.coraTextSearch = {
			data: {
				children: [
					{
						children: [{
							name: "linkedRecordType",
							value: "metadataGroup"
						}, {
							name: "linkedRecordId",
							value: "autocompleteSearchGroup"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "metadataId"
					},
					{
						children: [
							{
								name: "id",
								value: "coraTextSearch"
							},
							{
								name: "type",
								value: "search"
							},
							{
								name: "createdBy",
								children: [{
									name: "linkedRecordType",
									value: "user"
								}, {
									name: "linkedRecordId",
									value: "141414"
								}]
							},
							{
								children: [{
									name: "linkedRecordType",
									value: "system"
								}, {
									name: "linkedRecordId",
									value: "cora"
								}],
								actionLinks: {
									read: {
										requestMethod: "GET",
										rel: "read",
										url: "http://epc.ub.uu.se/therest/rest/record/system/cora",
										accept: "application/vnd.cora.record+json"
									}
								},
								name: "dataDivider"
							}],
						name: "recordInfo"
					},
					{
						children: [{
							name: "linkedRecordType",
							value: "presentationGroup"
						}, {
							name: "linkedRecordId",
							value: "autocompleteSearchPGroup"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "presentationId"
					},
					{
						repeatId: "0",
						children: [{
							name: "linkedRecordType",
							value: "recordType"
						}, {
							name: "linkedRecordId",
							value: "coraText"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/recordType/coraText",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "recordTypeToSearchIn"
					}, {
						name: "searchGroup",
						value: "publicSearch"
					}],
				name: "search"
			},
			actionLinks: {
				search: {
					requestMethod: "GET",
					rel: "search",
					url: "http://epc.ub.uu.se/therest/rest/record/searchResult/coraTextSearch",
					accept: "application/vnd.cora.recordList+json"
				},
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch",
					accept: "application/vnd.cora.record+json"
				},
				read_incoming_links: {
					requestMethod: "GET",
					rel: "read_incoming_links",
					url: "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch/incomingLinks",
					accept: "application/vnd.cora.recordList+json"
				},
				update: {
					requestMethod: "POST",
					rel: "update",
					contentType: "application/vnd.cora.record+json",
					url: "http://epc.ub.uu.se/therest/rest/record/search/coraTextSearch",
					accept: "application/vnd.cora.record+json"
				}
			}
		};

		searchArray.someSearch = {
			data: {
				children: [
					{
						children: [{
							name: "linkedRecordType",
							value: "metadataGroup"
						}, {
							name: "linkedRecordId",
							value: "metadataGroupGroup"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/metadataGroup/metadataGroupGroup",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "metadataId"
					},
					{
						children: [
							{
								name: "id",
								value: "someSearch"
							},
							{
								name: "type",
								value: "search"
							},
							{
								name: "createdBy",
								children: [{
									name: "linkedRecordType",
									value: "user"
								}, {
									name: "linkedRecordId",
									value: "141414"
								}]
							},
							{
								children: [{
									name: "linkedRecordType",
									value: "system"
								}, {
									name: "linkedRecordId",
									value: "cora"
								}],
								actionLinks: {
									read: {
										requestMethod: "GET",
										rel: "read",
										url: "http://epc.ub.uu.se/therest/rest/record/system/cora",
										accept: "application/vnd.cora.record+json"
									}
								},
								name: "dataDivider"
							}],
						name: "recordInfo"
					},
					{
						children: [{
							name: "linkedRecordType",
							value: "presentationGroup"
						}, {
							name: "linkedRecordId",
							value: "metadataFormPGroup"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/presentationGroup/metadataFormPGroup",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "presentationId"
					},
					{
						repeatId: "0",
						children: [{
							name: "linkedRecordType",
							value: "recordType"
						}, {
							name: "linkedRecordId",
							value: "metadata"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/recordType/metadata",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "recordTypeToSearchIn"
					}, {
						name: "searchGroup",
						value: "publicSearch"
					}],
				name: "search"
			},
			actionLinks: {
				search: {
					requestMethod: "GET",
					rel: "search",
					url: "http://epc.ub.uu.se/therest/rest/record/searchResult/someSearch",
					accept: "application/vnd.cora.recordList+json"
				},
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://epc.ub.uu.se/therest/rest/record/search/someSearch",
					accept: "application/vnd.cora.record+json"
				},
				update: {
					requestMethod: "POST",
					rel: "update",
					contentType: "application/vnd.cora.record+json",
					url: "http://epc.ub.uu.se/therest/rest/record/search/someSearch",
					accept: "application/vnd.cora.record+json"
				},
				delete: {
					requestMethod: "DELETE",
					rel: "delete",
					url: "http://epc.ub.uu.se/therest/rest/record/search/someSearch"
				}
			}
		};
		searchArray.metadataItemCollectionSearch = {
			data: {
				children: [
					{
						children: [{
							name: "linkedRecordType",
							value: "metadataGroup"
						}, {
							name: "linkedRecordId",
							value: "autocompleteSearchGroup"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "metadataId"
					},
					{
						children: [
							{
								name: "id",
								value: "metadataItemCollectionSearch"
							},
							{
								name: "type",
								value: "search"
							},
							{
								name: "createdBy",
								children: [{
									name: "linkedRecordType",
									value: "user"
								}, {
									name: "linkedRecordId",
									value: "141414"
								}]
							},
							{
								children: [{
									name: "linkedRecordType",
									value: "system"
								}, {
									name: "linkedRecordId",
									value: "cora"
								}],
								actionLinks: {
									read: {
										requestMethod: "GET",
										rel: "read",
										url: "http://epc.ub.uu.se/therest/rest/record/system/cora",
										accept: "application/vnd.cora.record+json"
									}
								},
								name: "dataDivider"
							}],
						name: "recordInfo"
					},
					{
						children: [{
							name: "linkedRecordType",
							value: "presentationGroup"
						}, {
							name: "linkedRecordId",
							value: "autocompleteSearchPGroup"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "presentationId"
					},
					{
						repeatId: "0",
						children: [{
							name: "linkedRecordType",
							value: "recordType"
						}, {
							name: "linkedRecordId",
							value: "metadataItemCollection"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/recordType/metadataItemCollection",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "recordTypeToSearchIn"
					}, {
						name: "searchGroup",
						value: "autocomplete"
					}],
				name: "search"
			},
			actionLinks: {
				search: {
					requestMethod: "GET",
					rel: "search",
					url: "http://epc.ub.uu.se/therest/rest/record/searchResult/metadataItemCollectionSearch",
					accept: "application/vnd.cora.recordList+json"
				},
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch",
					accept: "application/vnd.cora.record+json"
				},
				read_incoming_links: {
					requestMethod: "GET",
					rel: "read_incoming_links",
					url: "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch/incomingLinks",
					accept: "application/vnd.cora.recordList+json"
				},
				update: {
					requestMethod: "POST",
					rel: "update",
					contentType: "application/vnd.cora.record+json",
					url: "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch",
					accept: "application/vnd.cora.record+json"
				}
			}
		};
		searchArray.searchWithoutSearchLink = {
			data: {
				children: [
					{
						children: [{
							name: "linkedRecordType",
							value: "metadataGroup"
						}, {
							name: "linkedRecordId",
							value: "autocompleteSearchGroup"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "metadataId"
					},
					{
						children: [
							{
								name: "id",
								value: "searchWithoutSearchLink"
							},
							{
								name: "type",
								value: "search"
							},
							{
								name: "createdBy",
								children: [{
									name: "linkedRecordType",
									value: "user"
								}, {
									name: "linkedRecordId",
									value: "141414"
								}]
							},
							{
								children: [{
									name: "linkedRecordType",
									value: "system"
								}, {
									name: "linkedRecordId",
									value: "cora"
								}],
								actionLinks: {
									read: {
										requestMethod: "GET",
										rel: "read",
										url: "http://epc.ub.uu.se/therest/rest/record/system/cora",
										accept: "application/vnd.cora.record+json"
									}
								},
								name: "dataDivider"
							}],
						name: "recordInfo"
					},
					{
						children: [{
							name: "linkedRecordType",
							value: "presentationGroup"
						}, {
							name: "linkedRecordId",
							value: "autocompleteSearchPGroup"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "presentationId"
					},
					{
						repeatId: "0",
						children: [{
							name: "linkedRecordType",
							value: "recordType"
						}, {
							name: "linkedRecordId",
							value: "metadataItemCollection"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/recordType/metadataItemCollection",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "recordTypeToSearchIn"
					}, {
						name: "searchGroup",
						value: "publicSearch"
					}],
				name: "search"
			},
			actionLinks: {
				// "search" : {
				// "requestMethod" : "GET",
				// "rel" : "search",
				// "url" :
				// "http://epc.ub.uu.se/therest/rest/record/searchResult/metadataItemCollectionSearch",
				// "accept" : "application/vnd.cora.recordList+json"
				// },
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch",
					accept: "application/vnd.cora.record+json"
				},
				read_incoming_links: {
					requestMethod: "GET",
					rel: "read_incoming_links",
					url: "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch/incomingLinks",
					accept: "application/vnd.cora.recordList+json"
				},
				update: {
					requestMethod: "POST",
					rel: "update",
					contentType: "application/vnd.cora.record+json",
					url: "http://epc.ub.uu.se/therest/rest/record/search/metadataItemCollectionSearch",
					accept: "application/vnd.cora.record+json"
				}
			}
		};
		searchArray.textSearch = {
			data: {
				name: "search",
				children: [{
					name: "metadataId",
					children: [{
						name: "linkedRecordType",
						value: "metadataGroup"
					}, {
						name: "linkedRecordId",
						value: "textSearchGroup"
					}]
				}, {
					name: "recordInfo",
					children: [{
						name: "id",
						value: "textSearch"
					}, {
						name: "type",
						children: [{
							name: "linkedRecordType",
							value: "recordType"
						}, {
							name: "linkedRecordId",
							value: "search"
						}]
					}, {
						name: "createdBy",
						children: [{
							name: "linkedRecordType",
							value: "user"
						}, {
							name: "linkedRecordId",
							value: "141414"
						}]
					}, {
						name: "dataDivider",
						children: [{
							name: "linkedRecordType",
							value: "system"
						}, {
							name: "linkedRecordId",
							value: "cora"
						}]
					}]
				}, {
					name: "presentationId",
					children: [{
						name: "linkedRecordType",
						value: "presentationGroup"
					}, {
						name: "linkedRecordId",
						value: "textSearchPGroup"
					}]
				}, {
					name: "recordTypeToSearchIn",
					children: [{
						name: "linkedRecordType",
						value: "recordType"
					}, {
						name: "linkedRecordId",
						value: "coraText"
					}],
					repeatId: "0"
				}, {
					name: "recordTypeToSearchIn",
					children: [{
						name: "linkedRecordType",
						value: "recordType"
					}, {
						name: "linkedRecordId",
						value: "textSystemOne"
					}],
					repeatId: "1"
				}, {
					name: "searchGroup",
					value: "autocomplete"
				}, {
					name: "textId",
					children: [{
						name: "linkedRecordType",
						value: "text"
					}, {
						name: "linkedRecordId",
						value: "textSearchText"
					}]
				}, {
					name: "defTextId",
					children: [{
						name: "linkedRecordType",
						value: "text"
					}, {
						name: "linkedRecordId",
						value: "textSearchDefText"
					}]
				}]
			},
			actionLinks: {
				search: {
					requestMethod: "GET",
					rel: "search",
					url: "http://epc.ub.uu.se/therest/rest/record/searchResult/textSearch",
					accept: "application/vnd.cora.recordList+json"
				},
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://epc.ub.uu.se/therest/rest/record/search/textSearch",
					accept: "application/vnd.cora.record+json"
				},
				read_incoming_links: {
					requestMethod: "GET",
					rel: "read_incoming_links",
					url: "http://epc.ub.uu.se/therest/rest/record/search/textSearch/incomingLinks",
					accept: "application/vnd.cora.recordList+json"
				},
				update: {
					requestMethod: "POST",
					rel: "update",
					contentType: "application/vnd.cora.record+json",
					url: "http://epc.ub.uu.se/therest/rest/record/search/textSearch",
					accept: "application/vnd.cora.record+json"
				}
			}
		};

		let textSearchWithResultPresentation = JSON.parse(JSON.stringify(searchArray.textSearch));
		textSearchWithResultPresentation.data.children.push({
							name: "searchResultPresentation",
							children: [{
								name: "linkedRecordType",
								value: "presentationGroup"
							}, {
								name: "linkedRecordId",
								value: "textSearchResultPGroup"
							}]
						});
		searchArray.textSearchWithResultPresentation = textSearchWithResultPresentation;

		searchArray.metadataSearch = {
			data: {
				children: [
					{
						children: [{
							name: "linkedRecordType",
							value: "metadataGroup"
						}, {
							name: "linkedRecordId",
							value: "autocompleteSearchGroup"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/metadataGroup/autocompleteSearchGroup",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "metadataId"
					},
					{
						children: [
							{
								name: "id",
								value: "metadataSearch"
							},
							{
								name: "type",
								value: "search"
							},
							{
								name: "createdBy",
								children: [{
									name: "linkedRecordType",
									value: "user"
								}, {
									name: "linkedRecordId",
									value: "141414"
								}]
							},
							{
								children: [{
									name: "linkedRecordType",
									value: "system"
								}, {
									name: "linkedRecordId",
									value: "cora"
								}],
								actionLinks: {
									read: {
										requestMethod: "GET",
										rel: "read",
										url: "http://epc.ub.uu.se/therest/rest/record/system/cora",
										accept: "application/vnd.cora.record+json"
									}
								},
								name: "dataDivider"
							}],
						name: "recordInfo"
					},
					{
						children: [{
							name: "linkedRecordType",
							value: "presentationGroup"
						}, {
							name: "linkedRecordId",
							value: "autocompleteSearchPGroup"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/presentationGroup/autocompleteSearchPGroup",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "presentationId"
					},
					{
						repeatId: "0",
						children: [{
							name: "linkedRecordType",
							value: "recordType"
						}, {
							name: "linkedRecordId",
							value: "metadata"
						}],
						actionLinks: {
							read: {
								requestMethod: "GET",
								rel: "read",
								url: "http://epc.ub.uu.se/therest/rest/record/recordType/metadata",
								accept: "application/vnd.cora.record+json"
							}
						},
						name: "recordTypeToSearchIn"
					}, {
						name: "searchGroup",
						value: "autocomplete"
					}],
				name: "search"
			},
			actionLinks: {
				search: {
					requestMethod: "GET",
					rel: "search",
					url: "http://epc.ub.uu.se/therest/rest/record/searchResult/metadataSearch",
					accept: "application/vnd.cora.recordList+json"
				},
				read: {
					requestMethod: "GET",
					rel: "read",
					url: "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch",
					accept: "application/vnd.cora.record+json"
				},
				read_incoming_links: {
					requestMethod: "GET",
					rel: "read_incoming_links",
					url: "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch/incomingLinks",
					accept: "application/vnd.cora.recordList+json"
				},
				update: {
					requestMethod: "POST",
					rel: "update",
					contentType: "application/vnd.cora.record+json",
					url: "http://epc.ub.uu.se/therest/rest/record/search/metadataSearch",
					accept: "application/vnd.cora.record+json"
				}
			}
		};

		const getSearchById = function(searchId) {
			fetchedSearchIds.push(searchId);

			if (searchArray[searchId] !== undefined) {
				return searchArray[searchId];
			} else {

				// default:
				console.log("Id(" + searchId + ") not found in searchProviderSpy");
				throw new Error("Id(" + searchId + ") not found in searchProviderSpy");
			}
		};

		const getAllSearches = function() {
			allSearchesNo++;
			let searchList = [];
			Object.keys(searchArray).forEach(function(id) {
				searchList.push(searchArray[id]);
			});
			return searchList;
		};

		const getFetchedSearchIdNo = function(no) {
			return fetchedSearchIds[no];
		};

		const getAllSearchesFetchedNo = function() {
			return allSearchesNo;
		};

		const reload = function(callWhenReloadedMethodIn) {
			noOfReloads++;
			callWhenReloadedMethod = callWhenReloadedMethodIn;
		};

		const getCallWhenReloadedMethod = function() {
			return callWhenReloadedMethod;
		};

		let callWhenReloadedMethod = function() {
			callWhenReloadedMethod();
		};

		const getNoOfReloads = function() {
			return noOfReloads;
		};

		const getSearchesByGroupId = function(groupIdIn) {
			searchesByGroupIdNo++;
			groupId = groupIdIn;
			let searchList = [];
			searchList.push(searchArray.coraTextSearch);
			searchList.push(searchArray.someSearch);
			searchList.push(searchArray.metadataItemCollectionSearch);
			searchList.push(searchArray.searchWithoutSearchLink);

			return searchList;
		};

		const getSearchesByGroupIdFetchedNo = function() {
			return searchesByGroupIdNo;
		};

		const getGroupId = function() {
			return groupId;
		};

		return Object.freeze({
			type: "searchProviderSpy",
			getSearchById: getSearchById,
			getAllSearches: getAllSearches,
			getSearchesByGroupId: getSearchesByGroupId,
			getFetchedSearchIdNo: getFetchedSearchIdNo,
			getAllSearchesFetchedNo: getAllSearchesFetchedNo,
			getSearchesByGroupIdFetchedNo: getSearchesByGroupIdFetchedNo,
			reload: reload,
			getCallWhenReloadedMethod: getCallWhenReloadedMethod,
			getNoOfReloads: getNoOfReloads,
			callWhenReloadedMethod: callWhenReloadedMethod,
			getGroupId: getGroupId
		});
	};
	return coraTest;
}(CORATEST || {}));