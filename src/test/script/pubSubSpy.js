/*
 * Copyright 2015 Olov McKie
 * Copyright 2020 Uppsala University Library
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
	coraTest.pubSubSpy = function() {

		var messages = [];
		var subscriptions = [];
		var subscriptionId = 0;
		var unsubscriptions = [];
		var unsubscriptionsPathBelow = [];

		function publish(type, message) {
//			console.log("publish "+JSON.stringify(message));
			messages.push({
				"type" : type,
				"message" : message
			});
		}

		function getMessages() {
			return messages;
		}

		function subscribe(type, path, context, functionToCall) {
			subscriptionId++;
			subscriptions.push({
				"type" : type,
				"path" : path,
				"context" : context,
				"functionToCall" : functionToCall,
				"subscriptionId" : subscriptionId
			});
			return subscriptionId;
		}

		function getSubscriptions() {
			return subscriptions;
		}

		function unsubscribe(id) {
			unsubscriptions.push(id);
		}

		function getUnsubscriptions() {
			return unsubscriptions;
		}

		function unsubscribePathBelow(path) {
			unsubscriptionsPathBelow.push(path);
		}
		
		function getUnsubscriptionsPathBelow() {
			return unsubscriptionsPathBelow;
		}
		
		return Object.freeze({
			type : "pubSubSpy",
			publish : publish,
			getMessages : getMessages,
			subscribe : subscribe,
			getSubscriptions : getSubscriptions,
			unsubscribe : unsubscribe,
			getUnsubscriptions : getUnsubscriptions,
			unsubscribePathBelow : unsubscribePathBelow,
			getUnsubscriptionsPathBelow : getUnsubscriptionsPathBelow
		});
	};
	return coraTest;
}(CORATEST || {}));