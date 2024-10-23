import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ListPisoConnectionComponent } from './list-piso-connection.component';
import { HttpRequestsService } from '../../../services/http-requests-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('ListPisoComponent', () => {
  let component: ListPisoConnectionComponent;
  let fixture: ComponentFixture<ListPisoConnectionComponent>;
  let location: Location;
  let httpRequestsService: HttpRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPisoConnectionComponent],
      imports: [ReactiveFormsModule, BrowserModule,HttpClientTestingModule,FormsModule],
      providers: [
        Location,
        HttpRequestsService,
        MessageService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPisoConnectionComponent);
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

  it('should getPisos successfully', fakeAsync(() => {
    const mockPisoList:any = [];

    spyOn(httpRequestsService, 'getRequest').and.returnValue(of(mockPisoList));

    component.getPisosWithConnection();

    tick();

    expect(httpRequestsService.getRequest).toHaveBeenCalledWith('piso/listwithconnection');
    expect(component.pisos).toEqual(mockPisoList);
  }));

  it('should handle error while getting pisos', fakeAsync(() => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
    spyOn(httpRequestsService, 'getRequest').and.returnValue(of({ error: mockError }));

    component.getPisosWithConnection();

    tick();

    expect(httpRequestsService.getRequest).toHaveBeenCalledWith('piso/listwithconnection');
  }));
});
