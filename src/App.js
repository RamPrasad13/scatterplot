import React, { Component } from 'react';
import './App.css';

var LineChart = require("react-chartjs").Line;

class App extends Component {
  render() {

    const plotpoints = [
      {
        "start_time": "2017-11-23T04:56:12Z",
        "status": "pass",
        "duration": 170, // in seconds
      },
      {
        "start_time": "2017-11-23T06:56:12Z",
        "status": "error",
        "duration": 27, // in seconds
      },
      {
        "start_time": "2017-11-23T01:46:12Z",
        "status": "fail",
        "duration": 88, // in seconds
      },
      {
        "start_time": "2017-11-24T08:56:12Z",
        "status": "pass",
        "duration": 15, // in seconds
      },
      {
        "start_time": "2017-11-24T01:16:12Z",
        "status": "error",
        "duration": 39, // in seconds
      },
      {
        "start_time": "2017-11-24T01:39:12Z",
        "status": "fail",
        "duration": 95, // in seconds
      },
      {
        "start_time": "2017-11-29T04:56:12Z",
        "status": "pass",
        "duration": 126, // in seconds
      },
      {
        "start_time": "2017-11-28T03:22:12Z",
        "status": "error",
        "duration": 205,
      },
      {
        "start_time": "2017-11-28T02:24:12Z",
        "status": "fail",
        "duration": 20,
      },
      {
        "start_time": "2017-11-28T05:24:12Z",
        "status": "pass",
        "duration": 90,
      },
      {
        "start_time": "2017-11-29T06:24:12Z",
        "status": "error",
        "duration": 160,
      },
      {
        "start_time": "2017-11-26T14:12:12Z",
        "status": "pass",
        "duration": 200,
      },
      {
        "start_time": "2017-11-25T05:24:12Z",
        "status": "pass",
        "duration": 100,
      },
      {
        "start_time": "2017-11-25T07:20:12Z",
        "status": "fail",
        "duration": 50,
      },
      {
        "start_time": "2017-11-26T06:24:12Z",
        "status": "error",
        "duration": 140,
      },
      {
        "start_time": "2017-11-29T14:12:12Z",
        "status": "fail",
        "duration": 60,
      }
    ];

    let dateArray = ["", "11-23","11-24", "11-25", "11-26", "11-27", "11-28", "11-29"];
    let passDurationArr = [];
    let failDurationArr = [];
    let errorDurationArr = [];
    dateArray.forEach(function(dateItem){
      let isPassDateDuration = null;
      let isErrDateDuration = null;
      let isFailDateDuration = null;
      plotpoints.forEach(function(plotData){
        const start_time = plotData.start_time;
        const tempDate = start_time.split('T')[0];
        const checkDate = tempDate.split(/-(.+)/)[1];
        if (checkDate === dateItem) {
          if (plotData.status === 'pass') {
            isPassDateDuration = plotData.duration;
          } else if (plotData.status === 'fail') {
            isFailDateDuration = plotData.duration;
          } else {
            isErrDateDuration = plotData.duration;
          }
        }
      });
      passDurationArr.push(isPassDateDuration);
      failDurationArr.push(isFailDateDuration);
      errorDurationArr.push(isErrDateDuration);
    });
    let chartData = {
      labels: dateArray,
      datasets: [
        {
          label: "Pass",
          pointColor: "#00e600",
          pointHighlightFill: "#00e600",
          data: passDurationArr
        },
        {
          label: "Fail",
          pointColor: "#ff0000",
          pointHighlightFill: "#ff0000",
          data: failDurationArr
        },
        {
          label: "Error",
          pointColor: "#ff9933",
          pointHighlightFill: "#ff9933",
          data: errorDurationArr
        }
      ]
    };

  let chartOptions = {

  ///Boolean - Whether grid lines are shown across the chart
  scaleShowGridLines : true,

  //String - Colour of the grid lines
  scaleGridLineColor : "rgba(0,0,0,.05)",

  //Number - Width of the grid lines
  scaleGridLineWidth : 1,

  //Boolean - Whether to show horizontal lines (except X axis)
  scaleShowHorizontalLines: true,

  //Boolean - Whether to show vertical lines (except Y axis)
  scaleShowVerticalLines: true,

  //Boolean - Whether the line is curved between points
  bezierCurve : false,

  //Number - Tension of the bezier curve between points
  bezierCurveTension : 0,

  //Boolean - Whether to show a dot for each point
  pointDot : true,

  //Number - Radius of each point dot in pixels
  pointDotRadius : 6,

  //Number - Pixel width of point dot stroke
  pointDotStrokeWidth : 1,

  //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
  pointHitDetectionRadius : 20,

  //Boolean - Whether to show a stroke for datasets
  datasetStroke : false,

  //Number - Pixel width of dataset stroke
  datasetStrokeWidth : 2,

  //Boolean - Whether to fill the dataset with a colour
  datasetFill : false,
 
  //String - A legend template
  legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>",
  //Boolean - Whether to horizontally center the label and point dot inside the grid
  offsetGridLines : false
};
let w = window.innerWidth - ( window.innerWidth / 10 );
let h = window.innerHeight - ( window.innerHeight / 10 );
    return (
      <div className="App">
        <div className="pos-rel">
          <LineChart height={h} width={w} data={chartData} options={chartOptions}/>
          <div className="pos-abl time-text">Seconds</div>
          <div className="pos-abl date-text">Date</div>
        </div>
      </div>
    );
  }
}

export default App;
