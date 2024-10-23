import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ListPassagemComponent } from './list-passagem.component';
import { HttpRequestsService } from '../../../services/http-requests-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('ListPassagemComponent', () => {
  let component: ListPassagemComponent;
  let fixture: ComponentFixture<ListPassagemComponent>;
  let location: Location;
  let httpRequestsService: HttpRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPassagemComponent],
      imports: [ReactiveFormsModule, BrowserModule,HttpClientTestingModule,FormsModule],
      providers: [
        Location,
        HttpRequestsService,
        MessageService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPassagemComponent);
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

  it('should getPassagens successfully', fakeAsync(() => {
    const mockPassagemList:any = [];

    spyOn(httpRequestsService, 'getRequest').and.returnValue(of(mockPassagemList));

    const edificio1 = "1";
    const edificio2 = "2";
    component.listPassagemBetweenEdificios(edificio1,edificio2);

    tick();

    expect(httpRequestsService.getRequest).toHaveBeenCalledWith("passagem/listbetweenEdificio" + "/" + edificio1 + "/" + edificio2);
    expect(component.passagens).toEqual(mockPassagemList);
  }));

  it('should handle error while getting passagems', fakeAsync(() => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
    spyOn(httpRequestsService, 'getRequest').and.returnValue(of({ error: mockError }));

    const edificio1 = "1";
    const edificio2 = "2";
    component.listPassagemBetweenEdificios(edificio1,edificio2);

    tick();

    expect(httpRequestsService.getRequest).toHaveBeenCalledWith("passagem/listbetweenEdificio" + "/" + edificio1 + "/" + edificio2);
  }));
});
