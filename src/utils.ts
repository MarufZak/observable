export const getObjectTrace = (...keys: string[]) => {
    return keys.filter(Boolean).join(".");
};
