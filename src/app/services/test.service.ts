import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }

  returnPromise(num: number): Promise<number> {
    return new Promise((accept, reject) => {
      setTimeout(() => {
        if (!isNaN(num)) {
          accept(num * 2);          
        } else {
          reject('eps, no era un número');
        }
      }, 2000);
    });
  }

  returnObservable(num: number): Observable<any> {
    return new Observable((subscriber) => {
      if (isNaN(num)) {
        subscriber.error('eps, no era un número')
      }
      subscriber.next(num * 2);
      subscriber.next(num * 3);
      subscriber.next(num * 4);
      setTimeout(() => {
        subscriber.next(num * 5);
        subscriber.complete();
      }, 1000);
    });
  }

}
