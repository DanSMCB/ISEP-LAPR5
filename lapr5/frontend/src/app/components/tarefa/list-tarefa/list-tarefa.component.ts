import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TarefaService } from "../../../services/tarefa-service";
import { Tarefa } from "../../../models/tarefa";
import { TarefaMap } from '../../../mappers/tarefa-map';

@Component({
  selector: 'app-list-tarefa',
  templateUrl: './list-tarefa.component.html',
  styleUrl: './list-tarefa.component.css'
})
export class ListTarefaComponent implements OnInit {

  tarefas: Tarefa[] = [];
  paginatedTarefas: Tarefa[] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;

  formResetToggle: boolean = false;

  constructor(private tarefaService: TarefaService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getTarefasAindaNaoAprovadas();
  }

  getTarefasAindaNaoAprovadas(): void {
    this.tarefaService.getTarefasAindaNaoAprovadas()
      .subscribe(tarefas => {
        this.tarefas = TarefaMap.toViewModelList(tarefas)
        this.getPaginatedTarefas();
      });
  }

  updateEstadoDaTarefa(codigo: string, novoEstado: string): void {
    this.tarefaService.updateEstadoDaTarefa(codigo, novoEstado)
      .subscribe(() => {
        this.getTarefasAindaNaoAprovadas();
      });
  }

  parsePisos(pisos: { piso: string }[]): string {
    return pisos.map(item => item.piso).join(',');
  }

  getPaginatedTarefas(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTarefas = this.tarefas.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.endIndex < this.tarefas.length) {
      this.currentPage++;
      this.getPaginatedTarefas();
    }
  }

  prevPage(): void {
    if (this.startIndex > 0) {
      this.currentPage--;
      this.getPaginatedTarefas();
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
