/*
 * Copyright 2016, 2017 Uppsala University Library
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
	coraTest.jsClientViewSpy = function(spec) {
		var searchViews = [];
		var recordTypeViews = [];
		var loginManagerViews = [];
		var workViews = [];
		var removedWorkViews = [];
		var openGuiItemHandlerViews = [];
		var addedGlobalViews = [];

		var recordTypesClearedNoOfTimes = 0;
		var searchesClearedNoOfTimes = 0;
		var html = CORA.gui.createSpanWithClassName("jsClientViewSpy");
		function getHtml() {
			return html;
		}
		var view = CORA.gui.createSpanWithClassName("jsClientViewSpy");
		function getView() {
			return view;
		}
		function addToSearchesView(searchView) {
			searchViews.push(searchView);
		}
		function getSearchesView(number) {
			return searchViews[number];
		}
		function addToRecordTypesView(recordTypeView) {
			recordTypeViews.push(recordTypeView);
		}
		function getRecordTypesView(number) {
			return recordTypeViews[number];
		}

		function addLoginManagerView(viewToAdd) {
			loginManagerViews.push(viewToAdd);
		}
		function getLoginManagerView(number) {
			return loginManagerViews[number];
		}

		var workView = CORA.gui.createSpanWithClassName("workViewSpy");
		function addToWorkView(viewToAdd) {
			workView.appendChild(viewToAdd);
			workViews.push(viewToAdd);
		}

		function getAddedWorkView(number) {
			return workViews[number];
		}

		function getWorkView() {
			return workView;
		}
		function addGlobalView(viewToAdd) {
			// return workView;
			addedGlobalViews.push(viewToAdd);
		}
		function getAddedGlobalView(number) {
			return addedGlobalViews[number];
		}

		function clearRecordTypesView() {
			recordTypesClearedNoOfTimes++;
			recordTypeViews = [];
		}
		function getRecordTypesClearedNoOfTimes() {
			return recordTypesClearedNoOfTimes;
		}
		
		function clearSearchesView() {
			searchesClearedNoOfTimes++;
			searchViews = [];
		}
		function getSearchesClearedNoOfTimes() {
			return searchesClearedNoOfTimes;
		}

		function removeFromWorkView(viewToRemove) {
			removedWorkViews.push(viewToRemove);
		}
		function getRemovedWorkView(number) {
			return removedWorkViews[number];
		}

		function addOpenGuiItemHandlerView(viewToRemove) {
			openGuiItemHandlerViews.push(viewToRemove);
		}
		function getAddedOpenGuiItemHandlerView(number) {
			return openGuiItemHandlerViews[number];
		}

		var reloadingProviders = false;
		function setReloadingProviders(status) {
			reloadingProviders = status;
		}
		function getReloadingProviders() {
			return reloadingProviders;
		}

		var groupOfRecordTypes = [];
		function getGroupOfRecordTypes(number){
			return groupOfRecordTypes[number];
		}
		function addGroupOfRecordTypesToView(groupIn){
			groupOfRecordTypes.push(groupIn);
		}
		
		var out = Object.freeze({
			"type" : "jsClientViewSpy",
			getView : getView,
			addToSearchesView : addToSearchesView,
			getSearchesView : getSearchesView,
			addToRecordTypesView : addToRecordTypesView,
			getRecordTypesView : getRecordTypesView,
			addLoginManagerView : addLoginManagerView,
			getLoginManagerView : getLoginManagerView,
			clearRecordTypesView : clearRecordTypesView,
			getRecordTypesClearedNoOfTimes : getRecordTypesClearedNoOfTimes,
			clearSearchesView : clearSearchesView,
			getSearchesClearedNoOfTimes : getSearchesClearedNoOfTimes,
			getWorkView : getWorkView,
			addToWorkView : addToWorkView,
			getAddedWorkView : getAddedWorkView,
			addGlobalView : addGlobalView,
			getAddedGlobalView : getAddedGlobalView,
			removeFromWorkView : removeFromWorkView,
			getRemovedWorkView : getRemovedWorkView,
			addOpenGuiItemHandlerView : addOpenGuiItemHandlerView,
			getAddedOpenGuiItemHandlerView : getAddedOpenGuiItemHandlerView,

			setReloadingProviders : setReloadingProviders,
			getReloadingProviders : getReloadingProviders,
			
			getGroupOfRecordTypes:getGroupOfRecordTypes,
			addGroupOfRecordTypesToView:addGroupOfRecordTypesToView
			
		});

		return out;
	};
	return coraTest;
}(CORATEST || {}));
