import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TarefaService } from "../../../services/tarefa-service";
import { Tarefa } from "../../../models/tarefa";
import { TarefaMap } from '../../../mappers/tarefa-map';

@Component({
  selector: 'app-filter-tarefa',
  templateUrl: './filter-tarefa.component.html',
  styleUrl: './filter-tarefa.component.css'
})
export class FilterTarefaComponent implements OnInit {

  tarefas: Tarefa[] = [];
  paginatedTarefas: Tarefa[] = [];
  itemsPerPage: number = 5;
  currentPage: number = 1;
  filtroSelecionado: string = 'estado';
  estadoFilter: string = '';
  tipoDeRobotFilter: string = '';
  contactoRequisitanteFilter: string = '';

  formResetToggle: boolean = false;

  constructor(private tarefaService: TarefaService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getTarefas();
  }

  getTarefas(): void {
    this.tarefaService.getTarefas()
      .subscribe(tarefas => {
        this.tarefas = TarefaMap.toViewModelList(tarefas)
        this.getPaginatedTarefas();
      });
  }

  parsePisos(pisos: { piso: string }[]): string {
    return pisos.map(item => item.piso).join(',');
  }

  applyFilters(): void {
    this.currentPage = 1;
    this.getPaginatedTarefas();
  }

  clearFilters(): void {
    this.estadoFilter = '';
    this.tipoDeRobotFilter = '';
    this.contactoRequisitanteFilter = '';
  
    this.filtroSelecionado = 'estado';
  
    this.applyFilters();
  }

  getPaginatedTarefas(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
  
    this.paginatedTarefas = this.tarefas
      .filter(tarefa => {
        const filtroTipoDeRobot = this.filtroSelecionado === 'tipoDeRobot' && (this.tipoDeRobotFilter === '' || tarefa.tipoDeRobot.toLowerCase() === this.tipoDeRobotFilter.toLowerCase());
        const filtroEstado = this.filtroSelecionado === 'estado' && (this.estadoFilter === '' || tarefa.estado.toLowerCase() === this.estadoFilter.toLowerCase());
        const filtroContacto = this.filtroSelecionado === 'contacto' && (this.contactoRequisitanteFilter === '' || tarefa.contactoRequisitante.toLowerCase().includes(this.contactoRequisitanteFilter.toLowerCase()));
  
        return filtroTipoDeRobot || filtroEstado || filtroContacto;
      })
      .slice(startIndex, endIndex);
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
