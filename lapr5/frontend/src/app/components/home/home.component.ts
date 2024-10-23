import { Component, OnInit } from '@angular/core';
import { UtilizadorService } from "../../services/utilizador-service";
import { UtilizadorDTO } from '../../DTO/utilizador-dto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  userData: UtilizadorDTO | null = null;

  constructor(private utilizadorService: UtilizadorService) {}

  ngOnInit() {
    this.userData = this.utilizadorService.getUserData();
  }
}
