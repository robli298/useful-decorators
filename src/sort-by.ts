

const sortFunctionFactory = (isAscending: boolean | undefined, sortByProperty: string | symbol | number | undefined) => {
    const inversor = isAscending ? 1 : -1;
    if (sortByProperty) {
        return (a: any, b: any) => {
            if (a[sortByProperty] < b[sortByProperty]) {
                return -1 * inversor;
            }

            if (a[sortByProperty] > b[sortByProperty]) {
                return 1 * inversor;
            }

            return 0;
        }
    }
    return (a: any, b: any) => {
        if (a < b) {
            return -1 * inversor;
        }

        if (a > b) {
            return 1 * inversor;
        }

        return 0;
    }
};

export function SortBy<T>(sortByProperty?: string | symbol | number, options?: { isAscending?: boolean, type: 'string' | 'number' | 'date' }) {

    options = { ...{ type: 'string', isAscending: true }, ...options };

    const value = Symbol();

    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            set: function (newValue: Array<T>) {
                if (!newValue || !Array.isArray(newValue)) {
                    throw Error(`The ${propertyKey} is not an Array!`)
                }
                target[value] = newValue.sort(
                    sortFunctionFactory(options?.isAscending, sortByProperty)
                );
            }
            ,
            get: function () { return target[value]; }
        })
    }
}

