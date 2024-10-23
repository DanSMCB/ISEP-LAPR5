import { Component } from '@angular/core';
import { Piso } from "../../../models/piso";
import { PisoService } from "../../../services/piso-service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-create-piso',
  templateUrl: './create-piso.component.html',
  styleUrl: './create-piso.component.css'
})
export class CreatePisoComponent {

  pisos: Piso[] = [];

  formResetToggle: boolean = false;

  constructor(private pisoService: PisoService,
    private location: Location
  ) { }

  createPiso(edificio: string, piso: string, descricao: string) {
    this.pisoService.createPiso(edificio, piso, descricao).subscribe(piso => {
      this.pisos.push(piso);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
