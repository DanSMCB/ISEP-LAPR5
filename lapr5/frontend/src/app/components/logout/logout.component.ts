import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilizadorService } from "../../services/utilizador-service";

@Component({
  selector: 'app-login',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit{

  constructor(private router: Router, private utilizadorService: UtilizadorService) {}

  ngOnInit(){
    this.utilizadorService.clearUserData();
    this.router.navigate(['/Login']);
  }
}