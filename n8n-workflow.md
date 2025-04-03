{
  "nodes": [
    {
      "parameters": {
        "options": {}
      },
      "id": "47736288-27b8-4f45-9da9-6033f6cb1bf8",
      "name": "OpenAI Chat Model",
      "type": "@n8n/n8n-nodes-langchain.lmChatOpenAi",
      "typeVersion": 1,
      "position": [
        -740,
        360
      ],
      "credentials": {
        "openAiApi": {
          "id": "9VhN1N9q34GFhktV",
          "name": "OpenAi account"
        }
      }
    },
    {
      "parameters": {
        "jsonMode": "expressionData",
        "jsonData": "={{ $json.data || $json.text || $json.concatenated_data }}",
        "options": {
          "metadata": {
            "metadataValues": [
              {
                "name": "=file_id",
                "value": "={{ $('Set File ID').first().json.file_id }}"
              },
              {
                "name": "file_title",
                "value": "={{ $('Set File ID').first().json.file_title }}"
              }
            ]
          }
        }
      },
      "id": "22adfc68-986c-41a5-85c9-7ae4514cdf5b",
      "name": "Default Data Loader",
      "type": "@n8n/n8n-nodes-langchain.documentDefaultDataLoader",
      "typeVersion": 1,
      "position": [
        1000,
        1140
      ]
    },
    {
      "parameters": {
        "model": "text-embedding-3-small",
        "options": {}
      },
      "id": "31636fd4-830a-44cf-a981-a4c520e8ad29",
      "name": "Embeddings OpenAI1",
      "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
      "typeVersion": 1,
      "position": [
        760,
        1140
      ],
      "credentials": {
        "openAiApi": {
          "id": "9VhN1N9q34GFhktV",
          "name": "OpenAi account"
        }
      }
    },
    {
      "parameters": {
        "content": "## Agent Tools for RAG",
        "height": 528.85546469693,
        "width": 583.4552380860637,
        "color": 4
      },
      "id": "78a5493d-2e36-4599-9b03-bdb8be8145e7",
      "name": "Sticky Note",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        0,
        0
      ]
    },
    {
      "parameters": {
        "content": "## Tool to Add a Google Drive File to Vector DB",
        "height": 907,
        "width": 3073,
        "color": 5
      },
      "id": "38d28a15-1897-4f70-8bad-4facf2bad217",
      "name": "Sticky Note1",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -1740,
        540
      ]
    },
    {
      "parameters": {
        "operation": "download",
        "fileId": {
          "__rl": true,
          "value": "={{ $('Set File ID').item.json.file_id }}",
          "mode": "id"
        },
        "options": {
          "googleFileConversion": {
            "conversion": {
              "docsToFormat": "text/plain"
            }
          }
        }
      },
      "id": "fb9c6d62-357a-4f59-a798-359d149c47f8",
      "name": "Download File",
      "type": "n8n-nodes-base.googleDrive",
      "typeVersion": 3,
      "position": [
        -660,
        820
      ],
      "executeOnce": true,
      "credentials": {
        "googleDriveOAuth2Api": {
          "id": "WXp260y8fEH6uEmH",
          "name": "Google Drive account"
        }
      }
    },
    {
      "parameters": {
        "pollTimes": {
          "item": [
            {
              "mode": "everyMinute"
            }
          ]
        },
        "triggerOn": "specificFolder",
        "folderToWatch": {
          "__rl": true,
          "value": "178_YPe47FARdXp4Y9uB-rruLB0Iy_Da1",
          "mode": "list",
          "cachedResultName": "n8n-company-files-test",
          "cachedResultUrl": "https://drive.google.com/drive/folders/178_YPe47FARdXp4Y9uB-rruLB0Iy_Da1"
        },
        "event": "fileCreated",
        "options": {}
      },
      "id": "4be04d1d-1ef8-4bf5-8eeb-63a5fdb43139",
      "name": "File Created",
      "type": "n8n-nodes-base.googleDriveTrigger",
      "typeVersion": 1,
      "position": [
        -1680,
        660
      ],
      "credentials": {
        "googleDriveOAuth2Api": {
          "id": "WXp260y8fEH6uEmH",
          "name": "Google Drive account"
        }
      }
    },
    {
      "parameters": {
        "pollTimes": {
          "item": [
            {
              "mode": "everyMinute"
            }
          ]
        },
        "triggerOn": "specificFolder",
        "folderToWatch": {
          "__rl": true,
          "value": "178_YPe47FARdXp4Y9uB-rruLB0Iy_Da1",
          "mode": "list",
          "cachedResultName": "n8n-company-files-test",
          "cachedResultUrl": "https://drive.google.com/drive/folders/178_YPe47FARdXp4Y9uB-rruLB0Iy_Da1"
        },
        "event": "fileUpdated",
        "options": {}
      },
      "id": "06ee5f63-0011-4d57-a694-ae9b3c7e44b9",
      "name": "File Updated",
      "type": "n8n-nodes-base.googleDriveTrigger",
      "typeVersion": 1,
      "position": [
        -1680,
        820
      ],
      "credentials": {
        "googleDriveOAuth2Api": {
          "id": "WXp260y8fEH6uEmH",
          "name": "Google Drive account"
        }
      }
    },
    {
      "parameters": {
        "operation": "text",
        "options": {}
      },
      "id": "333852c3-4f6f-486f-bebd-6346032ed27f",
      "name": "Extract Document Text",
      "type": "n8n-nodes-base.extractFromFile",
      "typeVersion": 1,
      "position": [
        200,
        1140
      ],
      "alwaysOutputData": true
    },
    {
      "parameters": {},
      "id": "b528a723-c156-414d-a570-0281426019d4",
      "name": "Postgres Chat Memory",
      "type": "@n8n/n8n-nodes-langchain.memoryPostgresChat",
      "typeVersion": 1,
      "position": [
        -600,
        360
      ],
      "notesInFlow": false,
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "operation": "delete",
        "tableId": "documents",
        "filterType": "string",
        "filterString": "=metadata->>file_id=like.*{{ $json.file_id }}*"
      },
      "id": "cfa848e9-3342-456b-8a69-165891e802e8",
      "name": "Delete Old Doc Rows",
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -1140,
        660
      ],
      "alwaysOutputData": true,
      "credentials": {
        "supabaseApi": {
          "id": "4zRM8Fct1rDFoWvn",
          "name": "Supabase account"
        }
      }
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "10646eae-ae46-4327-a4dc-9987c2d76173",
              "name": "file_id",
              "value": "={{ $json.id }}",
              "type": "string"
            },
            {
              "id": "f4536df5-d0b1-4392-bf17-b8137fb31a44",
              "name": "file_type",
              "value": "={{ $json.mimeType }}",
              "type": "string"
            },
            {
              "id": "77d782de-169d-4a46-8a8e-a3831c04d90f",
              "name": "file_title",
              "value": "={{ $json.name }}",
              "type": "string"
            },
            {
              "id": "9bde4d7f-e4f3-4ebd-9338-dce1350f9eab",
              "name": "file_url",
              "value": "={{ $json.webViewLink }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "d30761e7-61c4-43ed-b74c-446d73e67ace",
      "name": "Set File ID",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -1320,
        820
      ]
    },
    {
      "parameters": {
        "content": "## RAG AI Agent with Chat Interface",
        "height": 464.8027193303974,
        "width": 1035.6381264595484
      },
      "id": "6513b98d-834a-4613-9f02-f33c8a7af3d9",
      "name": "Sticky Note2",
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -1040,
        60
      ]
    },
    {
      "parameters": {
        "options": {}
      },
      "id": "d41cfc7b-82ea-42ba-b790-ac27c02126dd",
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1.1,
      "position": [
        -180,
        140
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "9a9a245e-f1a1-4282-bb02-a81ffe629f0f",
              "name": "chatInput",
              "value": "={{ $json?.chatInput || $json.body.chatInput }}",
              "type": "string"
            },
            {
              "id": "b80831d8-c653-4203-8706-adedfdb98f77",
              "name": "sessionId",
              "value": "={{ $json?.sessionId || $json.body.sessionId}}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "id": "b01075fc-3592-4ba3-82ce-c45d14b95c87",
      "name": "Edit Fields",
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        -740,
        140
      ]
    },
    {
      "parameters": {
        "public": true,
        "options": {}
      },
      "id": "60c385cf-b820-48a3-96c0-0455202d75b4",
      "name": "When chat message received",
      "type": "@n8n/n8n-nodes-langchain.chatTrigger",
      "typeVersion": 1.1,
      "position": [
        -1000,
        140
      ],
      "webhookId": "e104e40e-6134-4825-a6f0-8a646d882662"
    },
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "e104e40e-6134-4825-a6f0-8a646d882662",
        "responseMode": "responseNode",
        "options": {}
      },
      "id": "5ca99ba3-5644-49a7-af7d-a8d0386e5338",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 2,
      "position": [
        -1000,
        340
      ],
      "webhookId": "bf4dd093-bb02-472c-9454-7ab9af97bd1d"
    },
    {
      "parameters": {
        "operation": "pdf",
        "options": {}
      },
      "id": "ac2d5530-a1f9-4b19-ad0b-d17c5f2ab9b0",
      "name": "Extract PDF Text",
      "type": "n8n-nodes-base.extractFromFile",
      "typeVersion": 1,
      "position": [
        200,
        560
      ]
    },
    {
      "parameters": {},
      "id": "c82a9139-0e73-4aa2-943a-823e4bec3b61",
      "name": "Character Text Splitter",
      "type": "@n8n/n8n-nodes-langchain.textSplitterCharacterTextSplitter",
      "typeVersion": 1,
      "position": [
        900,
        1260
      ]
    },
    {
      "parameters": {
        "fieldsToSummarize": {
          "values": [
            {
              "aggregation": "concatenate",
              "field": "data"
            }
          ]
        },
        "options": {}
      },
      "id": "b5c53d9f-0082-4a96-b2bb-914bdc013150",
      "name": "Summarize",
      "type": "n8n-nodes-base.summarize",
      "typeVersion": 1,
      "position": [
        460,
        720
      ]
    },
    {
      "parameters": {
        "promptType": "define",
        "text": "={{ $json.chatInput }}",
        "options": {
          "systemMessage": "You are a personal assistant who helps answer questions from a corpus of documents. The documents are either text based (Txt, docs, extracted PDFs, etc.) or tabular data (CSVs or Excel documents).\n\nYou are given tools to perform RAG in the 'documents' table, look up the documents available in your knowledge base in the 'document_metadata' table, extract all the text from a given document, and query the tabular files with SQL in the 'document_rows' table.\n\nAlways start by performing RAG unless the question requires a SQL query for tabular data (fetching a sum, finding a max, something a RAG lookup would be unreliable for). If RAG doesn't help, then look at the documents that are available to you, find a few that you think would contain the answer, and then analyze those.\n\nAlways tell the user if you didn't find the answer. Don't make something up just to please them."
        }
      },
      "id": "e5ea0355-9a50-467d-aa27-d807cbf9d8be",
      "name": "RAG AI Agent",
      "type": "@n8n/n8n-nodes-langchain.agent",
      "typeVersion": 1.6,
      "position": [
        -520,
        140
      ]
    },
    {
      "parameters": {
        "rules": {
          "values": [
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 1
                },
                "conditions": [
                  {
                    "leftValue": "={{ $('Set File ID').item.json.file_type }}",
                    "rightValue": "application/pdf",
                    "operator": {
                      "type": "string",
                      "operation": "equals"
                    },
                    "id": "0db0057b-1bf3-469a-82b9-edcb7db82323"
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "pdf"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 1
                },
                "conditions": [
                  {
                    "id": "2ae7faa7-a936-4621-a680-60c512163034",
                    "leftValue": "={{ $('Set File ID').item.json.file_type }}",
                    "rightValue": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "microsoft sheet"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 1
                },
                "conditions": [
                  {
                    "id": "fc193b06-363b-4699-a97d-e5a850138b0e",
                    "leftValue": "={{ $('Set File ID').item.json.file_type }}",
                    "rightValue": "=application/vnd.google-apps.spreadsheet",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "google sheet"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 1
                },
                "conditions": [
                  {
                    "id": "bb253525-a0d2-443c-9875-fca2428270b5",
                    "leftValue": "={{ $('Set File ID').item.json.file_type }}",
                    "rightValue": "text/csv",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "csv"
            },
            {
              "conditions": {
                "options": {
                  "caseSensitive": true,
                  "leftValue": "",
                  "typeValidation": "strict",
                  "version": 1
                },
                "conditions": [
                  {
                    "id": "b69f5605-0179-4b02-9a32-e34bb085f82d",
                    "leftValue": "={{ $('Set File ID').item.json.file_type }}",
                    "rightValue": "application/vnd.google-apps.document",
                    "operator": {
                      "type": "string",
                      "operation": "equals",
                      "name": "filter.operator.equals"
                    }
                  }
                ],
                "combinator": "and"
              },
              "renameOutput": true,
              "outputKey": "txt"
            }
          ]
        },
        "options": {
          "fallbackOutput": 4
        }
      },
      "id": "e3d9eb62-9290-47e4-9669-b99978c9b725",
      "name": "Switch",
      "type": "n8n-nodes-base.switch",
      "typeVersion": 3,
      "position": [
        -460,
        800
      ]
    },
    {
      "parameters": {
        "mode": "insert",
        "tableName": {
          "__rl": true,
          "value": "documents",
          "mode": "list",
          "cachedResultName": "documents"
        },
        "options": {
          "queryName": "match_documents"
        }
      },
      "id": "0aedb293-abc6-42c1-95dd-8c6594d9d0af",
      "name": "Insert into Supabase Vectorstore",
      "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
      "typeVersion": 1,
      "position": [
        920,
        920
      ],
      "credentials": {
        "supabaseApi": {
          "id": "4zRM8Fct1rDFoWvn",
          "name": "Supabase account"
        }
      }
    },
    {
      "parameters": {
        "operation": "xlsx",
        "options": {}
      },
      "id": "bea48fa5-680a-4fbe-ae90-e2e3313768e3",
      "name": "Extract from Excel",
      "type": "n8n-nodes-base.extractFromFile",
      "typeVersion": 1,
      "position": [
        -20,
        720
      ]
    },
    {
      "parameters": {
        "assignments": {
          "assignments": [
            {
              "id": "f422e2e0-381c-46ea-8f38-3f58c501d8b9",
              "name": "schema",
              "value": "={{ $('Extract from Excel').isExecuted ? $('Extract from Excel').first().json.keys().toJsonString() : $('Extract from CSV').first().json.keys().toJsonString() }}",
              "type": "string"
            },
            {
              "id": "bb07c71e-5b60-4795-864c-cc3845b6bc46",
              "name": "data",
              "value": "={{ $json.concatenated_data }}",
              "type": "string"
            }
          ]
        },
        "options": {}
      },
      "type": "n8n-nodes-base.set",
      "typeVersion": 3.4,
      "position": [
        900,
        720
      ],
      "id": "c6c4f147-b98a-4860-912b-c47a7100d247",
      "name": "Set Schema"
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "n8n-nodes-base.extractFromFile",
      "typeVersion": 1,
      "position": [
        -20,
        940
      ],
      "id": "d1243378-91ad-4ae6-a1ac-72848f34e2f2",
      "name": "Extract from CSV"
    },
    {
      "parameters": {
        "content": "## Run Each Node Once to Set Up Database Tables",
        "height": 300,
        "width": 680,
        "color": 3
      },
      "type": "n8n-nodes-base.stickyNote",
      "position": [
        -1740,
        220
      ],
      "typeVersion": 1,
      "id": "35814a8f-2b59-4e6c-ac13-852115ba5dd0",
      "name": "Sticky Note3"
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "CREATE TABLE document_metadata (\n    id TEXT PRIMARY KEY,\n    title TEXT,\n    url TEXT,\n    created_at TIMESTAMP DEFAULT NOW(),\n    schema TEXT\n);",
        "options": {}
      },
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2.5,
      "position": [
        -1480,
        320
      ],
      "id": "ac3cf602-ca96-4594-b553-c036bb4c9fb7",
      "name": "Create Document Metadata Table",
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "CREATE TABLE document_rows (\n    id SERIAL PRIMARY KEY,\n    dataset_id TEXT REFERENCES document_metadata(id),\n    row_data JSONB  -- Store the actual row data\n);",
        "options": {}
      },
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2.5,
      "position": [
        -1260,
        320
      ],
      "id": "9d32f27f-2364-49af-bd54-013fdbbaa0e3",
      "name": "Create Document Rows Table (for Tabular Data)",
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "descriptionType": "manual",
        "toolDescription": "Use this tool to fetch all available documents, including the table schema if the file is a CSV or Excel file.",
        "operation": "select",
        "schema": {
          "__rl": true,
          "mode": "list",
          "value": "public"
        },
        "table": {
          "__rl": true,
          "value": "document_metadata",
          "mode": "list",
          "cachedResultName": "document_metadata"
        },
        "returnAll": true,
        "options": {}
      },
      "type": "n8n-nodes-base.postgresTool",
      "typeVersion": 2.5,
      "position": [
        -460,
        360
      ],
      "id": "f4eaf9e5-8769-4eaa-8177-62f5bd224f5c",
      "name": "List Documents",
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "descriptionType": "manual",
        "toolDescription": "Given a file ID, fetches the text from the document.",
        "operation": "executeQuery",
        "query": "SELECT \n    string_agg(content, ' ') as document_text\nFROM documents\n  WHERE metadata->>'file_id' = $1\nGROUP BY metadata->>'file_id';",
        "options": {
          "queryReplacement": "={{ $fromAI('file_id') }}"
        }
      },
      "type": "n8n-nodes-base.postgresTool",
      "typeVersion": 2.5,
      "position": [
        -320,
        360
      ],
      "id": "cba5ad77-290f-44e3-a39c-eff4c11552bd",
      "name": "Get File Contents",
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "descriptionType": "manual",
        "toolDescription": "Run a SQL query - use this to query from the document_rows table once you know the file ID you are querying. dataset_id is the file_id and you are always using the row_data for filtering, which is a jsonb field that has all the keys from the file schema given in the document_metadata table.\n\nExample query:\n\nSELECT AVG((row_data->>'revenue')::numeric)\nFROM document_rows\nWHERE dataset_id = '123';\n\nExample query 2:\n\nSELECT \n    row_data->>'category' as category,\n    SUM((row_data->>'sales')::numeric) as total_sales\nFROM dataset_rows\nWHERE dataset_id = '123'\nGROUP BY row_data->>'category';",
        "operation": "executeQuery",
        "query": "{{ $fromAI('sql_query') }}",
        "options": {}
      },
      "type": "n8n-nodes-base.postgresTool",
      "typeVersion": 2.5,
      "position": [
        -160,
        360
      ],
      "id": "b43e5fa0-6def-4b2f-b921-eda5be763e50",
      "name": "Query Document Rows",
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "mode": "retrieve-as-tool",
        "toolName": "documents",
        "toolDescription": "Use RAG to look up information in the knowledgebase.",
        "tableName": {
          "__rl": true,
          "value": "documents",
          "mode": "list",
          "cachedResultName": "documents"
        },
        "options": {
          "queryName": "match_documents"
        }
      },
      "type": "@n8n/n8n-nodes-langchain.vectorStoreSupabase",
      "typeVersion": 1,
      "position": [
        160,
        140
      ],
      "id": "535bdd56-22ae-4a4f-9158-47d887af1f3f",
      "name": "Supabase Vector Store1",
      "credentials": {
        "supabaseApi": {
          "id": "4zRM8Fct1rDFoWvn",
          "name": "Supabase account"
        }
      }
    },
    {
      "parameters": {
        "options": {}
      },
      "type": "@n8n/n8n-nodes-langchain.embeddingsOpenAi",
      "typeVersion": 1.2,
      "position": [
        260,
        320
      ],
      "id": "7d773f69-a10e-48ea-b30f-cf4d30ba365b",
      "name": "Embeddings OpenAI2",
      "credentials": {
        "openAiApi": {
          "id": "9VhN1N9q34GFhktV",
          "name": "OpenAi account"
        }
      }
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "-- Enable the pgvector extension to work with embedding vectors\ncreate extension vector;\n\n-- Create a table to store your documents\ncreate table documents (\n  id bigserial primary key,\n  doc_id text,\n  content text, -- corresponds to Document.pageContent\n  metadata jsonb, -- corresponds to Document.metadata\n  embedding vector(1536) -- 1536 works for OpenAI embeddings, change if needed\n);\n\n-- Create a function to search for documents\ncreate function match_documents (\n  query_embedding vector(1536),\n  match_count int default null,\n  filter jsonb DEFAULT '{}'\n) returns table (\n  id bigint,\n  content text,\n  metadata jsonb,\n  similarity float\n)\nlanguage plpgsql\nas $$\n#variable_conflict use_column\nbegin\n  return query\n  select\n    id,\n    content,\n    metadata,\n    1 - (documents.embedding <=> query_embedding) as similarity\n  from documents\n  where metadata @> filter\n  order by documents.embedding <=> query_embedding\n  limit match_count;\nend;\n$$;",
        "options": {}
      },
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2.5,
      "position": [
        -1680,
        320
      ],
      "id": "4a9c4d2a-d792-499e-abe1-50f9cbbccf7c",
      "name": "Create Documents Table and Match Function",
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "operation": "delete",
        "tableId": "document_rows",
        "filters": {
          "conditions": [
            {
              "keyName": "dataset_id",
              "condition": "eq",
              "keyValue": "={{ $('Set File ID').item.json.file_id }}"
            }
          ]
        }
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -980,
        820
      ],
      "id": "4bd8d0b3-36ea-436a-9be6-9403722ee198",
      "name": "Delete Old Data Rows",
      "alwaysOutputData": true,
      "executeOnce": true,
      "credentials": {
        "supabaseApi": {
          "id": "4zRM8Fct1rDFoWvn",
          "name": "Supabase account"
        }
      }
    },
    {
      "parameters": {
        "operation": "upsert",
        "schema": {
          "__rl": true,
          "mode": "list",
          "value": "public"
        },
        "table": {
          "__rl": true,
          "value": "document_metadata",
          "mode": "list",
          "cachedResultName": "document_metadata"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "id": "={{ $('Set File ID').item.json.file_id }}",
            "title": "={{ $('Set File ID').item.json.file_title }}",
            "url": "={{ $('Set File ID').item.json.file_url }}"
          },
          "matchingColumns": [
            "id"
          ],
          "schema": [
            {
              "id": "id",
              "displayName": "id",
              "required": true,
              "defaultMatch": true,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "title",
              "displayName": "title",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": false
            },
            {
              "id": "url",
              "displayName": "url",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": false,
              "removed": false
            },
            {
              "id": "created_at",
              "displayName": "created_at",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "dateTime",
              "canBeUsedToMatch": false
            },
            {
              "id": "schema",
              "displayName": "schema",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": false,
              "removed": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2.5,
      "position": [
        -820,
        660
      ],
      "id": "874c5216-3d08-48c9-8ec0-a636b06eb3ad",
      "name": "Insert Document Metadata",
      "executeOnce": true,
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "schema": {
          "__rl": true,
          "mode": "list",
          "value": "public"
        },
        "table": {
          "__rl": true,
          "value": "document_rows",
          "mode": "list",
          "cachedResultName": "document_rows"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "dataset_id": "={{ $('Set File ID').item.json.file_id }}",
            "row_data": "={{ $json.toJsonString().replaceAll(/'/g, \"''\") }}"
          },
          "matchingColumns": [
            "id"
          ],
          "schema": [
            {
              "id": "id",
              "displayName": "id",
              "required": false,
              "defaultMatch": true,
              "display": true,
              "type": "number",
              "canBeUsedToMatch": true,
              "removed": true
            },
            {
              "id": "dataset_id",
              "displayName": "dataset_id",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true
            },
            {
              "id": "row_data",
              "displayName": "row_data",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "object",
              "canBeUsedToMatch": true
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2.5,
      "position": [
        240,
        940
      ],
      "id": "c17325fd-f7ec-4b5d-b663-253a80767400",
      "name": "Insert Table Rows",
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "operation": "upsert",
        "schema": {
          "__rl": true,
          "mode": "list",
          "value": "public"
        },
        "table": {
          "__rl": true,
          "value": "document_metadata",
          "mode": "list",
          "cachedResultName": "document_metadata"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "id": "={{ $('Set File ID').item.json.file_id }}",
            "schema": "={{ $json.schema }}"
          },
          "matchingColumns": [
            "id"
          ],
          "schema": [
            {
              "id": "id",
              "displayName": "id",
              "required": true,
              "defaultMatch": true,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": true,
              "removed": false
            },
            {
              "id": "title",
              "displayName": "title",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": false,
              "removed": true
            },
            {
              "id": "url",
              "displayName": "url",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": false,
              "removed": true
            },
            {
              "id": "created_at",
              "displayName": "created_at",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "dateTime",
              "canBeUsedToMatch": false
            },
            {
              "id": "schema",
              "displayName": "schema",
              "required": false,
              "defaultMatch": false,
              "display": true,
              "type": "string",
              "canBeUsedToMatch": false,
              "removed": false
            }
          ],
          "attemptToConvertTypes": false,
          "convertFieldsToString": false
        },
        "options": {}
      },
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2.5,
      "position": [
        1100,
        720
      ],
      "id": "9a212e1b-df34-4db4-b7c5-47b496bb580f",
      "name": "Update Schema for Document Metadata",
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "rule": {
          "interval": [
            {
              "field": "hours",
              "hoursInterval": 12
            }
          ]
        }
      },
      "type": "n8n-nodes-base.scheduleTrigger",
      "typeVersion": 1.2,
      "position": [
        -1660,
        1700
      ],
      "id": "3b14233f-32b4-4f02-b853-2b87e265c503",
      "name": "Schedule Trigger"
    },
    {
      "parameters": {
        "content": "## Handle Google Drive File Deletion (WIP)\ntodo: handle tabular data\n",
        "height": 560,
        "width": 1020,
        "color": 5
      },
      "type": "n8n-nodes-base.stickyNote",
      "typeVersion": 1,
      "position": [
        -1740,
        1480
      ],
      "id": "902543ed-e617-47f0-8127-a48350d3a442",
      "name": "Sticky Note4"
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "DELETE FROM documents\nWHERE metadata->>'file_id' = '{{ $json.missing_id }}';",
        "options": {
          "queryReplacement": ""
        }
      },
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2.5,
      "position": [
        -1020,
        1700
      ],
      "id": "ba874509-c09b-4176-8b54-ab55b4f604e0",
      "name": "Delete Embeddings",
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "jsCode": "const supabaseItems = $(\"Get IDs from Supabase\").all();\nconst driveItems = $input.all();\n\nconst driveIds = driveItems.map((item) => item.json.id);\n\nconst missingIds = supabaseItems\n  .filter((item) => !driveIds.includes(item.json.id))\n  .map((item) => item.json.id);\n\nreturn missingIds.map((id) => ({ json: { missing_id: id } }));\n"
      },
      "type": "n8n-nodes-base.code",
      "typeVersion": 2,
      "position": [
        -1220,
        1700
      ],
      "id": "e8f12772-a5d2-4528-ae0a-23fed3dd6524",
      "name": "Identify docs in Supabase to delete"
    },
    {
      "parameters": {
        "operation": "getAll",
        "tableId": "document_metadata",
        "returnAll": true,
        "filterType": "none"
      },
      "type": "n8n-nodes-base.supabase",
      "typeVersion": 1,
      "position": [
        -1440,
        1620
      ],
      "id": "163cf7b6-97e1-4a62-b6aa-a424c6c96136",
      "name": "Get IDs from Supabase",
      "executeOnce": false,
      "credentials": {
        "supabaseApi": {
          "id": "4zRM8Fct1rDFoWvn",
          "name": "Supabase account"
        }
      }
    },
    {
      "parameters": {
        "resource": "fileFolder",
        "returnAll": true,
        "filter": {
          "folderId": {
            "__rl": true,
            "value": "178_YPe47FARdXp4Y9uB-rruLB0Iy_Da1",
            "mode": "list",
            "cachedResultName": "n8n-company-files-test",
            "cachedResultUrl": "https://drive.google.com/drive/folders/178_YPe47FARdXp4Y9uB-rruLB0Iy_Da1"
          }
        },
        "options": {
          "fields": [
            "id"
          ]
        }
      },
      "type": "n8n-nodes-base.googleDrive",
      "typeVersion": 3,
      "position": [
        -1440,
        1780
      ],
      "id": "5b856a38-4a36-4fcd-b675-0b32094f3266",
      "name": "Get IDs from GDrive",
      "credentials": {
        "googleDriveOAuth2Api": {
          "id": "WXp260y8fEH6uEmH",
          "name": "Google Drive account"
        }
      }
    },
    {
      "parameters": {
        "aggregate": "aggregateAllItemData",
        "options": {}
      },
      "id": "ed87b585-9642-439e-a2f9-cc74ed42e31e",
      "name": "Aggregate",
      "type": "n8n-nodes-base.aggregate",
      "typeVersion": 1,
      "position": [
        240,
        720
      ]
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "DELETE FROM document_rows\nWHERE dataset_id = '{{ $json.missing_id }}';",
        "options": {
          "queryReplacement": ""
        }
      },
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2.5,
      "position": [
        -1020,
        1520
      ],
      "id": "bce2a56d-942d-48e2-ad69-8fe9b5e17871",
      "name": "Delete Tabular Data",
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "DELETE FROM document_metadata\nWHERE id = '{{ $json.missing_id }}';",
        "options": {
          "queryReplacement": ""
        }
      },
      "type": "n8n-nodes-base.postgres",
      "typeVersion": 2.5,
      "position": [
        -1020,
        1880
      ],
      "id": "21ba6988-9530-4062-b498-bcae3a4d44e6",
      "name": "Delete Tabular Data1",
      "credentials": {
        "postgres": {
          "id": "03Y2xMTNM2UO5LOH",
          "name": "Postgres account"
        }
      }
    }
  ],
  "connections": {
    "OpenAI Chat Model": {
      "ai_languageModel": [
        [
          {
            "node": "RAG AI Agent",
            "type": "ai_languageModel",
            "index": 0
          }
        ]
      ]
    },
    "Default Data Loader": {
      "ai_document": [
        [
          {
            "node": "Insert into Supabase Vectorstore",
            "type": "ai_document",
            "index": 0
          }
        ]
      ]
    },
    "Embeddings OpenAI1": {
      "ai_embedding": [
        [
          {
            "node": "Insert into Supabase Vectorstore",
            "type": "ai_embedding",
            "index": 0
          }
        ]
      ]
    },
    "Download File": {
      "main": [
        [
          {
            "node": "Switch",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "File Created": {
      "main": [
        [
          {
            "node": "Set File ID",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "File Updated": {
      "main": [
        [
          {
            "node": "Set File ID",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract Document Text": {
      "main": [
        [
          {
            "node": "Insert into Supabase Vectorstore",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Postgres Chat Memory": {
      "ai_memory": [
        [
          {
            "node": "RAG AI Agent",
            "type": "ai_memory",
            "index": 0
          }
        ]
      ]
    },
    "Delete Old Doc Rows": {
      "main": [
        [
          {
            "node": "Delete Old Data Rows",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set File ID": {
      "main": [
        [
          {
            "node": "Delete Old Doc Rows",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Edit Fields": {
      "main": [
        [
          {
            "node": "RAG AI Agent",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "When chat message received": {
      "main": [
        [
          {
            "node": "Edit Fields",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Webhook": {
      "main": [
        [
          {
            "node": "Edit Fields",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract PDF Text": {
      "main": [
        [
          {
            "node": "Insert into Supabase Vectorstore",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Character Text Splitter": {
      "ai_textSplitter": [
        [
          {
            "node": "Default Data Loader",
            "type": "ai_textSplitter",
            "index": 0
          }
        ]
      ]
    },
    "Summarize": {
      "main": [
        [
          {
            "node": "Set Schema",
            "type": "main",
            "index": 0
          },
          {
            "node": "Insert into Supabase Vectorstore",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "RAG AI Agent": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Switch": {
      "main": [
        [
          {
            "node": "Extract PDF Text",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Extract from Excel",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Extract from CSV",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Extract from CSV",
            "type": "main",
            "index": 0
          }
        ],
        [
          {
            "node": "Extract Document Text",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Insert into Supabase Vectorstore": {
      "main": [
        []
      ]
    },
    "Extract from Excel": {
      "main": [
        [
          {
            "node": "Insert Table Rows",
            "type": "main",
            "index": 0
          },
          {
            "node": "Aggregate",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set Schema": {
      "main": [
        [
          {
            "node": "Update Schema for Document Metadata",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Extract from CSV": {
      "main": [
        [
          {
            "node": "Insert Table Rows",
            "type": "main",
            "index": 0
          },
          {
            "node": "Aggregate",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Create Document Metadata Table": {
      "main": [
        [
          {
            "node": "Create Document Rows Table (for Tabular Data)",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "List Documents": {
      "ai_tool": [
        [
          {
            "node": "RAG AI Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "Get File Contents": {
      "ai_tool": [
        [
          {
            "node": "RAG AI Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "Query Document Rows": {
      "ai_tool": [
        [
          {
            "node": "RAG AI Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "Supabase Vector Store1": {
      "ai_tool": [
        [
          {
            "node": "RAG AI Agent",
            "type": "ai_tool",
            "index": 0
          }
        ]
      ]
    },
    "Embeddings OpenAI2": {
      "ai_embedding": [
        [
          {
            "node": "Supabase Vector Store1",
            "type": "ai_embedding",
            "index": 0
          }
        ]
      ]
    },
    "Create Documents Table and Match Function": {
      "main": [
        [
          {
            "node": "Create Document Metadata Table",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Delete Old Data Rows": {
      "main": [
        [
          {
            "node": "Insert Document Metadata",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Insert Document Metadata": {
      "main": [
        [
          {
            "node": "Download File",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Insert Table Rows": {
      "main": [
        []
      ]
    },
    "Schedule Trigger": {
      "main": [
        [
          {
            "node": "Get IDs from GDrive",
            "type": "main",
            "index": 0
          },
          {
            "node": "Get IDs from Supabase",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Identify docs in Supabase to delete": {
      "main": [
        [
          {
            "node": "Delete Embeddings",
            "type": "main",
            "index": 0
          },
          {
            "node": "Delete Tabular Data",
            "type": "main",
            "index": 0
          },
          {
            "node": "Delete Tabular Data1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get IDs from Supabase": {
      "main": [
        [
          {
            "node": "Identify docs in Supabase to delete",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Get IDs from GDrive": {
      "main": [
        [
          {
            "node": "Identify docs in Supabase to delete",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Aggregate": {
      "main": [
        [
          {
            "node": "Summarize",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  },
  "pinData": {},
  "meta": {
    "templateCredsSetupCompleted": true,
    "instanceId": "da4745688518f307b731fe2d297883229e1e0400d2dc8348038c126f1ccc95e3"
  }
}