# Source: https://docs.novu.co/framework/schema/json-schema

# JSON Schema Validation

Learn how to use JSON Schema to define the workflow payload and step inputs

JSON Schema can be used to define the [workflow payload](https://docs.novu.co/framework/payload) and [step inputs](https://docs.novu.co/framework/typescript/steps). It provides a strongly-typed way to define the structure of the data that is expected by the workflow or Step. And also as a contract for changing the workflow behaviour using the Platform User Interface.

Learn more about JSON schema at [json-schema.org](https://json-schema.org/).

## [Examples](https://docs.novu.co/#examples)

### [Simple](https://docs.novu.co/#simple)

```
{
  "type": "object",
  "required": ["firstName", "lastName"],
  "properties": {
    "firstName": {
      "type": "string",
      "title": "First name",
      "default": "Chuck"
    },
    "lastName": {
      "type": "string",
      "title": "Last name"
    },
    "age": {
      "type": "integer",
      "title": "Age"
    }
  }
}
```

### [Nested array structure](https://docs.novu.co/#nested-array-structure)

```
{
  "type": "object",
  "required": ["title"],
  "properties": {
    "title": {
      "type": "string",
      "title": "Task list title"
    },
    "tasks": {
      "type": "array",
      "title": "Tasks",
      "items": {
        "type": "object",
        "required": ["title"],
        "properties": {
          "title": {
            "type": "string",
            "title": "Title",
            "description": "A sample title"
          },
          "details": {
            "type": "string",
            "title": "Task details",
            "description": "Enter the task details"
          },
          "done": {
            "type": "boolean",
            "title": "Done?",
            "default": false
          }
        }
      }
    }
  }
}
```

### [Reference and reuse blocks](https://docs.novu.co/#reference-and-reuse-blocks)

```
{
  "definitions": {
    "address": {
      "type": "object",
      "properties": {
        "street_address": {
          "type": "string"
        },
        "city": {
          "type": "string"
        },
        "state": {
          "type": "string"
        }
      },
      "required": ["street_address", "city", "state"]
    },
    "node": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "children": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/node"
          }
        }
      }
    }
  },
  "type": "object",
  "properties": {
    "billing_address": {
      "title": "Billing address",
      "$ref": "#/definitions/address"
    },
    "shipping_address": {
      "title": "Shipping address",
      "$ref": "#/definitions/address"
    },
    "tree": {
      "title": "Recursive references",
      "$ref": "#/definitions/node"
    }
  }
}
```

### [Any of schemas](https://docs.novu.co/#any-of-schemas)

```
{
  "type": "object",
  "properties": {
    "age": {
      "type": "integer",
      "title": "Age"
    },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "anyOf": [
          {
            "properties": {
              "foo": {
                "type": "string"
              }
            }
          },
          {
            "properties": {
              "bar": {
                "type": "string"
              }
            }
          }
        ]
      }
    }
  },
  "anyOf": [
    {
      "title": "First method of identification",
      "properties": {
        "firstName": {
          "type": "string",
          "title": "First name",
          "default": "Chuck"
        },
        "lastName": {
          "type": "string",
          "title": "Last name"
        }
      }
    },
    {
      "title": "Second method of identification",
      "properties": {
        "idCode": {
          "type": "string",
          "title": "ID code"
        }
      }
    }
  ]
}
```

### [One of schema](https://docs.novu.co/#one-of-schema)

```
{
  "type": "object",
  "oneOf": [
    {
      "properties": {
        "lorem": {
          "type": "string"
        }
      },
      "required": ["lorem"]
    },
    {
      "properties": {
        "ipsum": {
          "type": "string"
        }
      },
      "required": ["ipsum"]
    }
  ]
}
```

### [If then else](https://docs.novu.co/#if-then-else)

```
{
  "type": "object",
  "properties": {
    "animal": {
      "enum": ["Cat", "Fish"]
    }
  },
  "allOf": [
    {
      "if": {
        "properties": {
          "animal": {
            "const": "Cat"
          }
        }
      },
      "then": {
        "properties": {
          "food": {
            "type": "string",
            "enum": ["meat", "grass", "fish"]
          }
        },
        "required": ["food"]
      }
    },
    {
      "if": {
        "properties": {
          "animal": {
            "const": "Fish"
          }
        }
      },
      "then": {
        "properties": {
          "food": {
            "type": "string",
            "enum": ["insect", "worms"]
          },
          "water": {
            "type": "string",
            "enum": ["lake", "sea"]
          }
        },
        "required": ["food", "water"]
      }
    },
    {
      "required": ["animal"]
    }
  ]
}
```

### [Enum objects](https://docs.novu.co/#enum-objects)

```
{
  "definitions": {
    "locations": {
      "enumNames": ["New York", "Amsterdam", "Hong Kong"],
      "enum": [
        {
          "name": "New York",
          "lat": 40,
          "lon": 74
        },
        {
          "name": "Amsterdam",
          "lat": 52,
          "lon": 5
        },
        {
          "name": "Hong Kong",
          "lat": 22,
          "lon": 114
        }
      ]
    }
  },
  "type": "object",
  "properties": {
    "location": {
      "title": "Location",
      "$ref": "#/definitions/locations"
    },
    "locationRadio": {
      "title": "Location Radio",
      "$ref": "#/definitions/locations"
    },
    "multiSelect": {
      "title": "Locations",
      "type": "array",
      "uniqueItems": true,
      "items": {
        "$ref": "#/definitions/locations"
      }
    },
    "checkboxes": {
      "title": "Locations Checkboxes",
      "type": "array",
      "uniqueItems": true,
      "items": {
        "$ref": "#/definitions/locations"
      }
    }
  }
}
```

### [Regex validation](https://docs.novu.co/#regex-validation)

The following example matches a simple North American telephone number with an optional area code:

```
{
  "type": "object",
  "properties": {
    "phone": {
      "type": "string",
      "pattern": "^(\\([0-9]{3}\\))?[0-9]{3}-[0-9]{4}$"
    }
  }
}
```

## [Other resources](https://docs.novu.co/#other-resources)

- [Examples](https://json-schema.org/learn/miscellaneous-examples)
- [React JSON schema](https://rjsf-team.github.io/react-jsonschema-form/)
- [JSON schema validator](https://www.jsonschemavalidator.net/)
- [JSON schema lint](https://jsonschemalint.com/)

[Zod\\ \\ Learn how to integrate Zod with Novu Framework](https://docs.novu.co/framework/schema/zod) [Class Validator\\ \\ Integrate Class Validator with your notification workflows](https://docs.novu.co/framework/schema/class-validator)

### On this page

[Examples](https://docs.novu.co/#examples) [Simple](https://docs.novu.co/#simple) [Nested array structure](https://docs.novu.co/#nested-array-structure) [Reference and reuse blocks](https://docs.novu.co/#reference-and-reuse-blocks) [Any of schemas](https://docs.novu.co/#any-of-schemas) [One of schema](https://docs.novu.co/#one-of-schema) [If then else](https://docs.novu.co/#if-then-else) [Enum objects](https://docs.novu.co/#enum-objects) [Regex validation](https://docs.novu.co/#regex-validation) [Other resources](https://docs.novu.co/#other-resources)

Copy page as markdown[Edit this page on GitHub](https://github.com/novuhq/docs/edit/main/content/docs/framework/schema/json-schema.mdx)Open in ChatGPTOpen in Claude