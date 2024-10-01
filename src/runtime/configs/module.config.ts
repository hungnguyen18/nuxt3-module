import { createConsola } from 'consola'
import type {
    BasePublicRuntimeConfig,
    BaseRuntimeConfig,
    ModuleOptions,
} from '../types'
import { namespace } from './'

const style = {
    padding: 10,
    borderColor: 'red',
}

export function validate({
    buildConfig,
    // publicRuntimeConfig,
}: {
    buildConfig: ModuleOptions
    runtimeConfig?: BaseRuntimeConfig
    publicRuntimeConfig?: BasePublicRuntimeConfig
}) {
    const logger = createConsola().withTag(namespace)

    if (!buildConfig?.prefix) {
        logger.box({
            title: '[ERROR] MISSING BUILD CONFIG',
            message: `[${namespace}] missing prefix`,
            style,
        })
        process.exit(1)
    }
}
