import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    ToolbarComponent,
  ]
})
export class SharedModule { 
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
