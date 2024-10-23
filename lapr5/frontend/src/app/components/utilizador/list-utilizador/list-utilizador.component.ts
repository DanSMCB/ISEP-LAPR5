import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UtilizadorService } from "../../../services/utilizador-service";
import { Utilizador } from "../../../models/utilizador";
import { UtilizadorMap } from '../../../mappers/utilizador-map';

@Component({
  selector: 'app-list-utilizador',
  templateUrl: './list-utilizador.component.html',
  styleUrl: './list-utilizador.component.css'
})
export class ListUtilizadorComponent implements OnInit {

  utilizadores: Utilizador[] = [];
  paginatedUtilizadores: Utilizador[] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  formResetToggle: boolean = false;

  constructor(private utilizadorService: UtilizadorService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getUtilizadoresAindaNaoAprovados();
  }

  getUtilizadoresAindaNaoAprovados(): void {
    this.utilizadorService.getUtilizadoresAindaNaoAprovados()
      .subscribe(utilizadores => {
        this.utilizadores = UtilizadorMap.toViewModelList(utilizadores)
        this.getPaginatedUtilizadores();
      });
  }

  updateUtilizadorState(codigo: string, novoEstado: string): void {
    this.utilizadorService.updateUtilizadorState(codigo, novoEstado)
      .subscribe(() => {
        this.getUtilizadoresAindaNaoAprovados();
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
