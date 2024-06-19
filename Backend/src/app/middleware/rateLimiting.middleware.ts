import { rateLimit } from 'express-rate-limit'

const limit = +process.env.RATE_LIMIT || 100
const windowDuration = +process.env.WINDOW_DURATION_MIN || 15 

const limiter = rateLimit({
	windowMs: windowDuration * 60 * 1000,
	limit: limit, 
	standardHeaders: 'draft-7',
	legacyHeaders: false,
})

export default limiter