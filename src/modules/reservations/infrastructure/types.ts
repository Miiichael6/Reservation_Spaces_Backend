import { table } from "./config";

export const RESERVATION_TYPES = {
    SAVE_ONE: Symbol(`${table}_SAVE_ONE`),
    FIND: Symbol(`${table}_FIND`),
    REPOSITORY: Symbol(`${table}_REPOSITORY`),
    UPDATE_ONE: Symbol(`${table}_UPDATE_ONE`),
    LOGIN: Symbol(`${table}_LOGIN`),
    GET_LOGGED_USER: Symbol(`${table}_GET_LOGGED_USER`)
};