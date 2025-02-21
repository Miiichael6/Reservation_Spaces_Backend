import { table } from "./config";

export const BOOKING_TYPES = {
    SAVE_ONE: Symbol(`${table}_SAVE_ONE`),
    FIND: Symbol(`${table}_FIND`),
    FIND_BOOKINGS_INFO: Symbol(`${table}_FIND_BOOKINGS_INFO`),
    REPOSITORY: Symbol(`${table}_REPOSITORY`),
};