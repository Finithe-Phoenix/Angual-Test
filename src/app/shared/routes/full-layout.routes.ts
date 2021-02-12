import { Routes, RouterModule } from "@angular/router";

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("../../dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  //Route
  {
    path: "corporativos",
    loadChildren: () =>
      import("../../corporates/corporativos.module").then(
        (m) => m.CorporativosModule
      ),
  },
];
