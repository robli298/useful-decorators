import { SortBy } from './sort-by';

interface Item {
    key: number,
    value: string
}

export class Greeting {
    @SortBy('key')
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

    @SortBy('key')
    name: string = 'test';

    constructor() { }

    ngOnDestroy() {

    }
}

it('It should sort the array', () => {
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