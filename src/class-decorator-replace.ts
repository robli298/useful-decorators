export function Clean<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        ngOnDestroy() {
            console.log('Cleaning....');
            constructor.prototype.ngOnDestroy.apply(this, arguments);
        }
    }
}