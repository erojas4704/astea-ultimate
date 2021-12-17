import { sameDay } from "./DateUtils";

describe("Date utilities work as expected", () => {
    test("sameDay works", () => {
        const date = new Date();
        const yesterday = new Date(date.getTime() - 24 * 60 * 60 * 1000);
        const tomorrow = new Date(date.getTime() + 24 * 60 * 60 * 1000);

        expect(sameDay(date, new Date())).toBe(true);
        expect(sameDay(date, tomorrow)).toBe(false);
        expect(sameDay(date, yesterday)).toBe(false);
    });
})