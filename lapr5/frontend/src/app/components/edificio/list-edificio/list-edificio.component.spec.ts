import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ListEdificioComponent } from './list-edificio.component';
import { HttpRequestsService } from '../../../services/http-requests-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('ListEdificioComponent', () => {
  let component: ListEdificioComponent;
  let fixture: ComponentFixture<ListEdificioComponent>;
  let location: Location;
  let httpRequestsService: HttpRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListEdificioComponent],
      imports: [ReactiveFormsModule, BrowserModule,HttpClientTestingModule,FormsModule],
      providers: [
        Location,
        HttpRequestsService,
        MessageService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEdificioComponent);
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

  it('should getEdificios successfully', fakeAsync(() => {
    const mockEdificioList:any = [];

    spyOn(httpRequestsService, 'getRequest').and.returnValue(of(mockEdificioList));

    component.getEdificios();

    tick();

    expect(httpRequestsService.getRequest).toHaveBeenCalledWith('edificio/listall');
    expect(component.edificios).toEqual(mockEdificioList);
  }));

  it('should handle error while getting edificios', fakeAsync(() => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
    spyOn(httpRequestsService, 'getRequest').and.returnValue(of({ error: mockError }));

    component.getEdificios();

    tick();

    expect(httpRequestsService.getRequest).toHaveBeenCalledWith('edificio/listall');
  }));
});
