import { NgModule, Optional, SkipSelf } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [],
  imports: [HttpClientModule],
  providers: []
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "Core is already loaded. Import it in the AppModule only"
      );
    }
  }
}
