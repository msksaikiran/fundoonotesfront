import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
@Pipe({
  name: 'customDatePipe'
})
export class CustomDatePipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.transform(value, "EEEE d MMMM y h:mm a");
  }

}
