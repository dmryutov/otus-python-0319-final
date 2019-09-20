import {tryParseInt, round, roundLocale, uniqueID} from '@/utils/math';


describe('utils/math/tryParseInt', () => {
    it('convert number formatted in string', () => {
        const value = tryParseInt('123');
        expect(value).toBe(123);
    });

    it('convert number', () => {
        const value = tryParseInt(123);
        expect(value).toBe(123);
    });

    it('convert string', () => {
        const value = tryParseInt('some_text');
        expect(value).toBe('some_text');
    });

    it('convert empty string', () => {
        const value = tryParseInt('');
        expect(value).toBeNull();
    });

    it('convert null', () => {
        const value = tryParseInt(null);
        expect(value).toBeNull();
    });
});


describe('utils/math/round', () => {
    it('round string', () => {
        const value = round('some_text');
        expect(value).toBe(NaN);
    });

    it('round positive digits value', () => {
        const value = round(1234.567, 1);
        expect(value).toBe(1234.6);
    });

    it('round zero digits value (default)', () => {
        const value = round(1234.567);
        expect(value).toBe(1235);
    });

    it('round negative digits value', () => {
        const value = round(1234.567, -1);
        expect(value).toBe(1230);
    });
});


describe('utils/math/roundLocale', () => {
    it('round string', () => {
        const value = roundLocale('some_text');
        expect(value).toBe('-');
    });

    it('round positive digits value', () => {
        const value = roundLocale(1234.567, 1);
        expect(value).toBe('1,234.6');
    });

    it('round zero digits value (default)', () => {
        const value = roundLocale(1234.567);
        expect(value).toBe('1,235');
    });

    it('round negative digits value', () => {
        const value = roundLocale(1234.567, -1);
        expect(value).toBe('1,230');
    });
});


describe('utils/math/uniqueID', () => {
    it('generate unique ID', () => {
        const value = uniqueID(5);
        expect(value.length).toBe(5);
        expect(value[value.length - 1]).toBe('s');
    });

    it('generate unique ID with default length', () => {
        const value = uniqueID();
        expect(value.length).toBe(10);
        expect(value[value.length - 1]).toBe('s');
    });
});
