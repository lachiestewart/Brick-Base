import axios from 'axios'
import oauthSignature from 'oauth-signature'

const baseURL = process.env.BRICKLINK_BASE_URL

const consumerKey = process.env.BRICKLINK_CONSUMER_KEY
const consumerSecret = process.env.BRICKLINK_CONSUMER_SECRET
const tokenValue = process.env.BRICKLINK_TOKEN_VALUE
const tokenSecret = process.env.BRICKLINK_TOKEN_SECRET

const bricklink = axios.create({
    baseURL
})

interface IOAuthParams {
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
        oauth_timestamp: Math.floor(Date.now() / 1000) + 2,
        oauth_signature_method: 'HMAC-SHA1'
    }

    oauthParams.oauth_signature = oauthSignature.generate(
        httpMethod,
        baseURL + endPoint,
        oauthParams,
        consumerSecret,
        tokenSecret,
        { encodeSignature: false }
    )

    const authHeader = 'OAuth realm="", ' + Object.entries(oauthParams).map(([key, value]) => `${key}="${value}"`).join(', ')

    return authHeader
}

const getItem = async ({ no, type }: BricklinkItemRequest) => {
    console.log(no) 
    console.log(type)
    const endPoint = `/items/${type.toLowerCase()}/${no}`
    const authHeader = generateAuthHeader('GET', endPoint)
    const response = await bricklink.get(endPoint, {
        headers: {
            Authorization: authHeader
        }
    })
    return response.data
}

export { getItem }