import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchnote'
})
export class SearchnotePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    throw new Error("Method not implemented.");
  }

  // transform(notes: Notes[], searchTerm: string): Notes[] {
  //   if(!notes || !searchTerm){
  //     return notes;
  //   }
  //   return notes.filter(notes=>
  //     notes.title.toLowerCase().indexOf(searchTerm.toLowerCase())!=-1);
  // }

}
