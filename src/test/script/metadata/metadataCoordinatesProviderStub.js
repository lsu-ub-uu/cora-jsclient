/*
 * Copyright 2015, 2016, 2017 Olov McKie
 * Copyright 2015, 2017 Uppsala University Library
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

function MetadataCoordinatesProviderStub() {
	this.getMetadataById = function(idToGet) {
		switch (idToGet) {
		case "coordinatesPGroup":
			return {
				"name" : "presentation",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "coordinatesPGroup"
					}, {
						"name" : "type",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "presentationGroup"
						} ]
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "systemOneUser"
						}, {
							"name" : "linkedRecordId",
							"value" : "141414"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "bibsys"
						} ]
					}, {
						"name" : "tsCreated",
						"value" : "2017-10-01 00:00:00.0"
					}, {
						"name" : "updated",
						"children" : [ {
							"name" : "updatedBy",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "systemOneUser"
							}, {
								"name" : "linkedRecordId",
								"value" : "141414"
							} ]
						}, {
							"name" : "tsUpdated",
							"value" : "2017-11-01 17:56:07.0"
						} ],
						"repeatId" : "0"
					}, {
						"name" : "updated",
						"children" : [ {
							"name" : "updatedBy",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "user"
							}, {
								"name" : "linkedRecordId",
								"value" : "141414"
							} ]
						}, {
							"name" : "tsUpdated",
							"value" : "2018-08-28 09:52:29.872"
						} ],
						"repeatId" : "1"
					} ]
				}, {
					"name" : "presentationOf",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "metadataGroup"
					}, {
						"name" : "linkedRecordId",
						"value" : "coordinatesGroup"
					} ]
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"children" : [ {
							"name" : "refGroup",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "coraText"
								}, {
									"name" : "linkedRecordId",
									"value" : "latitudeTextVarText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ],
							"repeatId" : "0"
						}, {
							"name" : "minNumberOfRepeatingToShow",
							"value" : ""
						}, {
							"name" : "textStyle",
							"value" : ""
						}, {
							"name" : "childStyle",
							"value" : "",
							"repeatId" : "1"
						} ],
						"repeatId" : "2"
					}, {
						"name" : "childReference",
						"children" : [ {
							"name" : "refGroup",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentationVar"
								}, {
									"name" : "linkedRecordId",
									"value" : "latitudePVar"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ],
							"repeatId" : "0"
						}, {
							"name" : "minNumberOfRepeatingToShow",
							"value" : ""
						}, {
							"name" : "textStyle",
							"value" : ""
						}, {
							"name" : "childStyle",
							"value" : "",
							"repeatId" : "1"
						} ],
						"repeatId" : "0"
					}, {
						"name" : "childReference",
						"children" : [ {
							"name" : "refGroup",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "coraText"
								}, {
									"name" : "linkedRecordId",
									"value" : "longitudeTextVarText"
								} ],
								"attributes" : {
									"type" : "text"
								}
							} ],
							"repeatId" : "0"
						}, {
							"name" : "minNumberOfRepeatingToShow",
							"value" : ""
						}, {
							"name" : "textStyle",
							"value" : ""
						}, {
							"name" : "childStyle",
							"value" : "",
							"repeatId" : "1"
						} ],
						"repeatId" : "3"
					}, {
						"name" : "childReference",
						"children" : [ {
							"name" : "refGroup",
							"children" : [ {
								"name" : "ref",
								"children" : [ {
									"name" : "linkedRecordType",
									"value" : "presentationVar"
								}, {
									"name" : "linkedRecordId",
									"value" : "longitudePVar"
								} ],
								"attributes" : {
									"type" : "presentation"
								}
							} ],
							"repeatId" : "0"
						}, {
							"name" : "minNumberOfRepeatingToShow",
							"value" : ""
						}, {
							"name" : "textStyle",
							"value" : ""
						}, {
							"name" : "childStyle",
							"value" : "",
							"repeatId" : "1"
						} ],
						"repeatId" : "1"
					} ]
				}, {
					"name" : "presentAs",
					"value" : "map"
				}, {
					"name" : "mode",
					"value" : "input"
				} ],
				"attributes" : {
					"type" : "pGroup"
				}
			};
		case "coordinatesOutputPGroup":
			return {
			"name" : "presentation",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "coordinatesPGroup"
				}, {
					"name" : "type",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "recordType"
					}, {
						"name" : "linkedRecordId",
						"value" : "presentationGroup"
					} ]
				}, {
					"name" : "createdBy",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "systemOneUser"
					}, {
						"name" : "linkedRecordId",
						"value" : "141414"
					} ]
				}, {
					"name" : "dataDivider",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "system"
					}, {
						"name" : "linkedRecordId",
						"value" : "bibsys"
					} ]
				}, {
					"name" : "tsCreated",
					"value" : "2017-10-01 00:00:00.0"
				}, {
					"name" : "updated",
					"children" : [ {
						"name" : "updatedBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "systemOneUser"
						}, {
							"name" : "linkedRecordId",
							"value" : "141414"
						} ]
					}, {
						"name" : "tsUpdated",
						"value" : "2017-11-01 17:56:07.0"
					} ],
					"repeatId" : "0"
				}, {
					"name" : "updated",
					"children" : [ {
						"name" : "updatedBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "user"
						}, {
							"name" : "linkedRecordId",
							"value" : "141414"
						} ]
					}, {
						"name" : "tsUpdated",
						"value" : "2018-08-28 09:52:29.872"
					} ],
					"repeatId" : "1"
				} ]
			}, {
				"name" : "presentationOf",
				"children" : [ {
					"name" : "linkedRecordType",
					"value" : "metadataGroup"
				}, {
					"name" : "linkedRecordId",
					"value" : "coordinatesGroup"
				} ]
			}, {
				"name" : "childReferences",
				"children" : [ {
					"name" : "childReference",
					"children" : [ {
						"name" : "refGroup",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "coraText"
							}, {
								"name" : "linkedRecordId",
								"value" : "latitudeTextVarText"
							} ],
							"attributes" : {
								"type" : "text"
							}
						} ],
						"repeatId" : "0"
					}, {
						"name" : "minNumberOfRepeatingToShow",
						"value" : ""
					}, {
						"name" : "textStyle",
						"value" : ""
					}, {
						"name" : "childStyle",
						"value" : "",
						"repeatId" : "1"
					} ],
					"repeatId" : "2"
				}, {
					"name" : "childReference",
					"children" : [ {
						"name" : "refGroup",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "presentationVar"
							}, {
								"name" : "linkedRecordId",
								"value" : "latitudePVar"
							} ],
							"attributes" : {
								"type" : "presentation"
							}
						} ],
						"repeatId" : "0"
					}, {
						"name" : "minNumberOfRepeatingToShow",
						"value" : ""
					}, {
						"name" : "textStyle",
						"value" : ""
					}, {
						"name" : "childStyle",
						"value" : "",
						"repeatId" : "1"
					} ],
					"repeatId" : "0"
				}, {
					"name" : "childReference",
					"children" : [ {
						"name" : "refGroup",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "coraText"
							}, {
								"name" : "linkedRecordId",
								"value" : "longitudeTextVarText"
							} ],
							"attributes" : {
								"type" : "text"
							}
						} ],
						"repeatId" : "0"
					}, {
						"name" : "minNumberOfRepeatingToShow",
						"value" : ""
					}, {
						"name" : "textStyle",
						"value" : ""
					}, {
						"name" : "childStyle",
						"value" : "",
						"repeatId" : "1"
					} ],
					"repeatId" : "3"
				}, {
					"name" : "childReference",
					"children" : [ {
						"name" : "refGroup",
						"children" : [ {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "presentationVar"
							}, {
								"name" : "linkedRecordId",
								"value" : "longitudePVar"
							} ],
							"attributes" : {
								"type" : "presentation"
							}
						} ],
						"repeatId" : "0"
					}, {
						"name" : "minNumberOfRepeatingToShow",
						"value" : ""
					}, {
						"name" : "textStyle",
						"value" : ""
					}, {
						"name" : "childStyle",
						"value" : "",
						"repeatId" : "1"
					} ],
					"repeatId" : "1"
				} ]
			}, {
				"name" : "presentAs",
				"value" : "map"
			}, {
				"name" : "mode",
				"value" : "output"
			} ],
			"attributes" : {
				"type" : "pGroup"
			}
		};
		case "coordinatesGroup":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "coordinatesGroup"
					}, {
						"name" : "type",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataGroup"
						} ]
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "systemOneUser"
						}, {
							"name" : "linkedRecordId",
							"value" : "141414"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "bibsys"
						} ]
					}, {
						"name" : "tsCreated",
						"value" : "2017-10-01 00:00:00.0"
					}, {
						"name" : "updated",
						"children" : [ {
							"name" : "updatedBy",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "systemOneUser"
							}, {
								"name" : "linkedRecordId",
								"value" : "141414"
							} ]
						}, {
							"name" : "tsUpdated",
							"value" : "2017-11-01 17:46:48.0"
						} ],
						"repeatId" : "0"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "coordinates"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "coordinatesGroupText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "coordinatesGroupDefText"
					} ]
				}, {
					"name" : "childReferences",
					"children" : [ {
						"name" : "childReference",
						"children" : [ {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						}, {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataTextVariable"
							}, {
								"name" : "linkedRecordId",
								"value" : "latitudeTextVar"
							} ]
						} ],
						"repeatId" : "0"
					}, {
						"name" : "childReference",
						"children" : [ {
							"name" : "repeatMin",
							"value" : "1"
						}, {
							"name" : "repeatMax",
							"value" : "1"
						}, {
							"name" : "ref",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "metadataTextVariable"
							}, {
								"name" : "linkedRecordId",
								"value" : "longitudeTextVar"
							} ]
						} ],
						"repeatId" : "1"
					} ]
				} ],
				"attributes" : {
					"type" : "group"
				}
			};
		case "latitudeTextVar":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "latitudeTextVar"
					}, {
						"name" : "type",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataTextVariable"
						} ]
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "systemOneUser"
						}, {
							"name" : "linkedRecordId",
							"value" : "141414"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "bibsys"
						} ]
					}, {
						"name" : "tsCreated",
						"value" : "2017-10-01 00:00:00.0"
					}, {
						"name" : "updated",
						"children" : [ {
							"name" : "updatedBy",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "systemOneUser"
							}, {
								"name" : "linkedRecordId",
								"value" : "141414"
							} ]
						}, {
							"name" : "tsUpdated",
							"value" : "2017-11-01 17:54:13.0"
						} ],
						"repeatId" : "0"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "latitude"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "latitudeTextVarText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "latitudeTextVarDefText"
					} ]
				}, {
					"name" : "regEx",
					"value" : "(^[0-9\\.]{2,50}$)"
				} ],
				"attributes" : {
					"type" : "textVariable"
				}
			};
		case "longitudeTextVar":
			return {
				"name" : "metadata",
				"children" : [ {
					"name" : "recordInfo",
					"children" : [ {
						"name" : "id",
						"value" : "longitudeTextVar"
					}, {
						"name" : "type",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "recordType"
						}, {
							"name" : "linkedRecordId",
							"value" : "metadataTextVariable"
						} ]
					}, {
						"name" : "createdBy",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "systemOneUser"
						}, {
							"name" : "linkedRecordId",
							"value" : "141414"
						} ]
					}, {
						"name" : "dataDivider",
						"children" : [ {
							"name" : "linkedRecordType",
							"value" : "system"
						}, {
							"name" : "linkedRecordId",
							"value" : "bibsys"
						} ]
					}, {
						"name" : "tsCreated",
						"value" : "2017-10-01 00:00:00.0"
					}, {
						"name" : "updated",
						"children" : [ {
							"name" : "updatedBy",
							"children" : [ {
								"name" : "linkedRecordType",
								"value" : "systemOneUser"
							}, {
								"name" : "linkedRecordId",
								"value" : "141414"
							} ]
						}, {
							"name" : "tsUpdated",
							"value" : "2017-11-01 17:54:13.0"
						} ],
						"repeatId" : "0"
					} ]
				}, {
					"name" : "nameInData",
					"value" : "longitude"
				}, {
					"name" : "textId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "longitudeTextVarText"
					} ]
				}, {
					"name" : "defTextId",
					"children" : [ {
						"name" : "linkedRecordType",
						"value" : "coraText"
					}, {
						"name" : "linkedRecordId",
						"value" : "longitudeTextVarDefText"
					} ]
				}, {
					"name" : "regEx",
					"value" : "(^[0-9\\.]{2,50}$)"
				} ],
				"attributes" : {
					"type" : "textVariable"
				}
			};
		default:
			throw new Error("Id(" + idToGet + ") not found in coordinatesStub");
		}
	};

	this.getTextById = function() {
		return {
			"name" : "text",
			"children" : [ {
				"name" : "recordInfo",
				"children" : [ {
					"name" : "id",
					"value" : "my2Text"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "default",
					"lang" : "sv"
				},
				"children" : [ {
					"name" : "text",
					"value" : "Min andra text på svenska"
				} ]
			}, {
				"name" : "textPart",
				"attributes" : {
					"type" : "alternative",
					"lang" : "en"
				},
				"children" : [ {
					"name" : "text",
					"value" : "My second text in english"
				} ]
			} ]
		};
	};
}

window.MetadataCoordinatesProviderStub = MetadataCoordinatesProviderStub;

export default MetadataCoordinatesProviderStub;
