import { table } from "./config";

export const BOOKING_TYPES = {
    SAVE_ONE: Symbol(`${table}_SAVE_ONE`),
    FIND: Symbol(`${table}_FIND`),
    REPOSITORY: Symbol(`${table}_REPOSITORY`),
};