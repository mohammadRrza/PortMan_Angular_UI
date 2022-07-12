import { Component, OnInit } from '@angular/core';
import {CarService} from './car.serveis';
import {ICar} from './interface/car';

@Component({
  selector: 'car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  constructor(private _carSrv: CarService) { 

  }
  cars: ICar[];
  ngOnInit(): void {
    this._carSrv.getCars().then(res=>{
        this.cars = res;
    });
  }
}