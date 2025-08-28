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
	cora.uploadManagerView = function(spec) {
		var out;

		var workView = CORA.createSpanWithClassName("workView");
		workView.appendChild(CORA.createSpanWithClassName("indexOrders"));
		var menuView = createMenuView(spec.textProvider.getTranslation("theClient_uploadMenuText"));

		function createMenuView(text) {
			var menuViewNew = CORA.createSpanWithClassName("upload");
			menuViewNew.textContent = text;
			return menuViewNew;
		}

		function addFile(name) {
			var child = CORA.createSpanWithClassName("listItem");
			child.textContent = name;
			workView.appendChild(child);

			var progress = document.createElement("progress");
			progress.className = "progress";
			progress.min = 0;
			progress.max = 100;
			progress.value = 0;
			child.appendChild(progress);
			child.progress = progress;

			child.progressMethod = function(progressEvent) {
				if (progressEvent.lengthComputable) {
					var percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					progress.value = percentage;
				}
			};

			child.errorMethod = function() {
				child.appendChild(document.createTextNode("ERROR"));
			};
			child.timeoutMethod = function() {
				child.appendChild(document.createTextNode("TIMEOUT"));
			};
			return child;
		}

		function activate() {
			menuView.className = menuView.className + " uploading";
		}

		function deactivate() {
			menuView.className = menuView.className.replace(" uploading", "");
		}

		function getMenuView() {
			return menuView;
		}
		function getWorkView() {
			return workView;
		}

		function getSpec() {
			return spec;
		}

		out = Object.freeze({
			"type" : "uploadManagerView",
			getSpec : getSpec,
			getMenuView : getMenuView,
			getWorkView : getWorkView,
			addFile : addFile,
			activate : activate,
			deactivate : deactivate
		});

		return out;
	};

	return cora;
}(CORA));