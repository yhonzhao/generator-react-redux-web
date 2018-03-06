export function createTypes(name) {
    return {
        REQUEST: `${name}@REQUEST`,
        SUCCESS: `${name}@SUCCESS`,
        FAILURE: `${name}@FAILURE`
    }
}
