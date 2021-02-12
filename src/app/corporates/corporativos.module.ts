import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { CorporativosRoutingModule } from "./corporativos-routing.module";

import { CorporatesListComponent } from "./corporates-list/corporates-list.component";
import { CorporatesDetailsComponent } from "./corporates-details/corporates-details.component";

import { HttpClientModule } from "@angular/common/http";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgSelectModule } from "@ng-select/ng-select";

@NgModule({
  imports: [
    CommonModule,
    CorporativosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    NgxDatatableModule,
    HttpClientModule,
  ],
  exports: [],
  declarations: [CorporatesListComponent, CorporatesDetailsComponent],
  providers: [],
})
export class CorporativosModule {}
