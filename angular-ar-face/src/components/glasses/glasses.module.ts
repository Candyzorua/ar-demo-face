import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlassesComponent } from './glasses.component';
import { CanvasModule } from '../canvas/canvas.module';

@NgModule({
  declarations: [
    GlassesComponent
  ],
  imports: [
    CommonModule,
    CanvasModule
  ]
})
export class GlassesModule { }
