import { Component } from '@angular/core';
import { Piso } from "../../../models/piso";
import { PisoService } from "../../../services/piso-service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-upload-piso-map',
  templateUrl: './upload-piso-map.component.html',
  styleUrls: ['./upload-piso-map.component.css']
})
export class UploadPisoMapComponent {

  pisos: Piso[] = [];
  pisoData: any = {};

  constructor(private pisoService: PisoService,
    private location: Location) { }

  loadValidateFloor(data: any) {
    data.passagens = this.parsePassagens(data.passagens) || [];
    data.salas = this.parseSalas(data.salas) || [];
    
    this.pisoService.loadValidateFloor(data).subscribe(result => {
      console.log(result);
    });
  }

  parsePassagens(value: string): Array<{ passagem: string }> {
    const passagensArray = value.split(',').map(passagem => ({ passagem: passagem.trim() }));
    return passagensArray;
  }

  parseSalas(value: string): Array<{ sala: string }> {
    const salasArray = value.split(',').map(sala => ({ sala: sala.trim() }));
    return salasArray;
  }

  goBack(): void {
    this.location.back();
  }
}
