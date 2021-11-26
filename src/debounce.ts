export function Debounce(wait: number, immediate: boolean = false) {
	return function (target: any, _propertyKey: string, descriptor: PropertyDescriptor) {
		const targetMethod: Function = descriptor.value;
		descriptor.value = function (...args: any[]) {
			console.log(`Log...${wait}`);
            console.log(`Log...${immediate}`);
			targetMethod.apply(target, args);
		};
	};
}
