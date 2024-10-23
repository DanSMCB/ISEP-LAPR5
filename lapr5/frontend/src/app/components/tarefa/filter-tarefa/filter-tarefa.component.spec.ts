import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { FilterTarefaComponent } from './filter-tarefa.component';
import { TarefaService } from "../../../services/tarefa-service";
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { of } from 'rxjs';

describe('FilterTarefaComponent', () => {
  let component: FilterTarefaComponent;
  let fixture: ComponentFixture<FilterTarefaComponent>;
  let tarefaService: TarefaService;
  let location: SpyLocation;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterTarefaComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        TarefaService,
        { provide: Location, useClass: SpyLocation as any },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterTarefaComponent);
    component = fixture.componentInstance;
    tarefaService = TestBed.inject(TarefaService);
    location = TestBed.inject(Location) as SpyLocation;
    fixture.detectChanges();
  });

  // Teste Unitário: Verifica se a instância do componente é criada com sucesso.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Teste Unitário: Verifica se o método getTarefas é chamado corretamente.
  it('should get tarefas', () => {
    spyOn(tarefaService, 'getTarefas').and.callThrough();
    component.getTarefas();
    expect(tarefaService.getTarefas).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método parsePisos funciona corretamente.
  it('should parse pisos', () => {
    const pisoString = '1, 2, 3';
    const parsedPisos = component.parsePisos([{ piso: '1' }, { piso: '2' }, { piso: '3' }]);
    expect(parsedPisos).toEqual(pisoString);
  });

  // Teste Unitário: Verifica se o método applyFilters funciona corretamente.
  it('should apply filters', () => {
    spyOn(component, 'getPaginatedTarefas').and.callThrough();
    component.applyFilters();
    expect(component.getPaginatedTarefas).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método clearFilters funciona corretamente.
  it('should clear filters', () => {
    spyOn(component, 'applyFilters').and.callThrough();
    component.clearFilters();
    expect(component.applyFilters).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método nextPage funciona corretamente.
  it('should navigate to the next page', () => {
    spyOn(component, 'getPaginatedTarefas').and.callThrough();
    component.nextPage();
    expect(component.currentPage).toBe(2); // Assuming you have set up the test data accordingly
    expect(component.getPaginatedTarefas).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método prevPage funciona corretamente.
  it('should navigate to the previous page', () => {
    spyOn(component, 'getPaginatedTarefas').and.callThrough();
    component.prevPage();
    expect(component.currentPage).toBe(1); // Assuming you have set up the test data accordingly
    expect(component.getPaginatedTarefas).toHaveBeenCalled();
  });

  // Teste Unitário: Verifica se o método goBack funciona corretamente.
  it('should go back', () => {
    spyOn(location, 'back').and.callThrough();
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
