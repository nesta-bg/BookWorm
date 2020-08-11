import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PriceValidators {
    static shouldBePositive(control: AbstractControl): ValidationErrors | null {
        if (control.value < 0) {
            return { shouldBePositive: true };
        }
        return null;
    }
}
