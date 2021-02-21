import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HeroesComponent } from "./features/hero/containers/heroes/heroes.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "heroes",
    pathMatch: "full",
  },
  {
    path: "heroes",
    component: HeroesComponent, // Eager load only the default route
  },
  {
    path: "villains",
    loadChildren: () =>
      import("./features/villain/villains.module").then(
        (m) => m.VillainsModule
      ),
  },
  {
    path: "**",
    redirectTo: "",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
