import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { CreateRobotComponent } from './create-robot.component';
import { HttpRequestsService } from '../../../services/http-requests-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('CreateRobotComponent', () => {
  let component: CreateRobotComponent;
  let fixture: ComponentFixture<CreateRobotComponent>;
  let location: Location;
  let httpRequestsService: HttpRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRobotComponent],
      imports: [ReactiveFormsModule, BrowserModule,HttpClientTestingModule,FormsModule],
      providers: [
        Location,
        HttpRequestsService,
        MessageService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRobotComponent);
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

  it('should create robot', fakeAsync(() => {
  
    spyOn(httpRequestsService, 'postRequest').and.returnValue(of({
      numeroSerie: '123456',
      codigo: 'asd324',
      nickname: "robot",
      marca: "robot corp",
      estado: "inibido",
      tipoDeRobot: "robisep"
    }));
  
    component.createRobot("123456","asd324","robot","robot corp","inibido","robisep");
   
    tick();

    expect(httpRequestsService.postRequest).toHaveBeenCalled();
  }));
});
