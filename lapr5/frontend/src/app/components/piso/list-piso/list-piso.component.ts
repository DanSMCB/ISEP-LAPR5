import { Component } from '@angular/core';
import { Piso } from "../../../models/piso";
import { PisoService } from "../../../services/piso-service";
import { Location } from "@angular/common";

import { PisoMap } from '../../../mappers/piso-map';

@Component({
  selector: 'app-list-piso',
  templateUrl: './list-piso.component.html',
  styleUrl: './list-piso.component.css'
})
export class ListPisoComponent {

  pisos: Piso[] = [];
  paginatedPisos: Piso[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  formResetToggle: boolean = false;

  constructor(private pisoService: PisoService,
    private location: Location
  ) { }

  getAllPisosByEdificio(edificio: string): void {
    this.pisoService.getAllPisosByEdificio(edificio)
      .subscribe(pisos => {
        this.pisos = PisoMap.toViewModelList(pisos)
        this.getPaginatedPisos();
      });
  }

  getPaginatedPisos(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPisos = this.pisos.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.endIndex < this.pisos.length) {
      this.currentPage++;
      this.getPaginatedPisos();
    }
  }

  prevPage(): void {
    if (this.startIndex > 0) {
      this.currentPage--;
      this.getPaginatedPisos();
    }
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }

  goBack(): void {
    this.location.back();
  }
}
