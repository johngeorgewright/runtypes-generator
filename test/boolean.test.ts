import generateFixture from './generateFixture'

test('boolean', () => {
  expect(generateFixture('boolean', ['A']).getStructure())
    .toMatchInlineSnapshot(`
    Object {
      "kind": 34,
      "statements": Array [
        Object {
          "defaultImport": undefined,
          "isTypeOnly": false,
          "kind": 14,
          "moduleSpecifier": "runtypes",
          "namedImports": Array [
            Object {
              "alias": undefined,
              "kind": 15,
              "name": "Boolean",
            },
            Object {
              "alias": undefined,
              "kind": 15,
              "name": "Static",
            },
          ],
          "namespaceImport": undefined,
        },
        Object {
          "declarationKind": "const",
          "declarations": Array [
            Object {
              "hasExclamationToken": false,
              "initializer": "Boolean",
              "kind": 38,
              "name": "A",
              "type": undefined,
            },
          ],
          "docs": Array [],
          "hasDeclareKeyword": false,
          "isDefaultExport": false,
          "isExported": true,
          "kind": 39,
        },
        Object {
          "docs": Array [],
          "hasDeclareKeyword": false,
          "isDefaultExport": false,
          "isExported": true,
          "kind": 36,
          "name": "A",
          "type": "Static<typeof A>",
          "typeParameters": Array [],
        },
      ],
    }
  `)
})
