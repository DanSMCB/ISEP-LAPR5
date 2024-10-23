import { Component,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RobotService } from "../../../services/robot-service";
import { Robot } from "../../../models/robot";
import { RobotMap } from '../../../mappers/robot-map';

@Component({
  selector: 'app-list-robot',
  templateUrl: './list-robot.component.html',
  styleUrl: './list-robot.component.css'
})
export class ListRobotComponent implements OnInit {

  robots: Robot[] = [];
  paginatedRobots: Robot[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  formResetToggle: boolean = false;

  constructor(private robotService: RobotService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getRobots();
  }

  getRobots(): void {
    this.robotService.getRobots()
      .subscribe(robots => {
        this.robots = RobotMap.toViewModelList(robots)
        this.getPaginatedRobots();
      });
  }

  getPaginatedRobots(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRobots = this.robots.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.endIndex < this.robots.length) {
      this.currentPage++;
      this.getPaginatedRobots();
    }
  }

  prevPage(): void {
    if (this.startIndex > 0) {
      this.currentPage--;
      this.getPaginatedRobots();
    }
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  get endIndex(): number {
    return this.startIndex + this.itemsPerPage;
  }

  goBack(): void {
    this.location.back();
  }
}
