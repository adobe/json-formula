# json-formula: A Query Language for JSON with Spreadsheet Functions

This project hosts an implementation of an expression grammar that operates on JSON documents.
The grammar is a mashup of:
- [JMESPath](https://jmespath.org/) query language.
- Operators and functions from [OpenFormula](https://docs.oasis-open.org/office/v1.2/os/OpenDocument-v1.2-os-part2.html)

Given:
```
{
  "items": [
    {
      "desc": "pens",
      "quantity": 2,
      "price": 3.23
    },
    {
      "desc": "pencils",
      "quantity": 4,
      "price": 1.34
    }
  ]
}
```

`sum(items[*].price * items[*].quantity)` => `11.82`

`items[*].{price: price, quantity: quantity, subtotal: price * quantity}` =>

```
[
  {
    "price": 3.23,
    "quantity": 2,
    "subtotal": 6.46
  },
  {
    "price": 1.34,
    "quantity": 4,
    "subtotal": 5.36
  }
]
```

# Try it
Visit the [Playground](https://opensource.adobe.com/json-formula/dist/index.html)

# Documentation
Specification / Reference: [HTML](https://opensource.adobe.com/json-formula/doc/output/json-formula-specification-1.0.1.html) / [PDF](https://opensource.adobe.com/json-formula/doc/output/json-formula-specification-1.0.1.pdf)

[JavaScript API](./doc/output/JSDOCS.md)

[Developer Instructions](./DEVELOPMENT.md)
