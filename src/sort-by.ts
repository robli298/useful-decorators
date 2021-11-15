export function SortBy<T extends Array<any>>(property: string) {
    return function (target: any, propertyKey: string) {

        let value: T;

        const getter = function () {
            return value;
        }

        const setter = function (newValue: T) {
            value = newValue.sort((a: any, b: any) => {
                return a[property] - b[property];
            })
        }

        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter
        })
    }
}