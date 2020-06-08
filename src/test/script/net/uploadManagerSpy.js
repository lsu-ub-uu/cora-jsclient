/*
 * Copyright 2016, 2018 Uppsala University Library
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
	coraTest.uploadManagerSpy = function() {
		var uploadWasCalled = false;
		var uploadSpecs = [];
		var workView = CORA.gui.createSpanWithClassName("workViewSpy");
		workView.appendChild(CORA.gui.createSpanWithClassName("indexOrders"));
		var view = {};
		view.getWorkView = function () {
			return workView;
		};

		function upload(uploadSpec) {
			uploadWasCalled = true;
			uploadSpecs.push(uploadSpec);
		}

		function wasUploadCalled() {
			return uploadWasCalled;
		}
		var item = CORATEST.managedGuiItemSpy();
		function getManagedGuiItem() {
			return item;
		}
		var out = Object.freeze({
			upload : upload,
			wasUploadCalled : wasUploadCalled,
			uploadSpecs : uploadSpecs,
			view : view,
			getManagedGuiItem : getManagedGuiItem
		});
		return out;
	};
	return coraTest;
}(CORATEST || {}));