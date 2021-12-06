import { debounce } from 'lodash';


const fn = (b: any) => console.log(b);

(debounce(fn, 100))('b');
