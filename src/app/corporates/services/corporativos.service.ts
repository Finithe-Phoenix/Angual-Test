import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

import { TransformDataCorporativosService } from "./transform-data-corporativos.service";

@Injectable({
  providedIn: "root",
})
export class CorporativosService {
  //api y token del servicio REST
  public apiURL = environment.apiURL;
  public auth_token = "Bearer " + localStorage.getItem("tokenscloud");

  constructor(
    private http: HttpClient,
    private transform: TransformDataCorporativosService
  ) {}

  /**
   * gets del corporativo
   */

  getQuery(query: string): any {
    const headers = new HttpHeaders({
      Authorization: this.auth_token,
    });
    return this.http.get(`${this.apiURL}${query}`, { headers });
  }

  getDetalleCorporativo(id: number): Observable<any> {
    return this.getQuery(`/corporativos/${id}`).pipe(
      map((data) => {
        //aplica un pipe siempre
        return this.transform.getDataDetalleCorporativo(
          data[`data`].corporativo
        );
      })
    );
  }

  getCorporativos(): Observable<any> {
    return this.getQuery(`/corporativos`).pipe(
      map((data) => {
        //aplica un pipe siempre
        return this.transform.getDataCorporativos(data[`data`]);
      })
    );
  }

  /**
   * Detalle del corporativo
   */
  setDetalleCorporativo(id: number, corporativo: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.auth_token,
    });

    return this.http.put(`${this.apiURL}/corporativos/${id}`, corporativo, {
      headers,
    });
  }

  /**
   * CRUD de contactos (CREATE,READ,UPDATE,DELETE)
   */

  crearContacto(contacto: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.auth_token,
    });
    return this.http.post(`${this.apiURL}/contactos`, contacto, { headers });
  }

  eliminaContacto(id: number): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.auth_token,
    });

    return this.http.delete(`${this.apiURL}/contactos/${id}`, { headers });
  }

  actualizaContacto(id: number, contacto: any): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: this.auth_token,
    });
    return this.http.put(`${this.apiURL}/contactos/${id}`, contacto, {
      headers,
    });
  }
}
