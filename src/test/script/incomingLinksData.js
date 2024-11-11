CORATEST.incomingLinksAnswer={
  "dataList": {
    "fromNo": "1",
    "data": [
      {
        "children": [
          {
            "children": [
              {
                "name": "linkedRecordType",
                "value": "metadataTextVariable"
              },
              {
                "name": "linkedRecordId",
                "value": "newPresentationFormIdTextVar"
              }
            ],
            "actionLinks": {
              "read": {
                "requestMethod": "GET",
                "rel": "read",
                "url": "http://localhost:8080/therest/rest/record/metadataTextVariable/newPresentationFormIdTextVar",
                "accept": "application/vnd.uub.record+json"
              }
            },
            "name": "from"
          },
          {
            "children": [
              {
                "name": "linkedRecordType",
                "value": "text"
              },
              {
                "name": "linkedRecordId",
                "value": "newPresentationFormIdTextVarText"
              }
            ],
            "name": "to"
          }
        ],
        "name": "recordToRecordLink"
      },
      {
        "children": [
          {
            "children": [
              {
                "name": "linkedRecordType",
                "value": "presentation"
              },
              {
                "name": "linkedRecordId",
                "value": "recordTypeFormPGroup"
              }
            ],
            "actionLinks": {
              "read": {
                "requestMethod": "GET",
                "rel": "read",
                "url": "http://localhost:8080/therest/rest/record/presentationGroup/recordTypeFormPGroup",
                "accept": "application/vnd.uub.record+json"
              }
            },
            "name": "from"
          },
          {
            "children": [
              {
                "name": "linkedRecordType",
                "value": "text"
              },
              {
                "name": "linkedRecordId",
                "value": "newPresentationFormIdTextVarText"
              }
            ],
            "name": "to"
          }
        ],
        "name": "recordToRecordLink"
      },
      {
        "children": [
          {
            "children": [
              {
                "name": "linkedRecordType",
                "value": "presentation"
              },
              {
                "name": "linkedRecordId",
                "value": "recordTypeFormNewPGroup"
              }
            ],
            "actionLinks": {
              "read": {
                "requestMethod": "GET",
                "rel": "read",
                "url": "http://localhost:8080/therest/rest/record/presentationGroup/recordTypeFormNewPGroup",
                "accept": "application/vnd.uub.record+json"
              }
            },
            "name": "from"
          },
          {
            "children": [
              {
                "name": "linkedRecordType",
                "value": "text"
              },
              {
                "name": "linkedRecordId",
                "value": "newPresentationFormIdTextVarText"
              }
            ],
            "name": "to"
          }
        ],
        "name": "recordToRecordLink"
      },
      {
        "children": [
          {
            "children": [
              {
                "name": "linkedRecordType",
                "value": "presentation"
              },
              {
                "name": "linkedRecordId",
                "value": "recordTypeViewPGroup"
              }
            ],
            "actionLinks": {
              "read": {
                "requestMethod": "GET",
                "rel": "read",
                "url": "http://localhost:8080/therest/rest/record/presentationGroup/recordTypeViewPGroup",
                "accept": "application/vnd.uub.record+json"
              }
            },
            "name": "from"
          },
          {
            "children": [
              {
                "name": "linkedRecordType",
                "value": "text"
              },
              {
                "name": "linkedRecordId",
                "value": "newPresentationFormIdTextVarText"
              }
            ],
            "name": "to"
          }
        ],
        "name": "recordToRecordLink"
      }
    ],
    "totalNo": "4",
    "containDataOfType": "recordToRecordLink",
    "toNo": "4"
  }
};