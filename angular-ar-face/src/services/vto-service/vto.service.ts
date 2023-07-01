import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VtoService {
  public mode: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { 

  }

  getMode(): BehaviorSubject<string> {
    return this.mode;
  }

  changeMode(newMode: string): void {
    this.mode.next(newMode);
  }
}
