export const atomicSchema0905 = {
  "name": "widgetsSchema",
  "strict": true,
  "schema": {
    "type": "object",
    "$defs": {
      "style": {
        "type": "object",
        "required": [
          "id",
          "type",
          "variants"
        ],
        "properties": {
          "id": {
            "type": "string",
            "description": "will be used in the widget 'classes' setting to print the class in its template, the format of the id should start with:'s-' and then a random number with 6 digits"
          },
          "type": {
            "enum": [
              "class"
            ],
            "type": "string"
          },
          "variants": {
            "type": "array",
            "items": {
              "type": "object",
              "required": [
                "meta"
              ],
              "properties": {
                "meta": {
                  "type": "object",
                  "required": [
                    "state",
                    "breakpoint"
                  ],
                  "properties": {
                    "state": {
                      "enum": [
                        "hover",
                        "selected",
                        null
                      ]
                    },
                    "breakpoint": {
                      "enum": [
                        "desktop",
                        "mobile",
                        "tablet"
                      ]
                    }
                  },
                  "additionalProperties": false
                },
                "props": {
                  "type": "object",
                  "description": "CSS properties, for example: {\"color\": \"red\"}"
                }
              },
              "additionalProperties": false
            }
          }
        },
        "additionalProperties": false
      },
      "styles": {
        "type": "object",
        "required": [
          "^S_"
        ],
        "properties": {
          "^S_": {
            "$ref": "#/$defs/style"
          }
        },
        "additionalProperties": false
      },
      "classes": {
        "type": "object",
        "required": [
          "$$type",
          "value"
        ],
        "properties": {
          "value": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "A list of the style IDs that are defined in the widget styles property, for example: ['s-5786', 's-5787'], it should always refer to an existing styles object key"
          },
          "$$type": {
            "enum": [
              "classes"
            ]
          }
        },
        "additionalProperties": false
      },
      "elements": {
        "type": "array",
        "items": {
          "type": "object",
          "anyOf": [
            {
              "type": "object",
              "required": [
                "id",
                "elType",
                "widgetType",
                "settings",
                "styles"
              ],
              "properties": {
                "id": {
                  "type": "string"
                },
                "elType": {
                  "enum": [
                    "widget"
                  ],
                  "type": "string"
                },
                "styles": {
                  "$ref": "#/$defs/styles"
                },
                "settings": {
                  "type": "object",
                  "required": [
                    "text",
                    "_title",
                    "classes"
                  ],
                  "properties": {
                    "text": {
                      "type": "string",
                      "description": "Text content for a section"
                    },
                    "_title": {
                      "type": "string",
                      "description": "A short description, up to 3 words"
                    },
                    "classes": {
                      "$ref": "#/$defs/classes"
                    }
                  },
                  "additionalProperties": false
                },
                "widgetType": {
                  "enum": [
                    "atomic-text"
                  ],
                  "type": "string"
                }
              },
              "additionalProperties": false
            },
            {
              "type": "object",
              "required": [
                "id",
                "elType",
                "widgetType",
                "settings",
                "styles"
              ],
              "properties": {
                "id": {
                  "type": "string"
                },
                "elType": {
                  "enum": [
                    "widget"
                  ],
                  "type": "string"
                },
                "styles": {
                  "$ref": "#/$defs/styles"
                },
                "settings": {
                  "type": "object",
                  "required": [
                    "url",
                    "_title",
                    "classes"
                  ],
                  "properties": {
                    "url": {
                      "type": "string",
                      "description": "Image URL, you should only provide a valid URL containing an image supported mime types: 'image/jpeg', 'image/png'"
                    },
                    "_title": {
                      "type": "string",
                      "description": "A short description, up to 3 words"
                    },
                    "classes": {
                      "$ref": "#/$defs/classes"
                    }
                  },
                  "additionalProperties": false
                },
                "widgetType": {
                  "enum": [
                    "atomic-image"
                  ],
                  "type": "string"
                }
              },
              "additionalProperties": false
            },
            {
              "type": "object",
              "required": [
                "id",
                "elType",
                "widgetType",
                "settings",
                "styles"
              ],
              "properties": {
                "id": {
                  "type": "string"
                },
                "elType": {
                  "enum": [
                    "widget"
                  ],
                  "type": "string"
                },
                "styles": {
                  "$ref": "#/$defs/styles"
                },
                "settings": {
                  "type": "object",
                  "required": [
                    "title",
                    "tag",
                    "_title",
                    "classes"
                  ],
                  "properties": {
                    "tag": {
                      "enum": [
                        "h1",
                        "h2",
                        "h3",
                        "h4",
                        "h5",
                        "h6"
                      ],
                      "type": "string"
                    },
                    "title": {
                      "type": "string",
                      "description": "Heading title, for example: 'Hello, World!'"
                    },
                    "_title": {
                      "type": "string",
                      "description": "A short description, up to 3 words"
                    },
                    "classes": {
                      "$ref": "#/$defs/classes"
                    }
                  },
                  "additionalProperties": false
                },
                "widgetType": {
                  "enum": [
                    "atomic-heading"
                  ],
                  "type": "string"
                }
              },
              "additionalProperties": false
            },
            {
              "type": "object",
              "required": [
                "id",
                "elType",
                "styles",
                "settings",
                "elements"
              ],
              "properties": {
                "id": {
                  "type": "string"
                },
                "elType": {
                  "enum": [
                    "container"
                  ],
                  "type": "string"
                },
                "styles": {
                  "$ref": "#/$defs/styles"
                },
                "elements": {
                  "type": "array",
                  "items": {
                    "$ref": "#/$defs/elements"
                  }
                },
                "settings": {
                  "type": "object",
                  "required": [
                    "classes",
                    "_title"
                  ],
                  "properties": {
                    "_title": {
                      "type": "string",
                      "description": "A short description, up to 3 words"
                    },
                    "classes": {
                      "$ref": "#/$defs/classes"
                    }
                  },
                  "additionalProperties": false
                }
              },
              "description": "The Container widget is a container that can hold other widgets, it should be used as the root element for a page or a section, and it should be used to group other widgets inside the root element.",
              "additionalProperties": false
            }
          ]
        }
      }
    },
    "required": [
      "id",
      "elType",
      "settings",
      "elements",
      "styles"
    ],
    "properties": {
      "id": {
        "type": "string"
      },
      "elType": {
        "enum": [
          "container"
        ],
        "type": "string"
      },
      "styles": {
        "$ref": "#/$defs/styles"
      },
      "elements": {
        "$ref": "#/$defs/elements"
      },
      "settings": {
        "type": "object",
        "required": [
          "_title",
          "classes"
        ],
        "properties": {
          "_title": {
            "type": "string",
            "description": "A short description, up to 3 words"
          },
          "classes": {
            "$ref": "#/$defs/classes"
          }
        },
        "additionalProperties": false
      }
    },
    "additionalProperties": false
  }
}
