import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ListElevadorComponent } from './list-elevador.component';
import { HttpRequestsService } from '../../../services/http-requests-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('ListElevadorComponent', () => {
  let component: ListElevadorComponent;
  let fixture: ComponentFixture<ListElevadorComponent>;
  let location: Location;
  let httpRequestsService: HttpRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListElevadorComponent],
      imports: [ReactiveFormsModule, BrowserModule,HttpClientTestingModule,FormsModule],
      providers: [
        Location,
        HttpRequestsService,
        MessageService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListElevadorComponent);
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

  it('should getElevadors successfully', fakeAsync(() => {
    const mockElevadorList:any = [];

    spyOn(httpRequestsService, 'getRequest').and.returnValue(of(mockElevadorList));

    const edificio = "1";
    component.getElevadores(edificio);

    tick();

    expect(httpRequestsService.getRequest).toHaveBeenCalledWith('elevador/' + edificio);
    expect(component.elevadores).toEqual(mockElevadorList);
  }));

  it('should handle error while getting elevadors', fakeAsync(() => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
    spyOn(httpRequestsService, 'getRequest').and.returnValue(of({ error: mockError }));

    const edificio = "1";
    component.getElevadores(edificio);

    tick();

    expect(httpRequestsService.getRequest).toHaveBeenCalledWith('elevador/' + edificio);
  }));
});
