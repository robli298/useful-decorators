import { debounce, DebounceSettings } from 'lodash';

export function Debounce(wait: number, options: DebounceSettings = {}) {
	return function (_target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
		const debouncedCache = new WeakMap(); // used to cache previous debounced function
		const originalMethod = descriptor.value;

		descriptor.value = function (...args: any[]) {
			let debounced = debouncedCache.get(this);
			// debounced is not yet instantiated, then execute it
			if (!debounced) {
				debounced = debounce(originalMethod, wait, options).bind(this);
				debouncedCache.set(this, debounced);
			}
			debounced(args);
		};
		return descriptor;
	};
}
