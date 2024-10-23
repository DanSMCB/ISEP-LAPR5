import { Component } from '@angular/core';
import { Elevador } from "../../../models/elevador";
import { ElevadorService } from "../../../services/elevador-service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-create-elevador',
  templateUrl: './create-elevador.component.html',
  styleUrl: './create-elevador.component.css'
})
export class CreateElevadorComponent {

  elevadores: Elevador[] = [];

  formResetToggle: boolean = false;

  constructor(private elevadorService: ElevadorService,
    private location: Location
  ) { }
  
  createElevador(codigo: string, edificio: string, pisos: Array<{ piso: string }>) {
    this.elevadorService.createElevador(codigo, edificio, pisos).subscribe(elevador => {
      this.elevadores.push(elevador);
    });
  }

  parsePisos(value: string): Array<{ piso: string }> {
    const pisosArray = value.split(',').map(piso => ({ piso: piso.trim() }));
    return pisosArray;
  }  

  goBack(): void {
    this.location.back();
  }
}
