import { Component, OnInit , AfterViewInit, ElementRef, ViewChild, HostListener} from '@angular/core';
import { Data } from './data';
import {FarsiType } from './farsi-type';
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
  selector: 'app-tstdrop',
  templateUrl: './tstdrop.component.html',
  styleUrls: ['./tstdrop.component.css']
})
export class TstdropComponent implements OnInit, AfterViewInit  {

  public lastName:any; 
  public firstName:any =" Ahmad bilal";
  email:any;
  details:any;
  detailsdetails:any;
  public items = Data;
  numberOfClicks =0;

  farsiTypeObj = new FarsiType();

  constructor(private elementRef:ElementRef) {}

  ngOnInit(){
  }

  sayHi(){
    alert('wow, I clicked');
  }

  selectCountry(data:any){
    console.log(data.target.value);
  }

  ngAfterViewInit() {
    var FarsiType:any = {
      // Farsi keyboard map based on Iran Popular Keyboard Layout
      farsiKey: [
        32,	33,	34,	35,	36,	37,	1548,	1711,
        41,	40,	215,	43,	1608,	45,	46,	47,
        48,	49,	50,	51,	52,	53,	54,	55,
        56,	57,	58,	1705,	44,	61,	46,	1567,
        64,	1616,	1584,	125,	1609,	1615,	1609,	1604,
        1570,	247,	1600,	1548,	47,	8217,	1583,	215,
        1563,	1614,	1569,	1613,	1601,	8216,	123,	1611,
        1618,	1573,	126,	1580,	1688,	1670,	94,	95,
        1662,	1588,	1584,	1586,	1740,	1579,	1576,	1604,
        1575,	1607,	1578,	1606,	1605,	1574,	1583,	1582,
        1581,	1590,	1602,	1587,	1601,	1593,	1585,	1589,
        1591,	1594,	1592,	60,	124,	62,	1617
      ],
      Type: true,
      counter: 0,
      ShowChangeLangButton: 1,	// 0: Hidden / 1: Visible
      KeyBoardError: 0,			// 0: Disable FarsiType / 1: Show Error
      ChangeDir: 2,			// 0: No Action / 1: Do Rtl-Ltr / 2: Rtl-Ltr button
      UnSupportedAction: 0		//0: Disable FarsiType / 1: Low Support
    }
    
    FarsiType.enable_disable = function(Dis:any) {
      var invis, obj:any;
      
      if (!Dis.checked)  {
        FarsiType.Type = true;
        var disable = false;
        var color = 'darkblue';
      } else {
        FarsiType.Type = false;
        var disable = true;
        var color = '#ECE9D8';
      }
    
      if (FarsiType.ShowChangeLangButton == 1) { 
        for (var i=1; i<= FarsiType.counter; i++) {
          obj = document.getElementById('FarsiType_button_' + i);
          obj.disabled = disable;
          obj.style.backgroundColor = color;
        }
      }
    }
    
    FarsiType.Disable = function() {
      FarsiType.Type = false;
      var Dis:any = document.getElementById('disableFarsiType')
      if (Dis != null) {
        Dis.checked = true;
      }
    
      if (FarsiType.ShowChangeLangButton == 1) { 
        for (var i=1; i<= FarsiType.counter; i++) {
          var obj:any = document.getElementById('FarsiType_button_' + i);
          obj.disabled = true;
          obj.style.backgroundColor = '#ECE9D8';
        }
      }
    }
    
    FarsiType.init = function() {
    
      var Inputs:any = document.getElementsByTagName('INPUT');
      console.log("inputs lenght is: ", Inputs.length);

      for (var i=0; i<Inputs.length; i++) {
        if (Inputs[i].type.toLowerCase() == 'text' && (Inputs[i].lang.toLowerCase() == 'fa' || Inputs[i].lang.toLowerCase() == 'fa-ir')) {
          FarsiType.counter++;
          new FarsiType.KeyObject(Inputs[i], FarsiType.counter);
        }
      }
    
      var Areas:any = document.getElementsByTagName('TEXTAREA');
      for (var i=0; i<Areas.length; i++) {
        if (Areas[i].lang.toLowerCase() == 'fa' || Areas[i].lang.toLowerCase() == 'fa-ir') {
          FarsiType.counter++;
          new FarsiType.KeyObject(Areas[i], FarsiType.counter);
        }
      }
      
      var Dis:any = document.getElementById('disableFarsiType')
      if (Dis != null) {
        FarsiType.enable_disable (Dis);
        Dis.onclick = new Function( "FarsiType.enable_disable (this);" )
      }
    }
    
    FarsiType.KeyObject = function(z:any,x:any) {
        while (z && z.nextSibling) {
            z.parentNode.removeChild(z.nextSibling);  
        }
    
      var GenerateStr:any = "";
        if (FarsiType.ShowChangeLangButton == 1) {
          // console.log("GenerateStr length is:", GenerateStr.length);
          GenerateStr = GenerateStr + "<input type='button' class='farsi-class' id=FarsiType_button_"+x+" style='border: none; background-color:darkblue; font-size:11; color:white; font-family:tahoma; padding: 1px; margin: 1px; width: auto; height: auto;' value='FA' />";
        }
        if (FarsiType.ChangeDir == 2) {
          GenerateStr = GenerateStr  + "<input type='button'  class='farsi-class' id=FarsiType_ChangeDir_"+x+" style='border: none; background-color:darkblue; font-size:11; color:white; font-family:tahoma; padding: 1px; margin: 1px; width: auto; height: auto;' value='RTL' />"
        }

        z.insertAdjacentHTML("afterend", GenerateStr);
          if (FarsiType.ShowChangeLangButton == 1) { 
            z.bottelm = document.getElementById ('FarsiType_button_' + x);
            z.bottelm.title = 'Change lang to english';
          }
          if (FarsiType.ChangeDir == 2) {
            z.Direlm = document.getElementById ('FarsiType_ChangeDir_' + x); 
          }
        
          z.farsi = true;
          z.dir = "rtl";
          z.align = "right";
    
          z.style.textAlign = z.align;
          z.style.direction = z.dir;
      
    
          var setSelectionRange = function(input:any , selectionStart:any, selectionEnd:any) {
            input.focus()
            input.setSelectionRange(selectionStart, selectionEnd)
          }
        
          var ChangeDirection = function() {
            if (z.dir == "rtl") {
              z.dir = "ltr";
              z.align = "left";
              z.Direlm.value = "LTR";
              z.Direlm.title = "Change direction: Right to Left"
            } else {
              z.dir = "rtl";
              z.align = "right";
              z.Direlm.value = "RTL";
              z.Direlm.title = "Change direction: Left to Right"
            }
            z.style.textAlign = z.align;
            z.style.direction = z.dir;
            z.focus();
          }
        
          var ChangeLang = function(e:any, ze:any) {
            if(ze)
              z = ze;
        
            if (FarsiType.Type) {
              if (z.farsi) {
                z.farsi = false;
                if (FarsiType.ShowChangeLangButton == 1) { 
                  z.bottelm.value = "EN";
                  z.bottelm.title = 'Change lang to persian';
                }
                if (FarsiType.ChangeDir == 1) {
                  z.style.textAlign = "left";
                  z.style.direction = "ltr";
                }
              } else {
                z.farsi = true;
                if (FarsiType.ShowChangeLangButton == 1) { 
                  z.bottelm.value = "FA";
                  z.bottelm.title = 'Change lang to english';
                }
                if (FarsiType.ChangeDir == 1) {
                  z.style.textAlign = "right";
                  z.style.direction = "rtl";
                }
              }
              z.focus();
            }
            
            if (e.preventDefault) e.preventDefault();
            e.returnValue = false;
            return false;
          }
        
          var Convert = function(e:any) {
        
            if (e == null)
              e = window.event;
        
            var key = e.which || e.charCode || e.keyCode;
            var eElement = e.target || e.originalTarget || e.srcElement;
        
            if (e.ctrlKey && key == 32) {
              ChangeLang(e, z);
            }
        
            if (FarsiType.Type) {
              if (
                (e.charCode != null && e.charCode != key) ||
                (e.which != null && e.which != key) ||
                (e.ctrlKey || e.altKey || e.metaKey) ||
                (key == 13 || key == 27 || key == 8)
              ) return true;
        
              //check windows lang
              if (key > 128) {
                if (FarsiType.KeyBoardError == 0) {
                  FarsiType.Disable();
                } else {
                  alert("Please change your windows language to English");
                  return false;
                }
              }
        
              // If Farsi
              if (FarsiType.Type && z.farsi) {
        
                //check CpasLock
                if ((key >= 65 && key <= 90&& !e.shiftKey) || (key >= 97 && key <= 122 ) && e.shiftKey) {
                  alert("Caps Lock is On. To prevent entering farsi incorrectly, you should press Caps Lock to turn it off.");
                  return false;
                }
        
                // Shift-space -> ZWNJ
                if (key == 32 && e.shiftKey)
                  key = 8204;
                else
                  key = FarsiType.farsiKey[key-32];
        
                key = typeof key == 'string' ? key : String.fromCharCode(key);
        
                // to farsi
                try {
                
                  var docSelection:any = document.getSelection;
                  var selectionStart = eElement.selectionStart;
                  var selectionEnd = eElement.selectionEnd;
        
                  if (typeof selectionStart == 'number') { 
                    //FOR W3C STANDARD BROWSERS
                    var nScrollTop = eElement.scrollTop;
                    var nScrollLeft = eElement.scrollLeft;
                    var nScrollWidth = eElement.scrollWidth;
          
                    eElement.value = eElement.value.substring(0, selectionStart) + key + eElement.value.substring(selectionEnd);
                    setSelectionRange(eElement, selectionStart + key.length, selectionStart + key.length);
            
                    var nW = eElement.scrollWidth - nScrollWidth;
                    if (eElement.scrollTop == 0) { eElement.scrollTop = nScrollTop }
                  } else if (docSelection) {
                    var nRange = docSelection.createRange();
                    nRange.text = key;
                    nRange.setEndPoint('StartToEnd', nRange);
                    nRange.select();
                  }
          
                } catch(error) {
                  try {
                    // IE
                    e.keyCode = key
                  } catch(error) {
                    try {
                      // OLD GECKO
                      e.initKeyEvent("keypress", true, true, document.defaultView, false, false, true, false, 0, key, eElement);
                    } catch(error) {
                      //OTHERWISE
                      if (FarsiType.UnSupportedAction == 0) {
                        alert('Sorry! no FarsiType support')
                        FarsiType.Disable();
                        var Dis:any = document.getElementById('disableFarsiType')
                        if (Dis != null) {
                          Dis.disabled = true;
                        }
                        return false;
                      } else {
                        eElement.value += key;					
                      }
                    }
                  }
                }
        
                if (e.preventDefault)
                  e.preventDefault();
                e.returnValue = false;
              }
            }
            return true;
          }
        
          if (FarsiType.ShowChangeLangButton == 1) { z.bottelm.onmouseup = ChangeLang; }
          if (FarsiType.ChangeDir == 2) { z.Direlm.onmouseup = ChangeDirection; }
          z.onkeypress = Convert;
          
    }
    let that = this;
    this.elementRef.nativeElement.querySelectorAll('.farsi-keyboard').forEach( function ( item:any ) {
      // item.addEventListener('click', FarsiType.init);
      item.addEventListener('click', that.farsiTypeObj.init);
    });
  }


  public AllowParentSelection = true;
  public RestructureWhenChildSameName = false;
  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Type here to filter elements...';
  public MaxDisplayed = 5;

  public simpleSelected = {
    id: 'LU',
    name: 'Luxembourg',
    capital: 'Luxembourg',
    phone: '352',
    currency: 'EUR'
  };

  public multipleSelected = [
    {
      id: 'LU',
      name: 'Luxembourg',
      capital: 'Luxembourg',
      phone: '352',
      currency: 'EUR'
    },
    {
      id: 'FR',
      name: 'France',
      capital: 'Paris',
      phone: '33',
      currency: 'EUR'
    }
  ];
}
