import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UtilizadorService } from "../../../services/utilizador-service";
import { Utilizador } from "../../../models/utilizador";
import { UtilizadorMap } from '../../../mappers/utilizador-map';

@Component({
  selector: 'app-list-all-utilizador',
  templateUrl: './list-all-utilizador.component.html',
  styleUrl: './list-all-utilizador.component.css'
})
export class ListAllUtilizadorComponent implements OnInit {

  utilizadores: Utilizador[] = [];
  paginatedUtilizadores: Utilizador[] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  formResetToggle: boolean = false;

  constructor(private utilizadorService: UtilizadorService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getUtilizadores();
  }

  getUtilizadores(): void {
    this.utilizadorService.getUtilizadores()
      .subscribe(utilizadores => {
        this.utilizadores = UtilizadorMap.toViewModelList(utilizadores)
        this.getPaginatedUtilizadores();
      });
  }

  getPaginatedUtilizadores(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUtilizadores = this.utilizadores.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.endIndex < this.utilizadores.length) {
      this.currentPage++;
      this.getPaginatedUtilizadores();
    }
  }

  prevPage(): void {
    if (this.startIndex > 0) {
      this.currentPage--;
      this.getPaginatedUtilizadores();
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
