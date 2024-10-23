import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { CreateTipoDeRobotComponent } from './create-tipo-de-robot.component';
import { HttpRequestsService } from '../../../services/http-requests-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('CreateTipoDeRobotComponent', () => {
  let component: CreateTipoDeRobotComponent;
  let fixture: ComponentFixture<CreateTipoDeRobotComponent>;
  let location: Location;
  let httpRequestsService: HttpRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTipoDeRobotComponent],
      imports: [ReactiveFormsModule, BrowserModule,HttpClientTestingModule,FormsModule],
      providers: [
        Location,
        HttpRequestsService,
        MessageService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTipoDeRobotComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    httpRequestsService = TestBed.inject(HttpRequestsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back', () => {
    spyOn(location, 'replaceState');
    spyOn(httpRequestsService, 'reload');
  
    try {
      component.goBack();
  
      expect(location.replaceState).toHaveBeenCalled();
      expect(httpRequestsService.reload).toHaveBeenCalled();
    } catch (error) {
      console.error('Error in goBack test:', error);
      fail(error);
    }
  });

  it('should create tipoDeRobot', fakeAsync(() => {
  
    spyOn(httpRequestsService, 'postRequest').and.returnValue(of({
      descricao: 'robisep',
      tarefas: [{ tarefa: "vigilancia"}]
    }));
  
    const tarefas: { tarefa: string}[] = [
      { tarefa: "vigilancia" }
    ];
    component.createTipoDeRobot("robisep",tarefas);
   
    tick();

    expect(httpRequestsService.postRequest).toHaveBeenCalled();
  }));
});
