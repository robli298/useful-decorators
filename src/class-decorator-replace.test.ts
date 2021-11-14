import {Clean} from './class-decorator-replace';

@Clean 
export class Greeting {
    constructor() {}

    ngOnDestroy() {

    }
}

it('It should call console log', () => {
    const spy = jest.spyOn(console, 'log');
    new Greeting().ngOnDestroy();
    expect(spy).toBeCalledWith('Cleaning....');
})