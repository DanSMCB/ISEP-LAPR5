import { Component } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-politica-privacidade-home',
  templateUrl: './politica-privacidade-home.component.html',
  styleUrls: ['./politica-privacidade-home.component.css'],
})
export class PoliticaPrivacidadeHomeComponent {
  constructor(private location: Location) {
   }

  goBack(): void {
    this.location.back();
  }
}