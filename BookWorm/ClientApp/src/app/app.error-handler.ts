import { ErrorHandler, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export class AppErrorHandler implements ErrorHandler {

    constructor(@Inject(ToastrService) private toastr: ToastrService) {
    }

    handleError(error: any): void {
        this.toastr.error('An unexpected error happened.', 'Error', {
            timeOut: 1000,
            closeButton: true,
            progressBar: true,
            progressAnimation: 'increasing'
        });
        console.log(error);
    }
}
