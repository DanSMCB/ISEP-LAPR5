import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { UpdateEdificioComponent } from './update-edificio.component';
import { HttpRequestsService } from '../../../services/http-requests-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('CreateEdificioComponent', () => {
  let component: UpdateEdificioComponent;
  let fixture: ComponentFixture<UpdateEdificioComponent>;
  let location: Location;
  let httpRequestsService: HttpRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateEdificioComponent],
      imports: [ReactiveFormsModule, BrowserModule,HttpClientTestingModule,FormsModule],
      providers: [
        Location,
        HttpRequestsService,
        MessageService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateEdificioComponent);
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

  it('should create edificio', fakeAsync(() => {
  
    spyOn(httpRequestsService, 'postRequest').and.returnValue(of({
      codigo: 'asd123',
      nome: 'Edificio 1',
      descricao: "descricao do edificio 1",
      pisoMaxSize: "10x10",
    }));
  
    component.updateEdificio("asd123","Edificio 1","descricao do edificio 1","10x10");
   
    tick();

    expect(httpRequestsService.postRequest).toHaveBeenCalled();
  }));
});
