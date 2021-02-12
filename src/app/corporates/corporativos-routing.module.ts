import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CorporatesListComponent } from "./corporates-list/corporates-list.component";
import { CorporatesDetailsComponent } from "./corporates-details/corporates-details.component";
import { CorporativosResolverGuard } from "./corporativos-resolver.guard";

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: CorporatesListComponent,
        data: {
          title: "Corporativos",
        },
        resolve: { corporativos: CorporativosResolverGuard },
      },
      {
        path: "detalle/:id",
        component: CorporatesDetailsComponent,
        data: {
          title: "Detalle Corporativo",
        },
        resolve: { corporativos: CorporativosResolverGuard },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporativosRoutingModule {}
