import { SortBy } from './sort-by';

interface Item {
    key: number,
    value: string
}

export class Greeting {
    @SortBy('value', {
        isAscending: false,
        type: 'string'
    })
    array: Item[] = [{
        key: 1,
        value: 'a'
    }, {
        key: 2,
        value: 'b'
    }, {
        key: 3,
        value: 'c'
    }]

    @SortBy('', {
        isAscending: false,
        type: 'number'
    })
    public numbers: number[] = [3, 4, 1, 9];

    @SortBy('', {
        type: 'number'
    })
    public numbersAscending: number[] = [4, 3, 2, 1];

    @SortBy()
    public dates: Date[] = [new Date('2020-06-17'), new Date('2020-06-16'), new Date('2020-06-20'), new Date('2020-06-10')];

    constructor() { }

    ngOnDestroy() {

    }
}

it('It should sort the array of object by key in descending order', () => {
    expect([{
        key: 3,
        value: 'c'
    }, {
        key: 2,
        value: 'b'
    }, {
        key: 1,
        value: 'a'
    }]).toEqual(new Greeting().array);
})

it('It should sort the array of numbers in descending order', () => {
    expect([9, 4, 3, 1]).toEqual(new Greeting().numbers);
})

it('It should sort the array of numbers in ascending order', () => {
    expect([1, 2, 3, 4]).toEqual(new Greeting().numbersAscending);
})

it('It should sort date array in ascending order', () => {
    const dates = [new Date('2020-06-10'), new Date('2020-06-16'), new Date('2020-06-17'), new Date('2020-06-20')];
    expect(dates).toEqual(new Greeting().dates);
})

it('It should thrown an error', () => {
    expect(() => {
        class Foo {
            @SortBy()
            myNumber: number = 1;
            constructor() { }
        }
        new Foo();
    }).toThrow(Error)
})