import {resizeArray, cumSum} from '@/utils/containers';


describe('utils/containers/resizeArray', () => {
    it('same size', () => {
        const arr1 = [10, 20, 30];
        const arr2 = resizeArray(arr1, 3);
        expect(arr2).toEqual(arr1);
    });

    it('increase size', () => {
        const arr1 = [10, 20, 30];
        const arr2 = resizeArray(arr1, 5, 's');
        expect(arr2).toEqual([10, 20, 30, 's', 's']);
    });

    it('decrease size', () => {
        const arr1 = [10, 20, 30];
        const arr2 = resizeArray(arr1, 2);
        expect(arr2).toEqual([10, 20]);
    });
});


describe('utils/containers/cumSum', () => {
    it('sum', () => {
        const arr1 = [10, 20, 30];
        const arr2 = cumSum(arr1);
        expect(arr2).toEqual([10, 30, 60]);
    });

    it('empty array', () => {
        const arr1 = [];
        const arr2 = cumSum(arr1);
        expect(arr2).toEqual([]);
    });
});
