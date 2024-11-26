CORATEST.recursiveDeletePresentationWithChildren = {
  "children": [
    {
      "children": [
        {"name": "id", "value": "recordTypeFormPGroup"},
        {
          "children": [
            {"name": "linkedRecordType", "value": "recordType"  },
            {"name": "linkedRecordId"  , "value": "presentation"}
          ],
          "name": "type"
        },
        {
          "children": [
            {"name": "linkedRecordType", "value": "system"},
            {"name": "linkedRecordId"  , "value": "cora"  }
          ],
          "name": "dataDivider"
        },
        {
          "children": [
            {"name": "linkedRecordType", "value": "validationType"},
            {
              "name" : "linkedRecordId"                  ,
              "value": "presentationSurroundingContainer"
            }
          ],
          "name": "validationType"
        }
      ],
      "name": "recordInfo"
    },
    {
      "children": [
        {
          "repeatId": "0",
          "children": [
            {"name": "linkedRecordType", "value": "metadata"  },
            {"name": "linkedRecordId"  , "value": "textIdLink"}
          ],
          "name": "presentationOf"
        }
      ],
      "name": "presentationsOf"
    },
    {
      "children": [
        {
          "repeatId": "1",
          "children": [
            {
              "repeatId": "0",
              "children": [
                {
                  "children": [
                    {"name": "linkedRecordType", "value": "presentation"     },
                    {"name": "linkedRecordId"  , "value": "childPresentation"}
                  ],
                  "name": "ref",
                  "attributes": {"type": "presentation"}
                }
              ],
              "name": "refGroup"
            }
          ],
          "name": "childReference"
        },
        {
          "repeatId": "2",
          "children": [
            {
              "repeatId": "0",
              "children": [
                {
                  "children": [
                    {"name": "linkedRecordType", "value": "text"     },
                    {"name": "linkedRecordId"  , "value": "textsText"}
                  ],
                  "name": "ref",
                  "attributes": {"type": "text"}
                }
              ],
              "name": "refGroup"
            }
          ],
          "name": "childReference"
        },
        {
          "repeatId": "2",
          "children": [
            {
              "repeatId": "0",
              "children": [
                {
                  "children": [
                    {"name": "linkedRecordType", "value": "guiElement"    },
                    {"name": "linkedRecordId"  , "value": "testGuiElement"}
                  ],
                  "name": "ref",
                  "attributes": {"type": "guiElement"}
                }
              ],
              "name": "refGroup"
            }
          ],
          "name": "childReference"
        }
      ],
      "name": "childReferences"
    },
    {"name": "mode", "value": "output"}
  ],
  "name": "presentation",
  "attributes": {"repeat": "children", "type": "container"}
};
CORATEST.recursiveDeleteTextChildFromPresentation = {
	"children": [
		{
			"children": [
				{
					"name": "id",
					"value": "textsText"
				},
				{
					"children": [
						{
							"name": "linkedRecordType",
							"value": "recordType"
						},
						{
							"name": "linkedRecordId",
							"value": "text"
						}
					],
					"name": "type"
				},
				{
					"children": [
						{
							"name": "linkedRecordType",
							"value": "system"
						},
						{
							"name": "linkedRecordId",
							"value": "cora"
						}
					],
					"name": "dataDivider"
				},
				{
					"children": [
						{
							"name": "linkedRecordType",
							"value": "validationType"
						},
						{
							"name": "linkedRecordId",
							"value": "coraText"
						}
					],
					"name": "validationType"
				}
			],
			"name": "recordInfo"
		},
		{
			"children": [
				{
					"name": "text",
					"value": "Typ"
				}
			],
			"name": "textPart",
			"attributes": {
				"lang": "sv",
				"type": "default"
			}
		},
		{
			"children": [
				{
					"name": "text",
					"value": "Type"
				}
			],
			"name": "textPart",
			"attributes": {
				"lang": "en",
				"type": "alternative"
			}
		}
	],
	"name": "text"
};

CORATEST.recursiveDeleteGuiElementChildFromPresentation = {
	"children": [
		{
			"children": [
				{ "name": "id", "value": "testGuiElement" },
				{
					"children": [
						{ "name": "linkedRecordType", "value": "recordType" },
						{ "name": "linkedRecordId", "value": "guiElement" }
					],
					"name": "type"
				},
				{
					"children": [
						{ "name": "linkedRecordType", "value": "system" },
						{ "name": "linkedRecordId", "value": "testSystem" }
					],
					"name": "dataDivider"
				},
				{
					"children": [
						{ "name": "linkedRecordType", "value": "validationType" },
						{ "name": "linkedRecordId", "value": "guiElementLink" }
					],
					"name": "validationType"
				}
			],
			"name": "recordInfo"
		},
		{
			"children": [
				{ "name": "linkedRecordType", "value": "text" },
				{ "name": "linkedRecordId", "value": "minimalGroupIdText" }
			],
			"name": "elementText"
		},
		{ "name": "presentAs", "value": "link" }
	],
	"name": "guiElement",
	"attributes": { "type": "guiElementLink" }
};