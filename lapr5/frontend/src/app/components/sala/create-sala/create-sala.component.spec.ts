import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { CreateSalaComponent } from './create-sala.component';
import { HttpRequestsService } from '../../../services/http-requests-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('CreateSalaComponent', () => {
  let component: CreateSalaComponent;
  let fixture: ComponentFixture<CreateSalaComponent>;
  let location: Location;
  let httpRequestsService: HttpRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateSalaComponent],
      imports: [ReactiveFormsModule, BrowserModule,HttpClientTestingModule,FormsModule],
      providers: [
        Location,
        HttpRequestsService,
        MessageService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSalaComponent);
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

  it('should create sala', fakeAsync(() => {
  
    spyOn(httpRequestsService, 'postRequest').and.returnValue(of({
      nome: 'sala',
      descricao: 'Sala 1',
      categoria: "gabinete",
      tamanho: "10",
      edificio: "1",
      piso: "1"
    }));
  
    component.createSala("sala","Sala 1","gabinete","10","1","1");
   
    tick();

    expect(httpRequestsService.postRequest).toHaveBeenCalled();
  }));
});
