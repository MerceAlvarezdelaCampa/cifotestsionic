import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  result: number = 0;

  constructor(private testService: TestService) {}

  setResult() {
    const num = +(<HTMLInputElement>document.getElementById('test')!).value;
    console.log('inici funció');    
    this.testService.returnPromise(num).then((result: number) => {
      console.log('El resultat és ', result);
      this.result = result;
      console.log('fi funció');
    }, (err)=> {
      console.log(err);
    });
    this.testService.returnPromise(num).then((result: number) => {
      console.log('El resultat és ', result);
      this.result = result;
      console.log('fi funció');
    }, (err)=> {
      console.log(err);
    });
    console.log('fi total funció');    
  }

  async setResultAsync() {
    const num = +(<HTMLInputElement>document.getElementById('test')!).value;
    console.log('inici funció');    
    try {
      const result = await this.testService.returnPromise(num);
      console.log('El resultat és ', result);
      this.result = result;
      console.log('fi funció');
      const result2 = await this.testService.returnPromise(num);
      console.log('El resultat és ', result2);
      this.result = result2;  
    } catch (error) {
      console.error('error', error);
    }
    console.log('fi funció');
    console.log('fi total funció');
  }

  setResultObservable() {
    const num = +(<HTMLInputElement>document.getElementById('test')!).value;
    console.log('just before subscribe');
    this.testService.returnObservable(num).subscribe({
      next(x) {
        console.log('got value ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
    this.testService.returnObservable(num).subscribe((test) => {
      console.log(test);      
    });
    console.log('just after subscribe');
  }

}
