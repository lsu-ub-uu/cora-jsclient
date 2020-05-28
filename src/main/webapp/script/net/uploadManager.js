/*
 * Copyright 2016 Uppsala University Library
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
	cora.uploadManager = function(dependencies, spec) {
		var uploading = false;
		var uploadQue = [];
		var viewSpec = {
			"showWorkViewMethod" : showView,
			"textProvider" : dependencies.textProvider
		};
		var view = CORA.uploadManagerView(viewSpec);

		var managedGuiItem = createManagedGuiItem();

		function showView(managedGuiItemToShow) {
			dependencies.clientInstanceProvider.getJsClient().showView(managedGuiItemToShow);
		}

		function upload(uploadSpec) {
			var uploadLink = uploadSpec.uploadLink;
			var formData = new FormData();
			formData.append("file", uploadSpec.file);

			var fileView = view.addFile(uploadSpec.file.name);
			var callSpec = {
				"requestMethod" : uploadLink.requestMethod,
				"url" : uploadLink.url,
				"accept" : uploadLink.accept,
				"loadMethod" : uploadFinished,
				"errorMethod" : fileView.errorMethod,
				"timeoutMethod" : fileView.timeoutMethod,
				"data" : formData,
				// long time needed as time between last progress and answer can
				// be long (flusing)
				"timeoutInMS" : 600000,
				"uploadProgressMethod" : fileView.progressMethod
			};
			uploadQue.push(callSpec);
			possiblyStartNextUpload();

		}

		function createManagedGuiItem() {
			var managedGuiItemSpec = {
				"activateMethod" : showView,
				"disableRemove" : "true"
			};
			var createdMGI = dependencies.managedGuiItemFactory.factor(managedGuiItemSpec);
			createdMGI.addMenuPresentation(view.getMenuView());
			createdMGI.addWorkPresentation(view.getWorkView());
			return createdMGI;
		}

		function uploadFinished() {
			uploading = false;
			view.deactivate();
			possiblyStartNextUpload();
		}

		function possiblyStartNextUpload() {
			if (getCurrentlyNotUploading()) {
				startNextUploadIfThereIsMoreInQueue();
			}
		}

		function getCurrentlyNotUploading() {
			return uploading !== true;
		}

		function startNextUploadIfThereIsMoreInQueue() {
			var callSpec = uploadQue.shift();
			if (callSpec !== undefined) {
				startNextUpload(callSpec);
			}
		}

		function startNextUpload(callSpec) {
			uploading = true;
			view.activate();
			dependencies.ajaxCallFactory.factor(callSpec);
		}

		function getDependencies() {
			return dependencies;
		}
		function getSpec() {
			return spec;
		}
		function getManagedGuiItem() {
			return managedGuiItem;
		}
		return Object.freeze({
			"type" : "uploadManager",
			getDependencies : getDependencies,
			getSpec : getSpec,
			getManagedGuiItem : getManagedGuiItem,
			upload : upload,
			uploadFinished : uploadFinished,
			view : view,
			showView : showView
		});
	};

	return cora;
}(CORA));