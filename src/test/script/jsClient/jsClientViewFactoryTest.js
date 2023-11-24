/*
 * Copyright 2017 Uppsala University Library
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
"use strict";

QUnit.module("jsClient/jsClientViewFactoryTest.js", {
	beforeEach : function() {
		this.spec = {
			"name" : "someName"
		};
		this.providers = {
			textProvider : {getTranslation : ()=>{return "tramsText"}}
		};
		this.jsClientViewFactory = CORA.jsClientViewFactory(this.providers);
	},
	afterEach : function() {
	}
});

QUnit.test("init", function(assert) {
	assert.ok(this.jsClientViewFactory);
	assert.strictEqual(this.jsClientViewFactory.type, "jsClientViewFactory");
	assert.strictEqual(this.jsClientViewFactory.getProviders, this.providers);
});

QUnit.test("factor", function(assert) {
	let jsClientView = this.jsClientViewFactory.factor(this.spec);
	assert.strictEqual(jsClientView.type, "jsClientView");

	assert.strictEqual(jsClientView.getSpec(), this.spec);
	
	let dependencies = jsClientView.getDependencies();
	assert.strictEqual(dependencies.messageHolderFactory.type, "messageHolderFactory");
});
