import axios from 'axios'
import oauthSignature from 'oauth-signature'

const BASE_URL = 'https://api.bricklink.com/api/store/v1'

const consumerKey = process.env.BRICKLINK_CONSUMER_KEY
const consumerSecret = process.env.BRICKLINK_CONSUMER_SECRET
const tokenValue = process.env.BRICKLINK_TOKEN_VALUE
const tokenSecret = process.env.BRICKLINK_TOKEN_SECRET

const bricklink = axios.create({
    baseURL: BASE_URL,
})

interface IOAuthParams {
    [key: string]: string | number
    oauth_version: '1.0'
    oauth_consumer_key: string
    oauth_token: string
    oauth_timestamp: number
    oauth_signature_method: 'HMAC-SHA1'
    oauth_signature?: string
}

const generateAuthHeader = (httpMethod: string, endPoint: string): string => {
    const oauthParams: IOAuthParams = {
        oauth_version: '1.0',
        oauth_consumer_key: consumerKey,
        oauth_token: tokenValue,
        oauth_timestamp: Math.floor(Date.now() / 1000),
        oauth_signature_method: 'HMAC-SHA1'
    }

    oauthParams.oauth_signature = oauthSignature.generate(
        httpMethod,
        BASE_URL + endPoint,
        oauthParams,
        consumerSecret,
        tokenSecret,
        { encodeSignature: false }
    )

    return 'OAuth realm="", ' + Object.entries(oauthParams).map(([key, value]) => `${key}="${value}"`).join(', ')
}

const getSet = async (setNumber: string) => {
    const endPoint = `/items/set/${setNumber}`
    const authHeader = generateAuthHeader('GET', endPoint)
    const response = await bricklink.get(endPoint, {
        headers: {
            Authorization: authHeader
        }
    })
    return response.data
}

export { getSet }