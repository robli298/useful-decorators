const sortFunctionFactory = (isAscending: boolean | undefined, type?: 'string' | 'number' | 'date' | undefined, sortByProperty?: string | symbol | number) => {
    const order = isAscending ? 1 : -1;
    if (sortByProperty) {
        return (a: any, b: any) => {
            let sortResult = 0;
            if (a[sortByProperty] < b[sortByProperty]) {
                sortResult = -1;
            } else if (a[sortByProperty] > b[sortByProperty]) {
                sortResult = 1;
            }
            return sortResult * order;
        }
    }
    return type === 'string' ? sortFunctionStringFactory(order, sortByProperty) : (a: any, b: any) => {
        let sortResult = 0;
        if (a < b) {
            sortResult = -1;
        } else if (a > b) {
            sortResult = 1;
        }
        return sortResult * order;
    }
};

// I use the browser localeCompare() method to cover a much wider range of characters, which allows a more meaningful and sort orders
const sortFunctionStringFactory = (order: number, sortByProperty?: string | symbol | number) => {
    if (sortByProperty) {
        return (a: any, b: any) => {
            return a[sortByProperty].localeCompare(b[sortByProperty]) * order;
        }
    }
    return (a: any, b: any) => {
        return a.localeCompare(b) * order;
    }
}

/**
 * It sorts the elements of an array by a given property, which can have a type of string, number or date. It can also sort
 * array of primitive values. In that case, sort by property can be omitted.
 * 
 * @param sortByProperty property to be used during the sort process or undefined in case it is an array of primitive values.
 * @param options { isAscending: boolean, type: string | date | number | undefined }
 * 
 * If no order is specified, it defaults to ascending.
 * 
 * @returns sorted array based on options given.
 */
export function SortBy<T>(sortByProperty?: string | symbol | number, options?: { isAscending?: boolean, type?: 'string' | 'number' | 'date' }) {

    options = { ...{ isAscending: true }, ...options };

    const value = Symbol();

    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            set: function (newValue: Array<T>) {
                if (!newValue || !Array.isArray(newValue)) {
                    throw Error(`The ${propertyKey} is not an Array!`)
                }
                target[value] = newValue.sort(
                    sortFunctionFactory(options?.isAscending, options?.type, sortByProperty)
                );
            }
            ,
            get: function () { return target[value]; }
        })
    }
}

