export const getObjectTrace = (...keys: string[]) => {
    return keys.join("").split("").join(".");
};
