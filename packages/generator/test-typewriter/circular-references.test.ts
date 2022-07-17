import generateFixture from './generateFixture'

let warn: jest.Mock<void>
let consoleWarn = console.warn

beforeEach(() => {
  warn = jest.fn()
  console.warn = warn
})

afterEach(() => {
  console.warn = consoleWarn
})

test('circular references', async () => {
  expect(
    (await generateFixture('circular-references', ['User'])).getText()
  ).toMatchSnapshot()

  expect(warn.mock.calls).toMatchInlineSnapshot(`
    Array [
      Array [
        "Spotted a circular reference between \`Teacher\` and \`Student\`. This may cause infinite loops at runtime.",
      ],
      Array [
        "Spotted a circular reference between \`Student\` and \`Teacher\`. This may cause infinite loops at runtime.",
      ],
    ]
  `)
})
