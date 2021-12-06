import { Debounce } from '../debounce';

jest.mock('lodash/debounce', () => {
	return (func: any, wait: number) => {
		let timeout: any;
		return function (this: any, ...args: any[]) {
			const context = this;
			clearTimeout(timeout);
			timeout = setTimeout(() => func.apply(context, args), wait);
		};
	};
});

jest.useFakeTimers();

describe('debounce', () => {
	class Greeting {
		i = 0;
		constructor() {
			// not yet implemented
		}
		@Debounce(100)
		increment(value: number) {
			this.i++;
			this.i+=(+value);
		}
	}

	test('should increment once', () => {
		const g = new Greeting();
		g.increment(0);
		g.increment(0);
		g.increment(0);
		jest.advanceTimersByTime(200);

		expect(g.i).toEqual(1);
	});

	test('should increment twice', () => {
		const g = new Greeting();
		g.increment(0);
		jest.advanceTimersByTime(200);
		g.increment(0);

		expect(g.i).toEqual(1);
	});

	test('should increment once and add value given', () => {
		const g = new Greeting();
		g.increment(2);
		g.increment(2);
		jest.advanceTimersByTime(200);

		expect(g.i).toEqual(3);
	});
});
