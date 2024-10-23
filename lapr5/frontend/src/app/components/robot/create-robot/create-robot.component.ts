import { Component } from '@angular/core';
import { Robot } from "../../../models/robot";
import { RobotService } from "../../../services/robot-service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-create-robot',
  templateUrl: './create-robot.component.html',
  styleUrl: './create-robot.component.css'
})
export class CreateRobotComponent {

  robots: Robot[] = [];

  formResetToggle: boolean = false;

  constructor(private robotService: RobotService,
    private location: Location
  ) { }

  createRobot(numeroSerie: string, codigo: string, nickname: string, marca: string, estado: string, tipoDeRobot: string) {
    this.robotService.createRobot(numeroSerie, codigo, nickname, marca, estado, tipoDeRobot).subscribe(robot => {
      this.robots.push(robot);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
