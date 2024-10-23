import { Component } from '@angular/core';
import { Piso } from "../../../models/piso";
import { PisoService } from "../../../services/piso-service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-update-piso',
  templateUrl: './update-piso.component.html',
  styleUrl: './update-piso.component.css'
})
export class UpdatePisoComponent {

  pisos: Piso[] = [];

  formResetToggle: boolean = false;

  constructor(private pisoService: PisoService,
    private location: Location
  ) { }

  updatePiso(edificio: string, piso: string, descricao: string) {
    this.pisoService.updatePiso(edificio, piso, descricao).subscribe(piso => {
      this.pisos.push(piso);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
