import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EdificioService } from '../../services/edificio-service';
import { Location } from "@angular/common";
@Component({
  selector: 'app-algav',
  templateUrl: './algav.component.html',
  styleUrl: './algav.component.css'
})
export class AlgavComponent {

  s : string = '';
  formResetToggle: boolean = false;

  constructor(private elevadorService: EdificioService,
    private location: Location
  ) { }

  getCaminhoEd(id: string, id2 : string): void {
    this.elevadorService.getCaminhoEd(id, id2).subscribe(caminho => this.s);
  }

  goBack(): void {
    this.location.back();
  }
}

