import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
    entries: ['src/module'],
    failOnWarn: false,
    declaration: true,
})
