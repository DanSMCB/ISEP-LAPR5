import { Component, OnInit } from '@angular/core';
import { Robot } from "../../../models/robot";
import { RobotService } from "../../../services/robot-service";
import { Location } from "@angular/common";
import { RobotMap } from '../../../mappers/robot-map';

@Component({
  selector: 'app-inibir-robot',
  templateUrl: './inibir-robot.component.html',
  styleUrl: './inibir-robot.component.css'
})
export class InibirRobotComponent implements OnInit {

  robots: Robot[] = [];
  paginatedRobots: Robot[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;

  formResetToggle: boolean = false;

  constructor(private robotService: RobotService,
    private location: Location
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

  inhibitRobot(numeroSerie: string) {
    this.robotService.inhibitRobot(numeroSerie).subscribe(robot => {
      this.robots.push(robot);
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
