/*
 * Copyright 2016 Olov McKie
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
	cora.messageHolderSpy = function() {
		var view = createView();
		var createdMessages = [];
		function createView() {
			return CORA.gui.createDivWithClassName("messageHolderSpy");
		}

		function createMessage(messageSpec) {
			createdMessages.push(messageSpec);
		}
		function getCreatedMessageSpec(number) {
			return createdMessages[number];
		}

		function getView() {
			return view;
		}

		var out = Object.freeze({
			getView : getView,
			createMessage : createMessage,
			getCreatedMessageSpec : getCreatedMessageSpec
		});
		view.modelObject = out;
		return out;
	};
	return cora;
}(CORATEST || {}));