import { Component, OnInit , AfterViewInit, ElementRef, ViewChild, HostListener} from '@angular/core';

import {FarsiType } from '../FarsiType/farsi-type'
export interface Item {
  id: string,
  name: string,
  capital: string,
  phone: string,
  currency: string
}
import * as $ from 'jquery';
export interface DownLineItem {
  item: Item,
  parent: DownLineItem
}


@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
export class PracticeComponent implements OnInit, AfterViewInit  {

  public lastName:any; 
  public firstName:any =" Ahmad bilal";
  email:any;
  details:any;
  detailsdetails:any;

  numberOfClicks =0;

  farsiTypeObj = new FarsiType();

  constructor(private elementRef:ElementRef) {}

  ngOnInit(){
  }

  ngAfterViewInit() {
    let that = this;
    this.elementRef.nativeElement.querySelectorAll('.farsi-keyboard').forEach( function ( item:any ) {
      item.addEventListener('click', that.farsiTypeObj.init);
    });
  }


 
}
