import * as t from 'io-ts'
import { separate } from '@johngw/array'
import {
  DeclareType,
  Enum,
  escapeQuottedPropName,
  getGenerics,
  getTypeName,
  Import,
  ImportFromSource,
  PickByValue,
  propNameRequiresQuotes,
  sortUndefinedFirst,
  Static,
  StaticParameters,
  TypeWriter,
  TypeWriters,
  Write,
} from '@runtyping/generator'
import { titleCase } from 'title-case'
import { Symbol as CompilerSymbol, SymbolFlags, Type } from 'ts-morph'
import { getEnumMembers } from '@runtyping/generator/dist/enum'

export default class IoTsTypeWriters extends TypeWriters {
  #module = 'io-ts';

  override *defaultStaticImplementation(): TypeWriter {
    yield [Import, { source: this.#module, name: 'TypeOf' }]
    yield [Static, 'TypeOf<typeof ${name}>']
  }

  protected override *lazy(type: Type): TypeWriter {
    const name = getTypeName(type)
    const alias = `_${name}`
    yield [Import, { source: this.#module, name: 'recursion' }]
    yield [Import, { source: this.#module, name: 'Type' }]
    yield [ImportFromSource, { alias, name }]
    yield [DeclareType, `Type<${alias}>`]
    yield [Write, `recursion('${getTypeName(type)}', () => `]
    yield* this.typeWriter(type)
    yield [Write, ')']
  }

  protected override null() {
    return this.#simple('null')
  }

  protected override string() {
    return this.#simple('string')
  }

  protected override number() {
    return this.#simple('number')
  }

  protected override boolean() {
    return this.#simple('boolean')
  }

  protected override *array(type: Type): TypeWriter {
    yield [Import, { source: this.#module, name: 'array' }]
    yield [Write, 'array(']
    yield* this.generateOrReuseType(type.getArrayElementTypeOrThrow())
    yield [Write, ')']
  }

  protected override *tuple(type: Type): TypeWriter {
    yield [Import, { source: this.#module, name: 'tuple' }]
    yield [Write, 'tuple([']
    for (const element of type.getTupleElements()) {
      yield* this.generateOrReuseType(element)
      yield [Write, ',']
    }
    yield [Write, '])']
  }

  protected override *enum(type: Type): TypeWriter {
    const name = getTypeName(type)
    const members = getEnumMembers(type)
    const alias = `_${name}`
    yield [Import, { source: this.#module, name: 'union' }]
    yield [ImportFromSource, { alias, name }]
    yield [Write, 'union([']
    for (const member of members) {
      yield* this.#literal(`${alias}.${getTypeName(member)}`)
      yield [Write, ', ']
    }
    yield [Write, '])']
  }

  protected override *enumLiteral(type: Type): TypeWriter {
    const enumTypeName = Enum.getEnumIdentifierNameFromEnumLiteral(type)
    const alias = `_${enumTypeName}`
    yield [ImportFromSource, { name: enumTypeName, alias }]
    yield* this.#literal(`${alias}.${getTypeName(type)}`)
  }

  protected override *intersection(type: Type): TypeWriter {
    yield [Import, { source: this.#module, name: 'intersection' }]
    const items = type.getIntersectionTypes().sort(sortUndefinedFirst)
    if (!items.length) return yield* this.undefined()
    yield [Write, 'intersection([']
    for (const item of items) {
      yield* this.generateOrReuseType(item)
      yield [Write, ', ']
    }
    yield [Write, '])']
  }

  protected override *union(type: Type): TypeWriter {
    yield [Import, { source: this.#module, name: 'union' }]
    const items = type.getUnionTypes().sort(sortUndefinedFirst)
    if (!items.length) return yield* this.#simple('undefined')
    yield [Write, 'union([']
    for (const item of items) {
      yield* this.generateOrReuseType(item)
      yield [Write, ', ']
    }
    yield [Write, '])']
  }

  protected override literal(type: Type) {
    return this.#literal(type.getText())
  }

  *#literal(value: string): TypeWriter {
    yield [Import, { source: this.#module, name: 'literal' }]
    yield [Write, `literal(${value})`]
  }

  protected override any() {
    return this.unknown()
  }

  protected override unknown() {
    return this.#simple('unknown')
  }

  protected override undefined() {
    return this.#simple('undefined')
  }

  protected override void() {
    return this.#simple('void')
  }

  protected override function() {
    return this.#simple('Function')
  }

  protected override *builtInObject(type: Type): TypeWriter {
    const T = type.getText()
    yield [Import, { source: this.#module, name: 'Type' }]
    yield [Import, { source: this.#module, name: 'failure' }]
    yield [Import, { source: this.#module, name: 'success' }]
    yield [
      Write,
      `new Type<${T}>(
        '${T}',
        (u): u is ${T} => u instanceof ${T},
        (i, c) => i instanceof ${T} ? success(i) : failure(i, c, 'not a ${T}'),
        (a) => a
      )`,
    ]
  }

  protected override *stringIndexedObject(type: Type): TypeWriter {
    yield [Import, { source: this.#module, name: 'string' }]
    yield [Import, { source: this.#module, name: 'record' }]
    yield [Write, 'record(string, ']
    yield* this.generateOrReuseType(type.getStringIndexType()!)
    yield [Write, ')']
  }

  protected override *numberIndexedObject(type: Type): TypeWriter {
    yield [Import, { source: this.#module, name: 'number' }]
    yield [Import, { source: this.#module, name: 'record' }]
    yield [Write, 'record(number, ']
    yield* this.generateOrReuseType(type.getNumberIndexType()!)
    yield [Write, ')']
  }

  protected override *object(type: Type): TypeWriter {
    const typeArguments = getGenerics(type).map((typeArgument) =>
      typeArgument.getText()
    )

    const [requiredProps, optionalProps] = separate(
      type.getProperties(),
      (item): item is CompilerSymbol => item.hasFlags(SymbolFlags.Optional)
    )

    if (optionalProps.length && requiredProps.length)
      yield* this.#writeRequiredAndOptionalObjectProperties(
        requiredProps,
        optionalProps,
        typeArguments
      )
    else if (requiredProps.length)
      yield* this.#writeRequiredObjectProperties(requiredProps, typeArguments)
    else if (optionalProps.length)
      yield* this.#writerOptionalObjectProperties(optionalProps, typeArguments)
  }

  *#writeRequiredObjectProperties(
    properties: CompilerSymbol[],
    typeArguments: string[]
  ): TypeWriter {
    yield [Import, { source: this.#module, name: 'type' }]
    yield [Write, 'type({']
    yield* this.#writeObjectProperties(properties, typeArguments)
    yield [Write, '})']
  }

  *#writerOptionalObjectProperties(
    properties: CompilerSymbol[],
    typeArguments: string[]
  ): TypeWriter {
    yield [Import, { source: this.#module, name: 'partial' }]
    yield [Write, 'partial({']
    yield* this.#writeObjectProperties(properties, typeArguments)
    yield [Write, '})']
  }

  *#writeRequiredAndOptionalObjectProperties(
    requiredProperties: CompilerSymbol[],
    optionalProperties: CompilerSymbol[],
    typeArguments: string[]
  ): TypeWriter {
    yield [Import, { source: this.#module, name: 'intersection' }]
    yield [Write, 'intersection([']
    yield* this.#writeRequiredObjectProperties(
      requiredProperties,
      typeArguments
    )
    yield [Write, ', ']
    yield* this.#writerOptionalObjectProperties(
      optionalProperties,
      typeArguments
    )
    yield [Write, '])']
  }

  *#writeObjectProperties(
    properties: CompilerSymbol[],
    typeArguments: string[]
  ): TypeWriter {
    for (const property of properties) {
      yield [
        Write,
        `${
          propNameRequiresQuotes(property.getName())
            ? `[\`${escapeQuottedPropName(property.getName())}\`]`
            : property.getName()
        }:`,
      ]
      const propertyType = property.getValueDeclarationOrThrow().getType()
      if (!typeArguments.includes(propertyType.getText()))
        yield* this.generateOrReuseType(propertyType)
      else yield [Write, propertyType.getText()]
      yield [Write, ',']
    }
  }

  protected override *genericObject(type: Type): TypeWriter {
    const generics = getGenerics(type)

    yield [Import, { source: this.#module, name: 'TypeOf' }]
    yield [Import, { source: this.#module, name: 'Type' }]
    yield [Write, '<']

    for (const generic of generics) {
      const constraint = generic.getConstraint()
      const constraintDeclaredType = constraint?.getSymbol()?.getDeclaredType()

      yield [Write, `${generic.getText()} extends `]

      if (constraintDeclaredType) {
        yield [Write, 'TypeOf<typeof ']
        yield* this.generateOrReuseType(constraintDeclaredType)
        yield [Write, '>']
      } else yield [Write, constraint ? constraint.getText() : 'any']

      yield [Write, ', ']
    }

    yield [Write, '>(']

    for (const generic of generics)
      yield [Write, `${generic.getText()}: Type<${generic.getText()}>, `]

    yield [Write, ') => ']

    yield* this.object(type)

    yield [
      StaticParameters,
      generics.map((generic) => {
        const constraint = generic.getConstraint()
        const constraintDeclaredType = constraint
          ?.getSymbol()
          ?.getDeclaredType()
        return {
          name: generic.getText(),
          constraint: constraintDeclaredType
            ? getTypeName(constraintDeclaredType)
            : constraint?.getText(),
        }
      }),
    ]

    yield [
      Static,
      `TypeOf<ReturnType<typeof ${getTypeName(type)}<${generics.map((generic) =>
        generic.getText()
      )}>>>`,
    ]
  }

  *#simple(type: SimpleIOTSType): TypeWriter {
    if (primitiveNames.includes(type)) {
      const alias = titleCase(type)
      yield [Import, { source: this.#module, name: type, alias }]
      yield [Write, alias]
    } else {
      yield [Import, { source: this.#module, name: type }]
      yield [Write, type]
    }
  }
}

/**
 * An io-type is considered "simple" when it is already an io-ts type
 * and not a function that returns an io-ts.
 *
 * For example, `number` & `string` are simple types, but
 * `array` and `object` are not.
 */
type SimpleIOTSType = keyof PickByValue<typeof t, t.Type<any>>
const primitiveNames = ['any', 'never', 'null', 'undefined', 'unknown', 'void']