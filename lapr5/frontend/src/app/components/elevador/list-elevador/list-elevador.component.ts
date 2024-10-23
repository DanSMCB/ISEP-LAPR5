import { Component } from '@angular/core';
import { Elevador } from "../../../models/elevador";
import { ElevadorService } from "../../../services/elevador-service";
import { Location } from "@angular/common";

import { ElevadorMap } from '../../../mappers/elevador-map';
@Component({
  selector: 'app-list-elevador',
  templateUrl: './list-elevador.component.html',
  styleUrl: './list-elevador.component.css'
})
export class ListElevadorComponent {

  elevadores: Elevador[] = [];
  paginatedElevadores: Elevador[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  formResetToggle: boolean = false;

  constructor(private elevadorService: ElevadorService,
    private location: Location
  ) { }

  getElevadores(id: string): void {
    this.elevadorService.getElevadores(id)
      .subscribe(elevadores => {
        this.elevadores = ElevadorMap.toViewModelList(elevadores)
        this.getPaginatedElevadores();
      });
  }

  getPaginatedElevadores(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedElevadores = this.elevadores.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.endIndex < this.elevadores.length) {
      this.currentPage++;
      this.getPaginatedElevadores();
    }
  }

  prevPage(): void {
    if (this.startIndex > 0) {
      this.currentPage--;
      this.getPaginatedElevadores();
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
