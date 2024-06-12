import bcrypt from 'bcrypt'
import * as fixedTerms from '../resources/invalid_passwords.json'

const hash = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10)
}

const compare = async (password: string, comp: string): Promise<boolean> => {
    return await bcrypt.compare(password, comp)
}

const test = (password: string, relativeTerms: string[]): boolean => {
    for (const term of relativeTerms.concat(fixedTerms.invalid_strings)) {
        if (password.toLowerCase().replace(" ", "").includes(term.toLowerCase())) {
            return false
        }
    }
    return true
}

export {hash, compare, test}