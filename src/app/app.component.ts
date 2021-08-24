import { Component, OnInit } from '@angular/core';
import { Data } from './tstdrop/data';

export interface Item {
  id: string,
  name: string,
  capital: string,
  phone: string,
  currency: string
}

export interface DownLineItem {
  item: Item,
  parent: DownLineItem
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  public data = Data;
  items = [];
  public AllowParentSelection = true;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Type here to filter elements...';
  public MaxDisplayed = 5;

  public simpleSelected =  {
    id: 'CI',
    name: 'Ivory Coast',
    capital: 'Yamoussoukro',
    phone: '225',
    currency: 'XOF'
    }
  public multipleSelected = [
    {
      id: 'CI',
      name: 'Ivory Coast',
      capital: 'Yamoussoukro',
      phone: '225',
      currency: 'XOF'
    },
    {
      id: 'CM',
      name: 'Cameroon',
      capital: 'Yaoundé',
      phone: '237',
      currency: 'XAF'
    },
  ];

  ngOnInit() {
   
  }

  private process(data:any): any {
    let result = [];
    result = data.map((item:any) => {
      return this.toTreeNode(item);
    });
    return result;
  }

  private toTreeNode(node:any, parent = null) {
    console.log(node, parent);
    if (node && node.children) {
      node.children.map((item:any) => {
        return this.toTreeNode(item, node);
      });
    }
    return node;
  }
}
