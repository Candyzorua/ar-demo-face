import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VtoService } from 'src/services/vto-service/vto.service';
declare var WEBARROCKSFACE: any;
declare var WebARRocksMirror: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  public mode: string = "";

  constructor(
    private router: Router,
    private vtoService: VtoService
  ) {
    vtoService.getMode().subscribe((newMode: string) => {
      this.mode = newMode;
    })
  }

  switchMode(path: string) {
    WEBARROCKSFACE.destroy()
      .then(() => {
        WebARRocksMirror.destroy()
      }).then(() => {
        this.router.navigate(['/' + path]);
      });
  }
}
