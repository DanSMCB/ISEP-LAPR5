import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { UpdateElevadorComponent } from './update-elevador.component';
import { HttpRequestsService } from '../../../services/http-requests-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('UpdateElevadorComponent', () => {
  let component: UpdateElevadorComponent;
  let fixture: ComponentFixture<UpdateElevadorComponent>;
  let location: Location;
  let httpRequestsService: HttpRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateElevadorComponent],
      imports: [ReactiveFormsModule, BrowserModule,HttpClientTestingModule,FormsModule],
      providers: [
        Location,
        HttpRequestsService,
        MessageService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateElevadorComponent);
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

  it('should update elevador', fakeAsync(() => {

    spyOn(httpRequestsService, 'postRequest').and.returnValue(of({
      codigo: '123453',
      edificio: '1',
      pisos: [{piso: "1"}, {piso: "2"}],
    }));
  
    const pisos: { piso: string}[] = [
      { piso: "1" },
      { piso: "2" }
    ];
    component.updateElevador("123453","1",pisos);
   
    tick();

    expect(httpRequestsService.postRequest).toHaveBeenCalled();
  }));
});
