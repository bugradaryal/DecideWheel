try{
  const wheel = document.getElementById("wheel");
  const spinBtn = document.getElementById("spin-btn");
  const updatebtn = document.getElementById("spin-update-btn");
  var wheelfontsize = screen.width * 0.0125;
  if( wheelfontsize < 10 ){
    wheelfontsize = 10;
  }
  var id = 3;
  var max_input_count = 30;
  function CreateInput(){
      if(id < max_input_count)
      {
          id++;
  
          var div = document.createElement("div");
          div.style.cssText="display:flex; flex-direction:column; margin:1em; border:2px solid LightGray; border-radius:10px; padding:1em; width:17%; min-width:9em; background-color: whitesmoke;";
          div.setAttribute("id","jsdiv"+id);
      
          var text = document.createElement("b");
          text.style.cssText="margin-bottom:1em;";
          text.innerText= "Value " + id + ":";
      
          var inputs = document.createElement("input");
          inputs.style.cssText="overflow-x: auto; width:80%; border:1px solid black; border-radius:7px; height:1.5em; padding-left:1em;";
          inputs.setAttribute("id","btnid"+id);
          inputs.setAttribute("placeholder","Empty");
          inputs.setAttribute("maxLength","16");
      
          document.getElementById("in1").appendChild(div);
          document.getElementById("jsdiv"+id).appendChild(text);
          document.getElementById("jsdiv"+id).appendChild(inputs);
      }
      else{
          alert("İnputs are limited by admin, max input count is " + max_input_count + "!");
      }
  }
  function RemoveInput(){
      if(id > 0){
          document.getElementById("jsdiv"+id).remove();
          id--;
      }
  }
  function XInput(){
      if(id > 0){
          for(var i =id; i > 0; i--){
              document.getElementById("jsdiv"+i).remove();
          }
          id=0;
      }
  }

  let myChart = new Chart(wheel, {
    plugins: [ChartDataLabels],
    type: "pie",
    data: {
      labels: ["1","2","3"],
      datasets: [
        {
          backgroundColor: ["#8b35bc","#b163da","#8b35bc"],
          data: ["30","30","30"]
        },
      ],
    },
    options: {
      responsive: true,
      animation: { 
		    duration: Math.random(3-2),
	    },
      plugins: {
        tooltip: false,
        legend: {
          display: false,
        },
        datalabels: {
          rotation: (context) =>
          context.dataIndex * (360 / context.chart.data.labels.length) + 360 / context.chart.data.labels.length / 2 + 270 + context.chart.options.rotation,
          color: "#ffffff",
          formatter: (_, context) => context.chart.data.labels[context.dataIndex],
          font: { size: wheelfontsize },
          align: "center",
          },
        },
      },
    });
    updatebtn.addEventListener("click", () => {
    if(id < 1){
      alert("Error!, Add some imputs!!");
    }
    else{
      updatebtn.disabled = true;
      var datavalue= Math.ceil(100 / id);
      var data = [];
      var pieColors = [];
      var lebels = [];
      for(var i = 0; i < id; i++){
        data[i] = datavalue;
        var inptvalue = document.getElementById("btnid"+(i+1)).value;
        lebels[i] = (inptvalue === undefined || inptvalue == null || inptvalue == "") ? "Empty" : inptvalue;
        if(i == 0 || i % 2 == 0)
          pieColors[i] = "#8b35bc";
        else
        pieColors[i] = "#b163da";
      }
      myChart.config.data = {
          labels: lebels,
          datasets: [
            {
              backgroundColor: pieColors,
              data: data,
            },
          ],
      };
      myChart.update();
      document.getElementById("wrapper").style.cssText="visibility: visible;";
      updatebtn.disabled = false;
    }
  });
    let count = 0;
    let resultValue = 101;
    spinBtn.addEventListener("click", () => {
      updatebtn.disabled = true;
      spinBtn.disabled = true;
      let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
      let rotationInterval = window.setInterval(() => {
      myChart.options.rotation = myChart.options.rotation + resultValue;
      myChart.update();
      if (myChart.options.rotation >= 360) {
        count += 1;
        resultValue -= 5;
        myChart.options.rotation = 0;
      } else if (count > 15 && myChart.options.rotation == randomDegree) {
        spinBtn.disabled = false;
        updatebtn.disabled = false;
        clearInterval(rotationInterval);
        count = 0;
        resultValue = 101;
      }
    }, 10);
  });  
}
catch(err){
  location.href='C:/Users/bugra/Desktop/wheel/error/error.html';
  alert(err);
}