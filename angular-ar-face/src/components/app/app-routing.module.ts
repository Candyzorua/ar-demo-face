import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlassesComponent } from '../glasses/glasses.component';
import { LipstickComponent } from '../lipstick/lipstick.component'

const routes: Routes = [
  { path: "", redirectTo: 'glasses', pathMatch: "full"},
  { path: 'glasses', component: GlassesComponent },
  { path: 'lipstick', component: LipstickComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
