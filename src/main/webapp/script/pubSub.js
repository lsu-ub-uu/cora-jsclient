/*
 * Copyright 2016 Uppsala University Library
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

var CORA = (function(cora) {
	"use strict";
	cora.pubSub = function() {
		var arbiter = Arbiter.create();

		function subscribe(type, path, context, functionToCall) {
			return arbiter.subscribe(convertPathToMsg(path) + type, null, context, functionToCall);
		}

		function publish(type, data) {
			var convertedPath = convertPathToMsg(data.path) + type;
			var everyThingOk = arbiter.publish(convertedPath, data);
			if (!everyThingOk) {
				var errorMessage = "";
				arbiter.getErrorArray().forEach(function(error) {
					errorMessage += " " + error.message;
					errorMessage += " " + error.stack;
				});
				throw new Error("Errors generated when publishing: " + errorMessage);
			}
		}

		function unsubscribe(subscribeId) {
			return arbiter.unsubscribe(subscribeId);
		}

		function convertPathToMsg(path) {
			return convertAndAddPathToMsg(path, "root");
		}

		function convertAndAddPathToMsg(path, msgPart) {
			var extendedMsgPart = msgPart + "/";
			//			if (pathHasAtLeastOneLevel(cPath)) {
			//			if (path.length > 0) {
			//				extendedMsgPart += recursivelyConvertPathToMsg(cPath);
			//			}
			for (let pathPart in path) {
				extendedMsgPart += path[pathPart] + "/";
			}
			return extendedMsgPart;
		}

//		function pathHasAtLeastOneLevel(cPath) {
//			return cPath.getData().children !== undefined
//				&& cPath.containsChildWithNameInData("nameInData");
//		}
//
//		function recursivelyConvertPathToMsg(cPath) {
//			var msgPart = "";
//			msgPart += cPath.getFirstAtomicValueByNameInData("nameInData");
//			msgPart += convertPathAttributes(cPath);
//			msgPart += convertRepeatId(cPath);
//
//			if (pathHasMoreLevels(cPath)) {
//				return convertAndAddPathToMsg(cPath.getFirstChildByNameInData("linkedPath"),
//					msgPart);
//			}
//			msgPart += "/";
//			return msgPart;
//		}

//		function pathHasMoreLevels(cPath) {
//			return cPath.containsChildWithNameInData("linkedPath");
//		}

		function convertPathAttributes(cPath) {
			var msgAttribPart = "";
			if (cPath.containsChildWithNameInData("attributes")) {
				var attributes = cPath.getFirstChildByNameInData("attributes").children;
				attributes.forEach(function(attribute) {
					var cAttribute = CORA.coraData(attribute);
					msgAttribPart += '#'
						+ cAttribute.getFirstAtomicValueByNameInData("attributeName");
					msgAttribPart += ':'
						+ cAttribute.getFirstAtomicValueByNameInData("attributeValue");
				});
			}
			return msgAttribPart;
		}

		function convertRepeatId(cPath) {
			if (cPath.containsChildWithNameInData("repeatId")) {
				return '.' + cPath.getFirstAtomicValueByNameInData("repeatId");
			}
			return "";
		}

		function unsubscribePathBelow(startOfPath) {
			arbiter.unsubscribePathBelow(convertPathToMsg(startOfPath));
		}

		return Object.freeze({
			"type": "pubSub",
			subscribe: subscribe,
			unsubscribe: unsubscribe,
			unsubscribePathBelow: unsubscribePathBelow,
			publish: publish,
			convertPathToMsg: convertPathToMsg
		});
	};
	return cora;
}(CORA));