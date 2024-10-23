import { Component } from '@angular/core';
import { Edificio } from "../../../models/edificio";
import { EdificioService } from "../../../services/edificio-service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-create-edificio',
  templateUrl: './create-edificio.component.html',
  styleUrl: './create-edificio.component.css'
})
export class CreateEdificioComponent {

  edificios: Edificio[] = [];

  formResetToggle: boolean = false;

  constructor(private edificioService: EdificioService,
    private location: Location
  ) { }
  
  createEdificio(codigo: string, nome: string, descricao: string, pisoMaxSize: string) {
    this.edificioService.createEdificio(codigo, nome, descricao, pisoMaxSize).subscribe(edificio => {
      this.edificios.push(edificio);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
