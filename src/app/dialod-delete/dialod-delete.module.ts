import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialsModule } from '../materials/materials.module';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';



@NgModule({
  declarations: [DeleteModalComponent],
  imports: [
    CommonModule,
    MaterialsModule
  ]
})
export class DialodDeleteModule { }
