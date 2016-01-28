var droplets = [null, null, null, null, null];

var Droplet = function (height, tessalation, concentration, volume, startX, startY) { // make volume a desired parameter
    var diameter = Math.sqrt((4 * volume) / (Math.PI * height));
    this.form = new BABYLON.Mesh.CreateCylinder("cylinder", height, diameter, diameter, tessalation, 1, scene, false);
    this.volume = (Math.PI * (diameter / 2) * (diameter / 2) * height) / 2;
    this.concentration = Number(concentration);
    this.moles = this.concentration * this.volume;
    this.d = diameter;
    this.form.position.x = startX;
    this.form.position.y = startY;
   
    var material3 = new BABYLON.StandardMaterial("mat", scene);
    material3.diffuseColor = new BABYLON.Color3(1, 0.3, 2);
    material3.alpha = concentration / 50;
    this.material = material3;
    this.form.rotation.x = Math.PI / 2;
}

function generate() {
    if (myField11.getValue() == 1) {
        var d1 = new Droplet(2, 100, myField1.getValue(), myField2.getValue(), 5, 15);
        droplets[0] = d1;
         
    }
    else if (myField11.getValue() == 2) {
        var d1 = new Droplet(2, 100, myField1.getValue(), myField2.getValue(), 5, 15);
        var d2 = new Droplet(2, 100, myField3.getValue(), myField4.getValue(), 20, 15);
        droplets[0] = d1;
        droplets[1] = d2;
    }
    else if (myField11.getValue() == 3) {
       var d1 = new Droplet(2, 100, myField1.getValue(), myField2.getValue(), 5, 15);
       var d2 = new Droplet(2, 100, myField3.getValue(), myField4.getValue(), 20, 15);
       var d3 = new Droplet(2, 100, myField5.getValue(), myField6.getValue(), 35, 15);

       droplets[0] = d1;
       droplets[1] = d2;
       droplets[2] = d3;
    }
    else if (myField11.getValue() == 4 ) {
       var d1 = new Droplet(2, 100, myField1.getValue(), myField2.getValue(), 5, 15);
       var d2 = new Droplet(2, 100, myField3.getValue(), myField4.getValue(), 20, 15);
       var d3 = new Droplet(2, 100, myField5.getValue(), myField6.getValue(), 35, 15);
       var d4 = new Droplet(2, 100, myField7.getValue(), myField8.getValue(), 50, 15);

       droplets[0] = d1;
       droplets[1] = d2;
       droplets[2] = d3;
       droplets[3] = d4;
    }
    else if (myField11.getValue() == 5) {
        var d1 = new Droplet(2, 100, myField1.getValue(), myField2.getValue(), 5, 15);
        var d2 = new Droplet(2, 100, myField3.getValue(), myField4.getValue(), 20, 15);
        var d3 = new Droplet(2, 100, myField5.getValue(), myField6.getValue(), 35, 15);
        var d4 = new Droplet(2, 100, myField7.getValue(), myField8.getValue(), 50, 15);
        var d5 = new Droplet(2, 100, myField9.getValue(), myField10.getValue(), 65, 15);

        droplets[0] = d1;
        droplets[1] = d2;
        droplets[2] = d3;
        droplets[3] = d4;
        droplets[4] = d5;
    }
    else {}
}


function possibleToMake() {
    var desiredConcentration = myField12.getValue();
    var desiredVolume = myField13.getValue();

    var minVolume;
    var maxVolume;
    var minConcentration = 1000000;
    var maxConcentration = -1;
    
    for (i = 0; i < droplets.length; i++) {
        if (droplets[i] == null) {
            break;
        }
        else {
            if (minConcentration > droplets[i].concentration) {
                minConcentration = droplets[i].concentration;
            }
        }
    }

    for (i = 0; i < droplets.length; i++) {
        if (droplets[i] == null) {
            break;
        }
        else {
            if (maxConcentration < droplets[i].concentration) {
                maxConcentration = droplets[i].concentration;
            }
        }
    }
  
    console.log(minConcentration);
    console.log(maxConcentration);
    console.log(desiredConcentration);

    if(Number(desiredConcentration) > minConcentration && Number(desiredConcentration) < maxConcentration){
        console.log("possible");
    }
    else {
        console.log("not possible");
    }
}

function checkPair(desiredC, desiredV, droplet1, droplet2) {
    var lowerBound;
    var upperBound;
    var rangeC = Math.abs(droplet1.concentration - droplet2.concentration);
    if (droplet1.concentration > droplet2.concentration) {
        if (Number(desiredC) < droplet1.concentration && Number(desiredC) > droplet2.concentration) {
            var distance = desiredC - droplet2.concentration;
            var ratioDroplet1 = distance / rangeC;
            var ratioDroplet2 = 1 - ratioDroplet1;


            if (droplet1.volume * ratioDroplet2 < droplet2.volume * ratioDroplet1) {
                ///// droplet 1 runs out first

                console.log(maxVol);
                console.log(desiredV);


                var maxVol = (1 / ratioDroplet1) * droplet1.volume;
                
                if (maxVol > desiredV) { return true;}
                else { console.log("fail1");return false;}
            }
            else if (droplet2.volume * ratioDroplet1 < droplet1.volume * ratioDroplet2) {
                ///// droplet 2 runs out first



                



                var maxVol = (1 / ratioDroplet2) * droplet2.volume;
                console.log(maxVol);
                console.log(desiredV);
                if (maxVol > desiredV) { return true;}
                else { console.log("fail2"); return false; }
            }
            else {

                console.log(maxVol);
                console.log(desiredV);

                var maxVol = droplet1.volume + droplet2.volume;
                if (maxVol > desiredV) { return true;}
                else { console.log("fail3"); return false; }
            }



        }

        else {//dont work 
            console.log("fail4"); return false;
        }
    }
    else if (droplet2.concentration > droplet1.concentration) {
        if (desiredC < droplet2.concentration && desiredC > droplet1.concentration) {


           


            var distance = desiredC - droplet1.concentration;
            var ratioDroplet2 = distance / rangeC;
            var ratioDroplet1 = 1 - ratioDroplet2;


            if (droplet1.volume * ratioDroplet2 < droplet2.volume * ratioDroplet1) {
                ///// droplet 1 runs out first

                

                var maxVol = (1 / ratioDroplet1) * droplet1.volume;
                if (maxVol > desiredV) { return true;}
                else { console.log("fail5"); return false; }
            }
            else if (droplet2.volume * ratioDroplet1 < droplet1.volume * ratioDroplet2) {
                ///// droplet 2 runs out first


                var maxVol = (1 / ratioDroplet2) * droplet2.volume;
                if (maxVol > desiredV) { return true; }
                else { console.log("fail6"); return false; }
            }
            else {

              

                var maxVol = droplet1.volume + droplet2.volume;
                if (maxVol > desiredV) { return true; }
                else { console.log("fail7"); return false; }
            }





            
        }

        else {//dont work 
            console.log("fail8"); return false;
        }
    }


    else {
        var maxVol = droplet1.volume + droplet2.volume;
        if (maxVol > desiredV && desiredC == droplet1.concentration) { return true; }
        else { console.log("fail9"); return false; }
    }
}
        




function checkPossible() {
  
    var start = 2;
    for (i = 1; i < 5; i++) {
      
        for (j = start; j < 6; j++) {
            var fact = checkPair(Number(myField12.getValue()), Number(myField13.getValue()), droplets[i - 1], droplets[j - 1]);
         //   console.log(fact);
            if (fact) {
                
                console.log("possible");
                break;
            }
           // console.log("nope");

        }
        start++;
    }

}



function animate1() { }
function animate2() { }
function animate3() { }
function animate4() { }
function animate5() { }

function testGrab() { console.log(droplets[1].concentration); }

