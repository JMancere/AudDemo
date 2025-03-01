// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect } from 'react';
// import { getAllSpotsThunk } from '../../store/spots';
// import SpotItem from '../SpotItem';
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import './audiogram.css';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function Audiogram({audiogram, Modes, Position}) {
  // const dispatch = useDispatch();

  // const spots = useSelector((store) => store.spots)

  // useEffect(() => {
  //   dispatch(getAllSpotsThunk());
  // }, [dispatch]);

  // function getSL(){
  //   let res = [];
  //   if (spots.spots){
  //     for (let spot in spots.spots){
  //       res.push(<SpotItem key={spots.spots[spot].id} spot={spots.spots[spot]}/>)
  //     }
  //   }
  //   return res ;
  // }
  const Mnormal = 0
  const MAddAudiogram = 1

  function getBtn(){
    if (Modes.M === MAddAudiogram && Position === 'main') return <button onClick={Modes.doSave}> Do save!</button>
    return <></>
  }


  function getPts(){
    let dp = [];
    let haveAllNulls = false;
    if (!audiogram || (Modes.M === MAddAudiogram && Position === 'main')) {
      dp.push({x: 0, y: null,label: "250"})
      dp.push({x: 1, y: null,label: "500"})
      dp.push({x: 1.5, y: null,label: "750"})
      dp.push({x: 2, y: null,label: "1000"})
      dp.push({x: 3, y: null,label: "1500"})
      dp.push({x: 4, y: null,label: "2000"})
      dp.push({x: 4.5, y: null,label: "3000"})
      dp.push({x: 5, y: null,label: "4000"})
      dp.push({x: 5.5, y: null,label: "6000"})
      dp.push({x: 6, y: null,label: "8000"})

    } else {
      haveAllNulls = audiogram.f250 === null;

      dp.push({x: 0, y: audiogram.f250,label: "250"})
      haveAllNulls = (audiogram.f250 === null) && haveAllNulls;

      dp.push({x: 1, y: audiogram.f500,label: "500"})
      haveAllNulls = (audiogram.f500 === null) && haveAllNulls;

      dp.push({x: 1.5, y: audiogram.f750,label: "750"})
      haveAllNulls = (audiogram.f750 === null) && haveAllNulls;

      dp.push({x: 2, y: audiogram.f1000,label: "1000"})
      haveAllNulls = (audiogram.f1000 === null) && haveAllNulls;

      dp.push({x: 3, y: audiogram.f1500,label: "1500"})
      haveAllNulls = (audiogram.f1500 === null) && haveAllNulls;

      dp.push({x: 4, y: audiogram.f2000,label: "2000"})
      haveAllNulls = (audiogram.f2000 === null) && haveAllNulls;

      dp.push({x: 4.5, y: audiogram.f3000,label: "3000"})
      haveAllNulls = (audiogram.f3000 === null) && haveAllNulls;

      dp.push({x: 5, y: audiogram.f4000,label: "4000"})
      haveAllNulls = (audiogram.f4000 === null) && haveAllNulls;

      dp.push({x: 5.5, y: audiogram.f6000,label: "6000"})
      haveAllNulls = (audiogram.f6000 === null) && haveAllNulls;

      dp.push({x: 6, y: audiogram.f8000,label: "8000"})
      haveAllNulls = (audiogram.f8000 === null) && haveAllNulls;
      // console.log('Have this dppppp>LLL    ' + dp[0].y, '  ', dp[0].y ===null, ' ', haveAllNulls)
    }
    if (haveAllNulls) return [];
    return dp;
  }

  function GetOptions(){
		const options = {
      // width: 150,
      // height: 350,
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", // "light1", "dark1", "dark2"
			title:{
				text: "Hearing Loss"
			},
			axisY: {
				title: "db HL",
				includeZero: false,
        minimum: -5,
        maximum: 110
			},
			axisX: {
				title: "Frequency (Hz)",
				// prefix: "W",
				// interval: 2
        minimum: -0.5,
        maximum: 6.5      			},
			data: [{
        click: function(e){
          alert(  e.dataSeries.type+ " x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y);
        },
          type: "line",
				// toolTipContent: "Week {x}: {y}%",
				dataPoints: getPts()
			}]
    };
    return options ;
  }

  function dclick(a, b, c, d){
    console.log('DCLICK   ', a, b, c, d)
  }

  return (
    <div className="redBox">
      {getBtn()}
			<CanvasJSChart onClick={dclick} options = {GetOptions()}
				// onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
  )
}

export default Audiogram;
