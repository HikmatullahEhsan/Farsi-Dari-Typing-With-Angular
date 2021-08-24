import { Component, OnInit , OnChanges, Input , SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-testlast',
  templateUrl: './testlast.component.html',
  styleUrls: ['./testlast.component.css']
})
export class TestlastComponent implements OnInit {
  success: boolean = false;
  firstName:any;
  @Input() parentData: any= 10;
  foods:any =[
    {
      id:1,
      name: "apple"
    }, 
    {
      id:2,
      name: "orange"
    },
    {
      id:3,
      name: "banana"
    },
    {
      id:4,
      name: "Mango"
    }
  ];



  constructor() {
    console.log('constructor is loaded');
   } // first execution 

  ngOnInit(): void { // second execution 
    setTimeout(()=>{
      // this.firstName = "safdasfdasdfsadf";
      this.success = true;
    }, 4000);
    console.log('ngOnInit is loaded');

  }

  ngOnChanges(changes: SimpleChanges):void{
    console.log('ngOnChanges is loaded', changes);
  }

  changeFromChild(){
    this.parentData -= 1;
  }

 

}
