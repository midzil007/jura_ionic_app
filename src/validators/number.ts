import { FormControl, Validators} from '@angular/forms';
 
export class NumberValidator {
 
    static isValidNumber(control: FormControl): any {

          if(isNaN(control.value)){
            return {
                "Vložte číslo": true
            };
        }   


        return null;
    }
 
}