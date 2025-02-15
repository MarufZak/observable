import { TSubject, TSubjectObject } from "./types";

export const getObjectTrace = (...keys: string[]) => {
    return keys.filter(Boolean).join(".");
};

export const isObjectSubject = (subject: TSubject): subject is TSubjectObject => {
    return typeof subject === "object";
};
