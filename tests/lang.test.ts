import { describe, expect, it } from 'vitest'
import EN from '../src/runtime/lang/en.json'
import VI from '../src/runtime/lang/vi.json'

const compareLanguageObjects = (
    en: Record<string, string>,
    vi: Record<string, string>,
): boolean => {
    const missingKeysInEnglish: string[] = Object.keys(vi).filter(
        (key) => !(key in en),
    )
    const missingKeysInVietnamese: string[] = Object.keys(en).filter(
        (key) => !(key in vi),
    )

    if (missingKeysInEnglish.length > 0) {
        console.error('--------------------------')
        console.error('Missing keys in en.json:')
        missingKeysInEnglish.forEach((key) => {
            console.error(`- Missing key: ${key}`)
        })
    }

    if (missingKeysInVietnamese.length > 0) {
        console.error('--------------------------')

        console.error('Missing keys in vi.json:')
        missingKeysInVietnamese.forEach((key) => {
            console.error(`- Missing key: ${key}`)
        })
    }

    return (
        missingKeysInEnglish.length === 0 &&
        missingKeysInVietnamese.length === 0
    )
}

describe('i18n lang files', async () => {
    const enKeys = Object.keys(EN).sort()

    it('should have all keys translated', () => {
        expect(compareLanguageObjects(EN, VI)).toBe(true)
    })

    it('should have keys as a-z or 0-9 hyphen or colon', () => {
        enKeys.forEach((key) => {
            // Exclude keys containing curly braces
            if (!/\{.*\}/.test(EN[key])) {
                expect(key).toMatch(/^[a-z0-9:-]+$/)
            } else {
                // If the key contains curly braces, it's acceptable
                expect(key).toMatch(/[^\n\r{\u2028\u2029]*\{.*\}.*/)
            }
        })
    })
})
