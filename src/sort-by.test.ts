import { SortBy } from './sort-by';

interface Item {
    key: number,
    value: string
}

export class Greeting {
    @SortBy('key', {
        isAscending: false
    })
    array: Item[] = [{
        key: 3,
        value: 'a'
    }, {
        key: 2,
        value: 'b'
    }, {
        key: 1,
        value: 'c'
    }]

    @SortBy('', {
        isAscending: false
    })
    public numbers: number[] = [3, 4, 1, 9];

    @SortBy()
    public dates: Date[] = [new Date('2020-06-17'), new Date('2020-06-16'), new Date('2020-06-20'), new Date('2020-06-10')];

    constructor() { }

    ngOnDestroy() {

    }
}

xit('It should sort the array of object by key', () => {
    expect([{
        key: 1,
        value: 'c'
    }, {
        key: 2,
        value: 'b'
    }, {
        key: 3,
        value: 'a'
    }]).toEqual(new Greeting().array);
})

it('It should sort the array numbers in descending order', () => {
    expect([9, 4, 3, 1]).toEqual(new Greeting().numbers);
})

xit('It should sort date array', () => {
    const dates = [new Date('2020-06-10'), new Date('2020-06-16'), new Date('2020-06-17'), new Date('2020-06-20')];
    expect(dates).toEqual(new Greeting().dates);
})

xit('It should thrown an error', () => {
    expect(() => {
        class Foo {
            @SortBy()
            myNumber: number = 1;
            constructor() { }
        }
        new Foo();
    }).toThrow(Error)
})