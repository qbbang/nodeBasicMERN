import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [

  ]
})
export class CoreModule { 
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        
      ]
    }
  }
}
