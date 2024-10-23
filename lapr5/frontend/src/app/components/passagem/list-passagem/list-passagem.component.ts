import { Component } from '@angular/core';
import { Passagem } from "../../../models/passagem";
import { PassagemService } from "../../../services/passagem-service";
import { Location } from "@angular/common";

import { PassagemMap } from '../../../mappers/passagem-map';

@Component({
  selector: 'app-list-passagem',
  templateUrl: './list-passagem.component.html',
  styleUrl: './list-passagem.component.css'
})
export class ListPassagemComponent {

  passagens: Passagem[] = [];
  paginatedPassagens: Passagem[] = [];
  itemsPerPage: number = 4;
  currentPage: number = 1;

  formResetToggle: boolean = false;

  constructor(private passagemService: PassagemService,
    private location: Location
  ) { }

  listPassagemBetweenEdificios(edificio1: string, edificio2: string): void {
    this.passagemService.listPassagemBetweenEdificios(edificio1, edificio2)
      .subscribe(passagens => {
        this.passagens = PassagemMap.toViewModelList(passagens)
        this.getPaginatedPassagens();
      });
  }

  getPaginatedPassagens(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPassagens = this.passagens.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.endIndex < this.passagens.length) {
      this.currentPage++;
      this.getPaginatedPassagens();
    }
  }

  prevPage(): void {
    if (this.startIndex > 0) {
      this.currentPage--;
      this.getPaginatedPassagens();
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
