import { Injectable } from "@angular/core";
import { Corporativo } from "../models/corporativo.model";
import { DetalleCorporativo } from "../models/detalle-corporativo.model";
import { Contacto } from "../models/contacto.model";

@Injectable({
  providedIn: "root",
})
export class TransformDataCorporativosService {
  constructor() {}

  /**
   * getters
   */
  getDetalleCorporativo(id: number, data: any) {
    const corporativo = {
      id: id,
      S_NombreCorto: data.nombreCorto,
      S_NombreCompleto: data.nombreCompleto,
      S_LogoURL:
        "https://devschoolcloud.com/api/public/logos/Ps1n80pFAphZ2bgEKdWtXE32qviJUixvgxc2RbB8.jpeg",
      S_Activo: parseInt(data.status, 10),
      FK_Asignado_id: 2,
      D_FechaIncorporacion: this.getFechaIncorporacionJSON(
        data.fechaIncorporacion
      ),
    };
    return corporativo;
  }



  getDataCorporativos(data: any[]): Corporativo[] {
    const corporativos = [];

    if (!data || data.length < 1) {
      return corporativos;
    }

    let aux: Corporativo = null;

    data.forEach((corporativo) => {
      aux = {
        Id: corporativo.id,
        Logo: corporativo.S_LogoURL,
        NombreCorto: corporativo.S_NombreCorto,
        NombreCompleto: corporativo.S_NombreCompleto,
        Url: `devschoolcloud.com/sa/#/${corporativo.S_SystemUrl}`,
        FechaIncorporacion: corporativo.D_FechaIncorporacion,
        FechaCreacion: corporativo.created_at,
        UsrCreador: corporativo["user_created"].S_Nombre,
        UsrAsignado: corporativo["asignado"].S_Nombre,
        Status: this.getStatus(corporativo.S_Activo),
      };
      corporativos.push(aux);
    });

    return corporativos;
  }

 
  getDataDetalleCorporativo(data: any): DetalleCorporativo {
    let corporativo: DetalleCorporativo = {
      Id: 0,
      Logo: "",
      NombreCorto: "",
      NombreCompleto: "",
      Url: "",
      FechaIncorporacion: "",
      Status: 0,
      Contactos: [],
    };

    if (!data) {
      return corporativo;
    }

    corporativo = {
      Id: data.id,
      Logo: data.S_LogoURL,
      NombreCorto: data.S_NombreCorto,
      NombreCompleto: data.S_NombreCompleto,
      Url: data.S_SystemUrl,
      FechaIncorporacion: this.getFechaIncorporacion(data.D_FechaIncorporacion),
      Status: data.S_Activo,
      Contactos: this.getContactos(data.tw_contactos_corporativo),
    };

    return corporativo;
  }

  private getContactos(data: any[]): Contacto[] {
    const contactos = [];

    if (!data || data.length < 1) {
      return contactos;
    }

    let aux: Contacto = null;

    data.forEach((contacto) => {
      aux = {
        Id: contacto.id,
        Nombre: contacto.S_Nombre,
        Puesto: contacto.S_Puesto,
        Comentarios: contacto.S_Comentarios,
        TelefonoFijo: contacto.N_TelefonoFijo,
        TelefonoMovil: contacto.N_TelefonoMovil,
        Email: contacto.S_Email,
      };
      contactos.push(aux);
    });

    return contactos;
  }


  getAgregaContacto(data: any): Contacto {
    const aux: Contacto = {
      Id: data.id,
      Nombre: data.S_Nombre,
      Puesto: data.S_Puesto,
      Comentarios: data.S_Comentarios,
      TelefonoFijo: data.N_TelefonoFijo,
      TelefonoMovil: data.N_TelefonoMovil,
      Email: data.S_Email,
    };

    return aux;
  }

  private getFechaIncorporacion(fechaInc: string): any {
    const fecha = fechaInc.split(" ");
    const elementos = fecha[0].split("-");
    const obj = {
      year: parseInt(elementos[0], 10),
      month: parseInt(elementos[1], 10),
      day: parseInt(elementos[2], 10),
    };
    return obj;
  }

  private getFechaIncorporacionJSON(fechaInc: any): any {
    const year = fechaInc.year;
    let month = fechaInc.month;
    let day = fechaInc.day;

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  }

  getContacto(id: number, data: any): any {
    const contacto = {
      S_Nombre: this.capitalizar(data.nombre),
      S_Puesto: this.capitalizar(data.puesto),
      S_Comentarios: data.comentarios,
      N_TelefonoFijo: parseInt(data.telefonoFijo, 10),
      N_TelefonoMovil: parseInt(data.telefonoMovil, 10),
      S_Email: data.email,
      tw_corporativo_id: id,
    };

    return contacto;
  }

  private capitalizar(value: string) {
    value = value.toLowerCase();
    let nombres = value.split(" ");

    nombres = nombres.map((nombre) => {
      return nombre[0].toUpperCase() + nombre.substr(1);
    });

    return nombres.join(" ");
  }

  private getStatus(status: number): string {
    switch (status) {
      case 0:
        return "Inactivo";
      case 1:
        return "Activo";
      default:
        return "Inactivo";
    }
  }
}
