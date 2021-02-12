import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DetalleCorporativo } from "../models/detalle-corporativo.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CorporativosService } from "../services/corporativos.service";
import { TransformDataCorporativosService } from "../services/transform-data-corporativos.service";
import { Contacto } from "../models/contacto.model";
import Swal from "sweetalert2";

@Component({
  selector: "app-corporativos-detalle",
  templateUrl: "./corporates-details.component.html",
  styleUrls: [
    "./corporates-details.component.scss",
    "../../../assets/sass/libs/select.scss",
    "../../../assets/sass/libs/datepicker.scss",
  ],
})
export class CorporatesDetailsComponent implements OnInit {
  /**
   * Variables
   */
  formcontacto: FormGroup;
  formdetalle: FormGroup;
  editar = false;
  mensaje = false;
  idContacto = 0;
  indexContacto = -1;
  actualizar = false;
  limpiar = true;
  contactos: Contacto[] = [];
  corporativo: DetalleCorporativo = {
    Id: 0,
    Logo: "",
    NombreCorto: "",
    NombreCompleto: "",
    Url: "",
    FechaIncorporacion: {},
    Status: 0,
    Contactos: [],
  };

  constructor(
    private corporativoService: CorporativosService,
    private transform: TransformDataCorporativosService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.crearFormulario();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(
      (data: { corporativos: DetalleCorporativo }) => {
        this.corporativo = data.corporativos;
        this.contactos = data.corporativos.Contactos;
        this.loadForm();
      }
    );
  }

  /**
   *     Getters
   */

  /**
   * Get NombreCompleto
   */
  get nombreCortoSanitized() {
    return (
      this.formdetalle.get("nombreCorto").invalid &&
      this.formdetalle.get("nombreCorto").touched
    );
  }

  /**
   * Get NombreCompleto
   */
  get nombreCompletoSanitized() {
    return (
      this.formdetalle.get("nombreCompleto").invalid &&
      this.formdetalle.get("nombreCompleto").touched
    );
  }

  /**
   * Get FechaIncorporacion
   */
  get fechaIncorporacionSanitized() {
    return (
      this.formdetalle.get("fechaIncorporacion").invalid &&
      this.formdetalle.get("fechaIncorporacion").touched
    );
  }

  /**
   * Get Status
   */
  get statusSanitized() {
    return (
      this.formdetalle.get("status").invalid &&
      this.formdetalle.get("status").touched
    );
  }

  /**
   * Validations
   */

  /**
   * Get Nombre
   */
  get nombreSanitized() {
    return (
      this.formcontacto.get("nombre").invalid &&
      this.formcontacto.get("nombre").touched
    );
  }

  /**
   * Get Puesto
   */
  get puestoSanitized() {
    return (
      this.formcontacto.get("puesto").invalid &&
      this.formcontacto.get("puesto").touched
    );
  }

  /**
   * Get Comentarios
   */
  get comentariosSanitized() {
    return (
      this.formcontacto.get("comentarios").invalid &&
      this.formcontacto.get("comentarios").touched
    );
  }

  /**
   * Get Telefono
   */
  get telefonoFijoSanitized() {
    return (
      this.formcontacto.get("telefonoFijo").invalid &&
      this.formcontacto.get("telefonoFijo").touched
    );
  }

  /**
   * Get TelefonoMovil
   */

  get telefonoMovilSanitized() {
    return (
      this.formcontacto.get("telefonoMovil").invalid &&
      this.formcontacto.get("telefonoMovil").touched
    );
  }

  /**
   * Get Email
   */
  get emailSanitized() {
    return (
      this.formcontacto.get("email").invalid &&
      this.formcontacto.get("email").touched
    );
  }

  /**
   * FORMS
   */

  loadForm() {
    this.formdetalle.setValue({
      nombreCorto: this.corporativo.NombreCorto,
      fechaIncorporacion: this.corporativo.FechaIncorporacion,
      nombreCompleto: this.corporativo.NombreCompleto,
      url: this.corporativo.Url,
      status: this.corporativo.Status,
    });
  }

  crearFormulario() {
    this.formdetalle = this.fb.group({
      nombreCorto: [{ value: "", disabled: true }, Validators.required],
      fechaIncorporacion: [{ value: "", disabled: true }, Validators.required],
      nombreCompleto: [{ value: "", disabled: true }, Validators.required],
      url: [{ value: "", disabled: true }, Validators.required],
      status: [{ value: "", disabled: true }, Validators.required],
    });

    this.formcontacto = this.fb.group({
      nombre: ["", Validators.required],
      puesto: ["", Validators.required],
      comentarios: [""],
      telefonoFijo: ["", Validators.pattern("^[0-9]{10}$")],
      telefonoMovil: ["", Validators.pattern("^[0-9]{10}$")],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$"),
        ],
      ],
    });
  }

  permitirEditar(ban?: Boolean) {
    this.editar = !this.editar;
    if (this.editar) {
      this.formdetalle.enable();
      this.formdetalle.get("url").disable();
    } else {
      this.formdetalle.disable();
      if (!ban) {
        this.loadForm();
      }
    }
  }

  actualizarCorporativo() {
    if (this.formdetalle.invalid) {
      return;
    }

    const corporativo = this.transform.getDetalleCorporativo(
      this.corporativo.Id,
      this.formdetalle.value
    );

    this.corporativoService
      .setDetalleCorporativo(this.corporativo.Id, corporativo)
      .subscribe(
        (resp) => {
          this.mensaje = false;
        },
        (err) => {
          console.log("No se pudo actualizar", err);
          this.mensaje = true;
        }
      );

    if (!this.mensaje) {
      this.editar = !this.editar;
      this.corporativo.NombreCorto = this.formdetalle.value.nombreCorto;
      this.formdetalle.disable();
    }
  }

  contactActivity() {
    if (this.formcontacto.invalid) {
      return this.formcontacto.markAllAsTouched();
    }
    //Swall propperties
    Swal.fire({
      title: "Un momento",
      text: "Guardando información.",
      icon: "info",
      allowOutsideClick: false,
    });
    Swal.showLoading();

    if (this.actualizar) {
      const contacto = this.transform.getContacto(
        this.corporativo.Id,
        this.formcontacto.value
      );
      this.corporativoService
        .actualizaContacto(this.idContacto, contacto)
        .subscribe((res) => {
          const aux = this.transform.getAgregaContacto(res.data);
          this.contactos.splice(this.indexContacto, 1, aux);
          this.idContacto = 0;
          this.indexContacto = -1;
          this.limpiar = true;
          this.actualizar = false;
          Swal.fire({
            //Distintivo Daniel
            title: "Aguacate editado",
            text: "Se actualizó correctamente",
            icon: "success",
          });
        });
    } else {
      const contacto = this.transform.getContacto(
        this.corporativo.Id,
        this.formcontacto.value
      );
      this.corporativoService.crearContacto(contacto).subscribe(
        (resp) => {
          const aux = this.transform.getAgregaContacto(resp.data);
          this.contactos.splice(this.contactos.length, 0, aux);
          this.limpiar = true;
          Swal.fire({
            title: "Nuevo contacto",
            text: "Se guardó correctamente",
            icon: "success",
          });
        },
        (err) => {
          console.log("No se pudo crear", err);
          this.limpiar = false;
        }
      );
    }

    if (this.limpiar) {
      this.clearFormContacto();
    }
  }

  deleteContact(id: number, i: number) {
    this.actualizar = false;
    this.clearFormContacto();
    Swal.fire({
      title: "Eliminación",
      text: "¿Estas seguro de eliminarlo?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        this.contactos.splice(i, 1);
        this.corporativoService.eliminaContacto(id).subscribe();
        Swal.fire("Eliminado!", "Tu contacto ha sido eliminado", "success");
      }
    });
  }

  fillData(i: number) {
    this.actualizar = true;

    const aux = this.contactos[i];

    this.idContacto = aux.Id;
    this.indexContacto = i;

    this.formcontacto.setValue({
      nombre: aux.Nombre,
      puesto: aux.Puesto,
      comentarios: aux.Comentarios,
      telefonoFijo: aux.TelefonoFijo,
      telefonoMovil: aux.TelefonoMovil,
      email: aux.Email,
    });
  }

  private clearFormContacto() {
    this.formcontacto.reset({
      nombre: "",
      puesto: "",
      comentarios: "",
      telefonoFijo: "",
      telefonoMovil: "",
      email: "",
    });
  }
}
