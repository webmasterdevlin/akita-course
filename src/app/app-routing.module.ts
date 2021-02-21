import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "heroes",
    pathMatch: "full",
  },
  {
    path: "heroes",
    loadChildren: () =>
      import("./features/hero/heroes.module").then((m) => m.HeroesModule),
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
