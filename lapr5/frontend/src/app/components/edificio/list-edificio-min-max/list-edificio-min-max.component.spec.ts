import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ListEdificioMinMaxComponent } from './list-edificio-min-max.component';
import { HttpRequestsService } from '../../../services/http-requests-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('ListEdificioComponent', () => {
  let component: ListEdificioMinMaxComponent;
  let fixture: ComponentFixture<ListEdificioMinMaxComponent>;
  let location: Location;
  let httpRequestsService: HttpRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEdificioMinMaxComponent],
      imports: [ReactiveFormsModule, BrowserModule,HttpClientTestingModule,FormsModule],
      providers: [
        Location,
        HttpRequestsService,
        MessageService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEdificioMinMaxComponent);
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

  it('should getEdificiosMinMax successfully', fakeAsync(() => {
    const mockEdificioMinMaxList:any = [];
    const min = 1;
    const max = 2;
    spyOn(httpRequestsService, 'getRequest').and.returnValue(of(mockEdificioMinMaxList));

    component.getEdificiosMinMax(min,max);

    tick();

    expect(httpRequestsService.getRequest).toHaveBeenCalledWith('edificio/' + min + "/" + max);
    expect(component.edificios).toEqual(mockEdificioMinMaxList);
  }));

  it('should handle error while getting edificios min max', fakeAsync(() => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
    spyOn(httpRequestsService, 'getRequest').and.returnValue(of({ error: mockError }));

    const min = 1;
    const max = 2;
    component.getEdificiosMinMax(min,max);

    tick();

    expect(httpRequestsService.getRequest).toHaveBeenCalledWith('edificio/' + min + "/" + max);
  }));
});
