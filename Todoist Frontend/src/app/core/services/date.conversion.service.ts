import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateConversionService {

  constructor() { }


  convertDateToString(date: Date | null): string | null {
    return date ? date.toISOString().split('T')[0] : null;
  }
}
