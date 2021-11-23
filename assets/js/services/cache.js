/* UNUSED FOR NOW, TOOL FOR FUTURE UPDATE (23/11/2021) */
const cache = {}

const set = (key, data) => {
    cache[key] = {
        data,
        cachedAt: new Date().getTime(),
    }
}

const get = (key) => {
    return new Promise(resolve => {
        resolve(
            (cache[key] && cache[key].cachedAt + (5 * 60000) > new Date().getTime()) ?
            cache[key].data :
            null)
    })
}

export default {
    set,
    get,
}