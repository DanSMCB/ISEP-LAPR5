import { Component } from '@angular/core';
import { TipoDeRobot } from "../../../models/tipo-de-robot";
import { TipoDeRobotService } from "../../../services/tipo-de-robot-service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-create-tipo-de-robot',
  templateUrl: './create-tipo-de-robot.component.html',
  styleUrls: ['./create-tipo-de-robot.component.css']
})
export class CreateTipoDeRobotComponent {
  
  tipoDeRobots: TipoDeRobot[] = [];

  formResetToggle: boolean = false;

  constructor(private tipoDeRobotService: TipoDeRobotService,
    private location: Location
  ) { }

  createTipoDeRobot(descricao: string, tarefas: Array<{ tarefa: string }>) {
    this.tipoDeRobotService.createTipoDeRobot(descricao, tarefas).subscribe(tipoDeRobot => {
      this.tipoDeRobots.push(tipoDeRobot);
    });
  }

  parseTarefas(value: string): Array<{ tarefa: string }> {
    const tarefassArray = value.split(',').map(tarefa => ({ tarefa: tarefa.trim() }));
    return tarefassArray;
  }  

  goBack(): void {
    this.location.back();
  }
}