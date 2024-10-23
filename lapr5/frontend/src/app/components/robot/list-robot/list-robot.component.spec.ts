import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { ListRobotComponent } from './list-robot.component';
import { HttpRequestsService } from '../../../services/http-requests-service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('ListRobotComponent', () => {
  let component: ListRobotComponent;
  let fixture: ComponentFixture<ListRobotComponent>;
  let location: Location;
  let httpRequestsService: HttpRequestsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListRobotComponent],
      imports: [ReactiveFormsModule, BrowserModule,HttpClientTestingModule,FormsModule],
      providers: [
        Location,
        HttpRequestsService,
        MessageService,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListRobotComponent);
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

  it('should getRobots successfully', fakeAsync(() => {
    const mockRobotList:any = [];

    spyOn(httpRequestsService, 'getRequest').and.returnValue(of(mockRobotList));

    component.getRobots();

    tick();

    expect(httpRequestsService.getRequest).toHaveBeenCalledWith('robot/listall');
    expect(component.robots).toEqual(mockRobotList);
  }));

  it('should handle error while getting robots', fakeAsync(() => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };
    spyOn(httpRequestsService, 'getRequest').and.returnValue(of({ error: mockError }));

    component.getRobots();

    tick();

    expect(httpRequestsService.getRequest).toHaveBeenCalledWith('robot/listall');
  }));
});
