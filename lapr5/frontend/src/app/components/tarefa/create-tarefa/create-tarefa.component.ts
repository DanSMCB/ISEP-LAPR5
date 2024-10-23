import { Component } from '@angular/core';
import { Tarefa } from "../../../models/tarefa";
import { TarefaService } from "../../../services/tarefa-service";
import { Location } from "@angular/common";
import { RobotService } from "../../../services/robot-service";
import { Robot } from "../../../models/robot";
import { RobotMap } from '../../../mappers/robot-map';
import { EdificioService } from "../../../services/edificio-service";
import { Edificio } from "../../../models/edificio";
import { EdificioMap } from '../../../mappers/edificio-map';
import { Piso } from "../../../models/piso";
import { PisoService } from "../../../services/piso-service";
import { PisoMap } from '../../../mappers/piso-map';
import { Sala } from "../../../models/sala";
import { SalaService } from "../../../services/sala-service";
import { SalaMap } from '../../../mappers/sala-map';

@Component({
  selector: 'app-create-tarefa',
  templateUrl: './create-tarefa.component.html',
  styleUrls: ['./create-tarefa.component.css']
})
export class CreateTarefaComponent {

  tarefas: Tarefa[] = [];
  robots: Robot[] = [];
  edificios: Edificio[] = [];
  pisos: Piso[] = [];
  salas: Sala[] = [];

  formResetToggle: boolean = false;

  tarefaCodigo: string = '';
  tarefaDescricao: string = '';
  tarefaRobot: string = '';
  tarefaContactoRequisitante: string = '';
  selectedTipoDeTarefa: string = '';

  tarefaContactoIncidente: string = '';
  tarefaEdificio: string = '';
  tarefaPisos: string = '';

  tarefaSalaRecolha: string = '';
  tarefaSalaEntrega: string = '';
  tarefaContactoRecolha: string = '';
  tarefaContactoEntrega: string = '';

  constructor(private tarefaService: TarefaService,
    private robotService: RobotService,
    private edificioService: EdificioService,
    private pisoService: PisoService,
    private salaService: SalaService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getRobots();
    this.getEdificios();
    this.getSalas();
  }

  getRobots(): void {
    this.robotService.getRobots()
      .subscribe(robots => 
        this.robots = RobotMap.toViewModelList(robots)
      );
  }

  getEdificios(): void {
    this.edificioService.getEdificios()
      .subscribe(edificios => 
        this.edificios = EdificioMap.toViewModelList(edificios)
      );
  }

  getSalas(): void {
    this.salaService.getSalas()
      .subscribe(salas => 
        this.salas = SalaMap.toViewModelList(salas)
      );
  }

  getAllPisosByEdificio(edificio: string): void {
    this.pisoService.getAllPisosByEdificio(edificio)
      .subscribe(pisos => this.pisos = PisoMap.toViewModelList(pisos));
  }

  onEdificioChange(): void {
    this.getAllPisosByEdificio(this.tarefaEdificio);
  }

  createTarefa(codigo: string, descricao: string, robot: string, contactoRequisitante: string, tipoDeTarefa: string,
    contactoIncidente: string, edificio: string, tarefaPisos: string,
    salaRecolha: string, salaEntrega: string, contactoRecolha: string, contactoEntrega: string) {
  
    let robotNovo: Robot;
    const pisos = this.parsePisos(tarefaPisos);
  
    this.robotService.getRobot(robot)
      .subscribe(robotData => {
        robotNovo = RobotMap.toViewModel(robotData);
  
        this.tarefaService.createTarefa(codigo, descricao, robot, robotNovo.tipoDeRobot, " ", contactoRequisitante, tipoDeTarefa,
          contactoIncidente, edificio, pisos,
          salaRecolha, salaEntrega, contactoRecolha, contactoEntrega).subscribe(tarefa => {
          this.tarefas.push(tarefa);
        });
      });
  }
  
  getPisosString(): string {
    return this.pisos.map(piso => piso.piso).join(',');
  }

  parsePisos(value: string): Array<{ piso: string }> {
    const pisosArray = value.split(',').map(piso => ({ piso: piso.trim() }));
    return pisosArray;
  }

  goBack(): void {
    this.location.back();
  }
}
