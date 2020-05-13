import { NgModule } from "@angular/core";
import { VillainsComponent } from "./containers/villains/villains.component";
import { VillainDetailComponent } from "./containers/villain-detail/villain-detail.component";
import { RouterModule, Routes } from "@angular/router";
import {SharedModule} from '../../shared/shared.module';

const routes: Routes = [
  {
    path: "",
    component: VillainsComponent
  },
  {
    path: "villain-detail/:id",
    component: VillainDetailComponent
  }
];

@NgModule({
  declarations: [VillainsComponent, VillainDetailComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class VillainsModule {}
