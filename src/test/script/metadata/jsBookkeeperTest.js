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
"use strict";
var CORATEST = (function(coraTest) {
	"use strict";
	coraTest.jsBookkeeperFactory = function(metadataProvider, pubSub, textProvider) {
		var factor = function(metadataId, dataHolder) {
			var dependencies = {
				"recordTypeProvider" : CORATEST.recordTypeProviderSpy()
			};
			var spec = {
				"metadataId" : metadataId,
				"metadataProvider" : metadataProvider,
				"pubSub" : pubSub,
				"textProvider" : textProvider,
				"dataHolder" : dataHolder
			};
			return CORA.jsBookkeeper(dependencies, spec);
		};
		return Object.freeze({
			factor : factor
		});
	};

	return coraTest;
}(CORATEST || {}));

QUnit.module("jsBookkeeperTest.js", {
	beforeEach : function() {
		this.dependencies = {
			"recordTypeProvider" : CORATEST.recordTypeProviderSpy()
		};
		this.spec = {
			"metadataId" : "groupIdOneTextChild",
			"metadataProvider" : new MetadataProviderStub(),
			"pubSub" : CORATEST.pubSubSpy(),
			"textProvider" : CORATEST.textProviderStub(),
			"dataHolder" : CORATEST.dataHolderStub()
		};

		this.metadataProvider = new MetadataProviderStub();
		this.pubSub = CORATEST.pubSubSpy();
		this.textProvider = CORATEST.textProviderStub();
		this.dataHolder = CORATEST.dataHolderStub();
		this.newJsBookkeeper = CORATEST.jsBookkeeperFactory(this.metadataProvider, this.pubSub,
				this.textProvider);
	},
	afterEach : function() {
	}
});

QUnit.test("testInit", function(assert) {
	var jsBookkeeper = CORA.jsBookkeeper(this.dependencies, this.spec);
	assert.strictEqual(jsBookkeeper.type, "jsBookkeeper");
});

QUnit.test("testGetSpec", function(assert) {
	var jsBookkeeper = CORA.jsBookkeeper(this.dependencies, this.spec);
	assert.strictEqual(jsBookkeeper.getSpec(), this.spec);
});

QUnit.test("testGetDependencies", function(assert) {
	var jsBookkeeper = CORA.jsBookkeeper(this.dependencies, this.spec);
	assert.strictEqual(jsBookkeeper.getDependencies(), this.dependencies);
});

QUnit.test("testSetValue", function(assert) {
	var jsBookkeeper = this.newJsBookkeeper.factor("groupIdOneTextChild", this.dataHolder);
	var data = {
		"data" : "a Value",
		"path" : {}
	};
	jsBookkeeper.setValue(data);
	var messages = this.pubSub.getMessages();

	var expectedMessage = {
		"type" : "setValue",
		"message" : {
			"data" : "a Value",
			"path" : {}
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);
	assert.equal(messages.length, 1);
});

QUnit.test("testAdd", function(assert) {
	var jsBookkeeper = this.newJsBookkeeper.factor("groupIdOneTextChild", this.dataHolder);
	var childReference = {
		"name" : "childReference",
		"repeatId" : "1",
		"children" : [ {
			"name" : "ref",
			"children" : [ {
				"name" : "linkedRecordType",
				"value" : "metadataTextVariable"
			}, {
				"name" : "linkedRecordId",
				"value" : "textVariableId"
			} ],
			"attributes" : {
				"type" : "textVariable"
			}
		}, {
			"name" : "repeatMin",
			"value" : "1"
		}, {
			"name" : "repeatMax",
			"value" : "1"
		} ]
	};
	var data = {
		"metadataId" : "textVariableId",
		"path" : {},
		"childReference" : childReference
	};
	var calculatedRepeatId = jsBookkeeper.add(data);
	var messages = this.pubSub.getMessages();
	var expectedMessage = {
		"type" : "add",
		"message" : {
			"metadataId" : "textVariableId",
			"path" : {},
			"nameInData" : "textVariableId"
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);

	assert.equal(messages.length, 1);
	assert.strictEqual(calculatedRepeatId, undefined);

});
QUnit.test("testAddRepeating", function(assert) {
	var currentData = {
		"name" : "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
		"children" : [ {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVar",
				"value" : "one",
				"repeatId" : "one"
			}, {
				"name" : "textVar",
				"value" : "two",
				"repeatId" : "2"
			}, {
				"name" : "textVar",
				"value" : "three",
				"repeatId" : "1"
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			},
			"repeatId" : "1"
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVar",
				"value" : "three",
				"repeatId" : "3"
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			},
			"repeatId" : "2"
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVar",
				"value" : "four",
				"repeatId" : "4"
			} ],
			"attributes" : {
				"anOtherAttribute" : "aOtherFinalValue"
			},
			"repeatId" : "3"
		} ]
	};
	var foundContainer = {
		"name" : "textVarRepeat1to3InGroupOneAttribute",
		"children" : [ {
			"name" : "textVar",
			"value" : "one",
			"repeatId" : "one"
		}, {
			"name" : "textVar",
			"value" : "two",
			"repeatId" : "2"
		}, {
			"name" : "textVar",
			"value" : "three",
			"repeatId" : "1"
		} ],
		"attributes" : {
			"anAttribute" : "aFinalValue"
		},
		"repeatId" : "1"
	};
	var dataHolder = CORATEST.dataHolderStub(currentData, foundContainer);
	var jsBookkeeper = this.newJsBookkeeper.factor("groupIdOneTextChild", dataHolder);
	var data = {
		"metadataId" : "textVar",
		"path" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVarRepeat1to3InGroupOneAttribute"
			}, {
				"name" : "repeatId",
				"value" : "1"
			}, {
				"name" : "attributes",
				"children" : [ {
					"name" : "attribute",
					"repeatId" : "1",
					"children" : [ {
						"name" : "attributeName",
						"value" : "anAttribute"
					}, {
						"name" : "attributeValue",
						"value" : "aFinalValue"
					} ]
				} ]
			} ]
		},
		"childReference" : {
			"name" : "childReference",
			"repeatId" : "1",
			"children" : [ {
				"name" : "ref",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadataTextVariable"
				}, {
					"name" : "linkedRecordId",
					"value" : "textVar"
				} ],
				"attributes" : {
					"type" : "textVariable"
				}
			}, {
				"name" : "repeatMin",
				"value" : "1"
			}, {
				"name" : "repeatMax",
				"value" : "3"
			} ]
		}
	};
	var calculatedRepeatId = jsBookkeeper.add(data);
	var messages = this.pubSub.getMessages();
	var expectedMessage = {
		"type" : "add",
		"message" : {
			"metadataId" : "textVar",
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name" : "repeatId",
					"value" : "1"
				}, {
					"name" : "attributes",
					"children" : [ {
						"name" : "attribute",
						"repeatId" : "1",
						"children" : [ {
							"name" : "attributeName",
							"value" : "anAttribute"
						}, {
							"name" : "attributeValue",
							"value" : "aFinalValue"
						} ]
					} ]
				} ]
			},
			"repeatId" : "3",
			"nameInData" : "textVar"
		}
	};

	assert.stringifyEqual(messages[0], expectedMessage);

	assert.equal(messages.length, 1);
	assert.strictEqual(calculatedRepeatId, "3");
});
QUnit.test("testAddAbove", function(assert) {
	var currentData = {
		"name" : "textVarRepeat1to3InGroupOneAttributeAndOtherAttributeRepeat0to2InGroup",
		"children" : [ {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVar",
				"value" : "one",
				"repeatId" : "one"
			}, {
				"name" : "textVar",
				"value" : "two",
				"repeatId" : "2"
			}, {
				"name" : "textVar",
				"value" : "three",
				"repeatId" : "1"
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			},
			"repeatId" : "1"
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVar",
				"value" : "three",
				"repeatId" : "3"
			} ],
			"attributes" : {
				"anAttribute" : "aFinalValue"
			},
			"repeatId" : "2"
		}, {
			"name" : "textVarRepeat1to3InGroupOneAttribute",
			"children" : [ {
				"name" : "textVar",
				"value" : "four",
				"repeatId" : "4"
			} ],
			"attributes" : {
				"anOtherAttribute" : "aOtherFinalValue"
			},
			"repeatId" : "3"
		} ]
	};
	var foundContainer = {
		"name" : "textVarRepeat1to3InGroupOneAttribute",
		"children" : [ {
			"name" : "textVar",
			"value" : "one",
			"repeatId" : "one"
		}, {
			"name" : "textVar",
			"value" : "two",
			"repeatId" : "2"
		}, {
			"name" : "textVar",
			"value" : "three",
			"repeatId" : "1"
		} ],
		"attributes" : {
			"anAttribute" : "aFinalValue"
		},
		"repeatId" : "1"
	};
	var dataHolder = CORATEST.dataHolderStub(currentData, foundContainer);
	var jsBookkeeper = this.newJsBookkeeper.factor("groupIdOneTextChild", dataHolder);
	var data = {
		"metadataId" : "textVar",
		"path" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVarRepeat1to3InGroupOneAttribute"
			}, {
				"name" : "repeatId",
				"value" : "1"
			}, {
				"name" : "attributes",
				"children" : [ {
					"name" : "attribute",
					"repeatId" : "1",
					"children" : [ {
						"name" : "attributeName",
						"value" : "anAttribute"
					}, {
						"name" : "attributeValue",
						"value" : "aFinalValue"
					} ]
				} ]
			} ]
		},
		"childReference" : {
			"name" : "childReference",
			"repeatId" : "1",
			"children" : [ {
				"name" : "ref",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadataTextVariable"
				}, {
					"name" : "linkedRecordId",
					"value" : "textVar"
				} ],
				"attributes" : {
					"type" : "textVariable"
				}
			}, {
				"name" : "repeatMin",
				"value" : "1"
			}, {
				"name" : "repeatMax",
				"value" : "3"
			} ]
		},
		addAbovePath : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVarRepeat1to3InGroupOneAttribute"
			}, {
				"name" : "repeatId",
				"value" : "1"
			}, {
				"name" : "attributes",
				"children" : [ {
					"name" : "attribute",
					"repeatId" : "1",
					"children" : [ {
						"name" : "attributeName",
						"value" : "anAttribute"
					}, {
						"name" : "attributeValue",
						"value" : "aFinalValue"
					} ]
				} ]
			}, {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVar"
				}, {
					"name" : "repeatId",
					"value" : "one"
				}
				// , {
				// "name" : "attributes",
				// "children" : [ {
				// "name" : "attribute",
				// "repeatId" : "1",
				// "children" : [ {
				// "name" : "attributeName",
				// "value" : "anAttribute"
				// }, {
				// "name" : "attributeValue",
				// "value" : "aFinalValue"
				// } ]
				// } ]
				// }
				]
			} ]
		}
	};
	var calculatedRepeatId = jsBookkeeper.addAbove(data);
	var messages = this.pubSub.getMessages();
	var expectedMessage = {
		"type" : "add",
		"message" : {
			"metadataId" : "textVar",
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name" : "repeatId",
					"value" : "1"
				}, {
					"name" : "attributes",
					"children" : [ {
						"name" : "attribute",
						"repeatId" : "1",
						"children" : [ {
							"name" : "attributeName",
							"value" : "anAttribute"
						}, {
							"name" : "attributeValue",
							"value" : "aFinalValue"
						} ]
					} ]
				} ]
			},
			"repeatId" : "3",
			"nameInData" : "textVar"
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);

	var expectedMessage2 = {
		"type" : "move",
		"message" : {
			"path" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name" : "repeatId",
					"value" : "1"
				}, {
					"name" : "attributes",
					"children" : [ {
						"name" : "attribute",
						"repeatId" : "1",
						"children" : [ {
							"name" : "attributeName",
							"value" : "anAttribute"
						}, {
							"name" : "attributeValue",
							"value" : "aFinalValue"
						} ]
					} ]
				} ]
			},
			"metadataId" : "textVar",
			"moveChild" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name" : "repeatId",
					"value" : "1"
				}, {
					"name" : "attributes",
					"children" : [ {
						"name" : "attribute",
						"repeatId" : "1",
						"children" : [ {
							"name" : "attributeName",
							"value" : "anAttribute"
						}, {
							"name" : "attributeValue",
							"value" : "aFinalValue"
						} ]
					} ]
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "textVar"
					}, {
						"name" : "repeatId",
						"value" : "3"
					} ]
				} ]
			},
			"basePositionOnChild" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVarRepeat1to3InGroupOneAttribute"
				}, {
					"name" : "repeatId",
					"value" : "1"
				}, {
					"name" : "attributes",
					"children" : [ {
						"name" : "attribute",
						"repeatId" : "1",
						"children" : [ {
							"name" : "attributeName",
							"value" : "anAttribute"
						}, {
							"name" : "attributeValue",
							"value" : "aFinalValue"
						} ]
					} ]
				}, {
					"name" : "linkedPath",
					"children" : [ {
						"name" : "nameInData",
						"value" : "textVar"
					}, {
						"name" : "repeatId",
						"value" : "one"
					} ]
				} ]
			},
			"newPosition" : "above"
		}
	};
	assert.stringifyEqual(messages[1], expectedMessage2);

	assert.equal(messages.length, 2);
	// assert.strictEqual(calculatedRepeatId, "3");
});

QUnit.test("testRemove", function(assert) {
	var jsBookkeeper = this.newJsBookkeeper.factor("groupIdOneTextChild", this.dataHolder);
	var data = {
		"path" : {}
	};
	jsBookkeeper.remove(data);
	var messages = this.pubSub.getMessages();
	var expectedMessage = {
		"type" : "remove",
		"message" : {
			"path" : {}
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);

	assert.equal(messages.length, 1);

	var unsubscriptionsPathBelow = this.pubSub.getUnsubscriptionsPathBelow();
	assert.equal(unsubscriptionsPathBelow.length, 1);
	assert.stringifyEqual(unsubscriptionsPathBelow[0], {});
});

QUnit.test("testMove", function(assert) {
	var jsBookkeeper = this.newJsBookkeeper.factor("groupIdOneTextChild", this.dataHolder);
	var data = {
		"path" : {},
		"moveChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "one"
			} ]
		},
		"basePositionOnChild" : {
			"name" : "linkedPath",
			"children" : [ {
				"name" : "nameInData",
				"value" : "textVariableId"
			}, {
				"name" : "repeatId",
				"value" : "two"
			} ]
		},
		"newPosition" : "after"
	};
	jsBookkeeper.move(data);
	var messages = this.pubSub.getMessages();
	var expectedMessage = {
		"type" : "move",
		"message" : {
			"path" : {},
			"moveChild" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVariableId"
				}, {
					"name" : "repeatId",
					"value" : "one"
				} ]
			},
			"basePositionOnChild" : {
				"name" : "linkedPath",
				"children" : [ {
					"name" : "nameInData",
					"value" : "textVariableId"
				}, {
					"name" : "repeatId",
					"value" : "two"
				} ]
			},
			"newPosition" : "after"
		}
	};
	assert.stringifyEqual(messages[0], expectedMessage);

	assert.equal(messages.length, 1);
});
