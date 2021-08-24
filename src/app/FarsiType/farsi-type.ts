export class  FarsiType  {

      farsiKey:any= [
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
      ];
      Type:boolean = true;
      counter:number = 0;
      ShowChangeLangButton:number = 1;	// 0: Hidden / 1: Visible
      KeyBoardError:number =  0;			// 0: Disable FarsiType / 1: Show Error
      ChangeDir:number =  2;			// 0: No Action / 1: Do Rtl-Ltr / 2: Rtl-Ltr button
      UnSupportedAction:number =  0;	//0: Disable FarsiType / 1: Low Support, 

      enable_disable(Dis:any) {
          var invis, obj:any;
          
          if (!Dis.checked)  {
            this.Type = true;
            var disable = false;
            var color = 'darkblue';
          } else {
            this.Type = false;
            var disable = true;
            var color = '#ECE9D8';
          }
        
          if (this.ShowChangeLangButton == 1) { 
            for (var i=1; i<= this.counter; i++) {
              obj = document.getElementById('FarsiType_button_' + i);
              obj.disabled = disable;
              obj.style.backgroundColor = color;
            }
          }
      }

      Disable() {
        this.Type = false;
        var Dis:any = document.getElementById('disableFarsiType')
        if (Dis != null) {
          Dis.checked = true;
        }
    
        if (this.ShowChangeLangButton == 1) { 
          for (var i=1; i<= this.counter; i++) {
              var obj:any = document.getElementById('FarsiType_button_' + i);
              obj.disabled = true;
              obj.style.backgroundColor = '#ECE9D8';
          }
        }
      }

      init() {
        var newObj = new FarsiType();
        // var newObj = this;

        var that = newObj;
        var Inputs:any = document.getElementsByClassName('farsi-keyboard');

        for (var i=0; i<Inputs.length; i++) {
            if (Inputs[i].type.toLowerCase() == 'text' && (Inputs[i].lang.toLowerCase() == 'fa' || Inputs[i].lang.toLowerCase() == 'fa-ir')) {
              newObj.counter++;
              (new FarsiType).KeyObject(Inputs[i], newObj.counter);
            }
        }
    
        var Areas:any = document.getElementsByTagName('TEXTAREA');
        for (var i=0; i<Areas.length; i++) {
          if (Areas[i].lang.toLowerCase() == 'fa' || Areas[i].lang.toLowerCase() == 'fa-ir') {
              newObj.counter++;
              (new FarsiType).KeyObject(Areas[i], newObj.counter);
          }
        }
        
        var Dis:any = document.getElementById('disableFarsiType');
        if (Dis != null) {
            that.enable_disable (Dis);

            // Dis.onclick = new Function( "(new FarsiType).enable_disable(this);" );
            // Dis.onclick = eval( "(new FarsiType).enable_disable(newObj);");
            Dis.onclick =(new FarsiType()).enable_disable(this);

        }
      }

      KeyObject (z:any,x:any) {
        var that = this;
        var newObj = new FarsiType();
        while (z && z.nextSibling) {
            z.parentNode.removeChild(z.nextSibling);  
        }
    
        var GenerateStr:any = "";
        if (that.ShowChangeLangButton == 1) {
          GenerateStr = GenerateStr + "<input type='button' class='farsi-class' id=FarsiType_button_"+x+" style='border: none; background-color:darkblue; font-size:11; color:white; font-family:tahoma; padding: 1px; margin: 1px; width: auto; height: auto;' value='FA' />";
        }
        if (that.ChangeDir == 2) {
          GenerateStr = GenerateStr  + "<input type='button'  class='farsi-class' id=FarsiType_ChangeDir_"+x+" style='border: none; background-color:darkblue; font-size:11; color:white; font-family:tahoma; padding: 1px; margin: 1px; width: auto; height: auto;' value='RTL' />"
        }

        z.insertAdjacentHTML("afterend", GenerateStr);
          if (that.ShowChangeLangButton == 1) { 
            z.bottelm = document.getElementById ('FarsiType_button_' + x);
            z.bottelm.title = 'Change lang to english';
          }
          if (that.ChangeDir == 2) {
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
        
            if (that.Type) {
              if (z.farsi) {
                z.farsi = false;
                if (that.ShowChangeLangButton == 1) { 
                  z.bottelm.value = "EN";
                  z.bottelm.title = 'Change lang to persian';
                }
                if (that.ChangeDir == 1) {
                  z.style.textAlign = "left";
                  z.style.direction = "ltr";
                }
              } else {
                z.farsi = true;
                if (that.ShowChangeLangButton == 1) { 
                  z.bottelm.value = "FA";
                  z.bottelm.title = 'Change lang to english';
                }
                if (that.ChangeDir == 1) {
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
        
            if (that.Type) {
              if (
                (e.charCode != null && e.charCode != key) ||
                (e.which != null && e.which != key) ||
                (e.ctrlKey || e.altKey || e.metaKey) ||
                (key == 13 || key == 27 || key == 8)
              ) return true;
        
              //check windows lang
              if (key > 128) {
                if (that.KeyBoardError == 0) {
                    that.Disable();
                } else {
                  alert("Please change your windows language to English");
                  return false;
                }
              }
        
              // If Farsi
              var CheckFarsiDisable:any = document.getElementById('disableFarsiType');
              if (document.querySelector('#disableFarsiType:checked') !== null) {
                that.Type = false;
              }else{
                that.Type = true;
              }


              if (that.Type && z.farsi) {
                //check CpasLock
                if ((key >= 65 && key <= 90&& !e.shiftKey) || (key >= 97 && key <= 122 ) && e.shiftKey) {
                  alert("Caps Lock is On. To prevent entering farsi incorrectly, you should press Caps Lock to turn it off.");
                  return false;
                }
        
                // Shift-space -> ZWNJ
                if (key == 32 && e.shiftKey)
                  key = 8204;
                else
                  key = that.farsiKey[key-32];
        
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
                      if (that.UnSupportedAction == 0) {
                        alert('Sorry! no FarsiType support')
                        that.Disable();
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
        
          if (that.ShowChangeLangButton == 1) { z.bottelm.onmouseup = ChangeLang; }
          if (that.ChangeDir == 2) { z.Direlm.onmouseup = ChangeDirection; }
          z.onkeypress = Convert;
          
      }
             
}
