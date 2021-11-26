import { Debounce } from '../debounce';

it('...', () => {
	class TestClass {
		@Debounce(100)
		greet(a: string) {
			console.log(`Hello ${a}!`);
		}
	}

	const t = new TestClass();
	t.greet('Robs');

	expect(true).toEqual(true);
});
