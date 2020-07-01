import { Subject } from 'rxjs';

export class ErrorService {
    constructor() {
        this.$errorSource = new Subject();
        this.error$ = this.$errorSource.asObservable();
    }

    setErrorMessage(msg) {
        this.$errorSource.next(msg);
    }
}