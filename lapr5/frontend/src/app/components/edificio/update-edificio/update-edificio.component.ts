import { Component } from '@angular/core';
import { Edificio } from "../../../models/edificio";
import { EdificioService } from "../../../services/edificio-service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-edificio',
  templateUrl: './update-edificio.component.html',
  styleUrl: './update-edificio.component.css'
})
export class UpdateEdificioComponent {

  edificios: Edificio[] = [];

  formResetToggle: boolean = false;

  constructor(private edificioService: EdificioService,
    private location: Location
  ) { }

  updateEdificio(codigo: string, nome: string, descricao: string, pisoMaxSize: string) {
    this.edificioService.updateEdificio(codigo, nome, descricao, pisoMaxSize).subscribe(edificio => {
      this.edificios.push(edificio);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
