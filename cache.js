let lastTime = null
let lastResponse = null

const cacheExpirationMs = process.env.CACHE_EXPIRATION_MS || 5 * 60 * 1000

export const get = () => {
    const now = Date.now()

    if (!lastTime || !lastResponse) {
        console.log('No cache yet')
        return null
    }

    if (now > lastTime + cacheExpirationMs) {
        console.log('Expired after', cacheExpirationMs, 'ms')
        console.log('resetting cache')
        lastTime = null
        return null
    }

    console.log('returning cached response')
    return lastResponse
}

export const set = (newVal) => {
    lastResponse = newVal
    lastTime = Date.now()
    console.log('Setting new cache at', lastTime)
}


