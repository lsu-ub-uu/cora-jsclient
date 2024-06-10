/*
 * Copyright 2017, 2018 Uppsala University Library
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
var CORATEST = (function(cora) {
	"use strict";
	cora.windowSpy = function(dependencies, spec) {
		let url = "";
		let name = "";
		let postedMessages = [];
		let fakeOpenedWindow = {
			fake : "fakeWindow"
		};
		
		const getDependencies = function() {
			return dependencies;
		};
		
		const getSpec = function() {
			return spec;
		};

		const open = function(urlIn, nameIn) {
			url = urlIn;
			name = nameIn;
			return fakeOpenedWindow;
		};
		
		const getOpenedUrl = function() {
			return url;
		};
		
		const getOpenedName = function() {
			return name;
		};

		const postMessage = function(data, origin) {
			postedMessages.push({
				data : data,
				origin : origin
			});
		};
		
		const getPostedMessages = function(no) {
			return postedMessages[no];
		};
		
		let out = Object.freeze({
			type : "windowSpy",
			getDependencies : getDependencies,
			getSpec : getSpec,
			open : open,
			getOpenedUrl : getOpenedUrl,
			getOpenedName : getOpenedName,
			fakeOpenedWindow : fakeOpenedWindow,
			postMessage : postMessage,
			getPostedMessages : getPostedMessages
		});
		return out;
	};

	return cora;
}(CORATEST || {}));