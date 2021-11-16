// TODO check date sorting
// TODO check string sorting

const sortFn = (p: string | symbol | number | undefined, isAscending: boolean) => {
    if (isAscending) {
        return (a: any, b: any) => {
            if (p && a.hasOwnProperty(p) && b.hasOwnProperty(p)) {
                return a[p] - b[p];
            }
            return a - b;
        }
    } else {
        return (a: any, b: any) => {
            if (p && b.hasOwnProperty(p) && a.hasOwnProperty(p)) {
                return b[p] - a[p];
            }
            return b - a;
        }
    }
}

export function SortBy<T>(sortByProperty?: string | symbol | number, options?: { isAscending?: boolean, type?: 'string' | 'number' | 'date' | 'object' }) {
    const defaultOptions = {
        ...{
            isAscending: true,
            type: 'object'
        }, ...options
    }
    const value = Symbol();

    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            set: (newValue: Array<T>) => {
                if (!newValue || !Array.isArray(newValue)) {
                    throw Error(`The ${propertyKey} is not an Array!`)
                }
                target[value] = newValue.sort(sortFn(sortByProperty, defaultOptions.isAscending));
            }
            ,
            get: () => target[value]
        })
    }
}