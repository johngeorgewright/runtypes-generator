# runtyping

Generate [runtypes](https://github.com/pelotom/runtypes) from static types & JSON schema.

## Instructions

### Install

```
npm install runtypes
npm install -D runtyping
```

### Use from the command line

1. Create a file, in the root of your project, called "runtyping.yml".

```yaml
# runtyping.yml

# This config represents a list of files to create.
- targetFile: src/runtypes.ts # The file to create
  sourceTypes:
    - file: src/types.ts # The file where your type lives
      type: Foo # The type you want to convert to a runtype

    - file: json/my-json-schema.json # You can even use JSON schema files!!
      type: ExampleType
```

2. Then run: `npx runtyping`

### Use from a script

Basic example:

```ts
import {generate} from 'runtyping';

const generator = generate({
  buildInstructions: [
      {
        targetFile: `src/runtypes.ts`,
        sourceTypes: [
            { file: 'src/types.ts', type: 'Foo' },
            { file: 'json/my-json-schema.json', type: 'ExampleType' }
        ]
      },
      // Add more as needed
  ]
});

for await (const file of generator) {
  console.log(`Writing runtype: ${file.getFilePath()}`);
  file.saveSync();
}
```

You can also pass a custom tsconfig file:

```ts
const generator = generate({
  buildInstructions: [ /* ... */ ],
  tsConfigFile: '/path/to/tsconfig.json'
});
```

...or a custom ts-morph project (for the internal compiler):

(see [generate.ts](src/generate.ts) for the defaults)

```ts
import {Project} from "ts-morph";

const generator = generate({
  buildInstructions: [ /* ... */ ],
  project: new Project({
    compilerOptions: {
        // Enable this if you need nulls to be considered
      strictNullChecks: true
    },
    // ...
  })
});
```

## Thanks

Inspired by a [gist](https://gist.github.com/skurfuerst/a07ab23c3e40a45f2268f7700ceeceaf) by [skurfuerst](https://gist.github.com/skurfuerst).
