module.exports = {
    hasKeys: (obj, keys) => {
        const obj_keys = Object.keys(obj)
        return keys.every(key => {
            return obj_keys.includes(key)
        })
    }
}