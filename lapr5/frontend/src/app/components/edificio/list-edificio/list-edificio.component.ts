import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { EdificioService } from "../../../services/edificio-service";
import { Edificio } from "../../../models/edificio";
import { EdificioMap } from '../../../mappers/edificio-map';

@Component({
  selector: 'app-list-edificio',
  templateUrl: './list-edificio.component.html',
  styleUrls: ['./list-edificio.component.css']
})
export class ListEdificioComponent implements OnInit {
  edificios: Edificio[] = [];
  paginatedEdificios: Edificio[] = [];
  itemsPerPage: number = 10;
  currentPage: number = 1;
  
  constructor(private edificioService: EdificioService, private location: Location) {}

  ngOnInit(): void {
    this.getEdificios();
  }

  getEdificios(): void {
    this.edificioService.getEdificios().subscribe(edificios => {
      this.edificios = EdificioMap.toViewModelList(edificios);
      this.getPaginatedEdificios();
    });
  }

  getPaginatedEdificios(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEdificios = this.edificios.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.endIndex < this.edificios.length) {
      this.currentPage++;
      this.getPaginatedEdificios();
    }
  }

  prevPage(): void {
    if (this.startIndex > 0) {
      this.currentPage--;
      this.getPaginatedEdificios();
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
