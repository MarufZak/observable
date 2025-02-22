import { TSubject, TSubjectObject } from "./types";

export const getObjectTrace = (...keys: string[]) => {
    return keys.filter(Boolean).join(".");
};

export const isObjectSubject = (subject: TSubject): subject is TSubjectObject => {
    return typeof subject === "object";
};

const primitiveTypes = [
    "boolean",
    "string",
    "bigint",
    "number",
    "undefined",
    "symbol",
];

export const isPrimitiveType = (value: unknown): value is unknown => {
    return primitiveTypes.includes(typeof value);
};
