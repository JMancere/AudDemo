// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect } from 'react';
// import { getAllSpotsThunk } from '../../store/spots';
// import SpotItem from '../SpotItem';
import React, { Component, useRef, useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import './audiogram.css';
import { useReducer } from 'react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function Audiogram({audiogram, Modes, Position}) {
  const [init, setinit] = useState(false);

  const [inEdit, setinEdit] = useState(false);

  const [in250, setin250] = useState(0);
  const [in500, setin500] = useState(0);
  const [in750, setin750] = useState(0);
  const [in1000, setin1000] = useState(0);
  const [in1500, setin1500] = useState(0);
  const [in2000, setin2000] = useState(0);
  const [in3000, setin3000] = useState(0);
  const [in4000, setin4000] = useState(0);
  const [in6000, setin6000] = useState(0);
  const [in8000, setin8000] = useState(0);


  // const dispatch = useDispatch();

  // const spots = useSelector((store) => store.spots)
  // useReducer(    setin250(audiogram.f250) )
  useEffect(() => {
    if (!init){
      //audiogram.f250A = audiogram.f250;
      setin250(audiogram.f250)
      setin500(audiogram.f500)
      setin750(audiogram.f750)
      setin1000(audiogram.f1000)
      setin1500(audiogram.f1500)
      setin2000(audiogram.f2000)
      setin3000(audiogram.f3000)
      setin4000(audiogram.f4000)
      setin6000(audiogram.f6000)
      setin8000(audiogram.f8000)
      setinit(true)
    }
      if (chart && chart.data) {
        console.log('chartclick', chart);
        chart.data[0].set('dataPoints', getPts(true));
     }
  }, [in250]);

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
    function isValid(str) {
      if (typeof str != "string") return false //If not string can't be number
      // return !isNaN(str) && // Use Type conversion to determine if it is a number
      //        !isNaN(parseFloat(str))
      if (!isNaN(str) && !isNaN(parseFloat(str))){
        return Number(str)
      } else {
        return '';
      }
    }

    if (Position === 'main') {
      //It will be either edit or save.
      if (inEdit) {
        //We are editing. Show save button and edit boxes.
        return (
          <>
            <button onClick={testClick}>Save</button>

            <div>
            <label htmlFor='in250'>250 Hz</label>
            <input
              className="inputA" type='number' min='-5' max ='105'
              id='in250' value={in250}
              onChange={e => setin250(isValid(e.target.value))} />
              </div>
            <div>
            <label htmlFor='in500'>500 Hz</label>
            <input
              className="inputA" type='number' min='-5' max ='105'
              id='in500' value={in500}
              onChange={e => setin500(isValid(e.target.value))} />
            </div>
            <div>
            <div>
            <label htmlFor='in750'>750 Hz</label>
            <input
              className="inputA" type='number' min='-5' max ='105'
              id='in750' value={in750}
              onChange={e => setin750(isValid(e.target.value))} />
            </div>
            <label htmlFor='in1000'>1000 Hz</label>
            <input
              className="inputA" type='number' min='-5' max ='105'
              id='in1000' value={in1000}
              onChange={e => setin1000(isValid(e.target.value))} />
            </div>

            <div>
            <label htmlFor='in1500'>1500 Hz</label>
            <input
              className="inputA" type='number' min='-5' max ='105'
              id='in1500' value={in1500}
              onChange={e => setin1500(isValid(e.target.value))} />
            </div>
            <div>
            <label htmlFor='in2000'>2000 Hz</label>
            <input
              className="inputA" type='number' min='-5' max ='105'
              id='in2000' value={in2000}
              onChange={e => setin2000(isValid(e.target.value))} />
            </div>
            <div>
            <label htmlFor='in3000'>3000 Hz</label>
            <input
              className="inputA" type='number' min='-5' max ='105'
              id='in3000' value={in3000}
              onChange={e => setin3000(isValid(e.target.value))} />
            </div>
            <div>
            <label htmlFor='in4000'>4000 Hz</label>
            <input
              className="inputA" type='number' min='-5' max ='105'
              id='in4000' value={in4000}
              onChange={e => setin4000(isValid(e.target.value))} />
            </div>
            <div>
            <label htmlFor='in6000'>6000 Hz</label>
            <input
              className="inputA" type='number' min='-5' max ='105'
              id='in6000' value={in6000}
              onChange={e => setin6000(isValid(e.target.value))} />
            </div>
            <div>
            <label htmlFor='in8000'>8000 Hz</label>
            <input
              className="inputA" type='number' min='-5' max ='105'
              id='in8000' value={in8000}
              onChange={e => setin8000(isValid(e.target.value))} />
            </div>
          </>)
      } else {
        //We are not editing show only edit button.
        return <button onClick={testClick}>Edit</button>
      }
    }


    if (Modes.M === MAddAudiogram && Position === 'main') {
      return <button onClick={Modes.doSave}> Do save!</button>
    }
    // console.log('gb', Position)
    // return <button onClick={testClick}> Test !</button>
    return <></>
  }

  // function test2Click(){
  //     if (chart.current) {
  //       var c = chart.current
  //       console.log('chartclick2222', chart);
  //       c.data[0].set('dataPoints', getPts(true));
  //     }
  // }

  function testClick(){
    setinEdit(!inEdit);

    if (inEdit) {
      //Reinit
      //setin250(25)
      //We are editing. Show save button and edit boxes.
      //   return (
      //     <button onClick={testClick}>Save</button>
      //   )
      // } else {
        //We are not editing show only edit button.
      //     return <button onClick={testClick}>Edit</button>
    }


    //var type = chart.data[0].get("type");
    // if (chart == null){
    //   console.log('DivCLICK CC   ', chart``)
    //   // var TT = chart.data[0];

    //   // console.log('DivCLICK tyyyy   ', TT)
    // }
    //   if (chart) {
    //     console.log('chartclick', chart);
    //     chart.data[0].set('dataPoints', getPts(true));
    //  }
  }
  const get250 = () => {
    return in2000// audiogram.f250
  }

  function getPts(test){
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

      // dp.push({x: 0, y: audiogram.f250,label: "250"})
      // haveAllNulls = (audiogram.f250 === null) && haveAllNulls;
      // const tt = in250
      // console.log('In SET pts 250 === ', in250, tt)
      // in250
      // dp.push({x: 0, y: audiogram.f250,label: "250"})
      dp.push({x: 0, y: in250,label: "250"})
      haveAllNulls = (in250 === null) && haveAllNulls;

      // if (test){
      //   const abc = in250
      //   console.log('setting AAAAA:: ' , abc, typeof(abc))
      //   dp.push({x: 0.5, y: Number(abc),label: "250"})

      // }

      dp.push({x: 1, y: in500,label: "500"})
      haveAllNulls = (in500 === null) && haveAllNulls;

      dp.push({x: 1.5, y: in750,label: "750"})
      haveAllNulls = (in750 === null) && haveAllNulls;

      dp.push({x: 2, y: in1000,label: "1000"})
      haveAllNulls = (in1000 === null) && haveAllNulls;

      dp.push({x: 3, y: in1500,label: "1500"})
      haveAllNulls = (in1500 === null) && haveAllNulls;

      dp.push({x: 4, y: in2000,label: "2000"})
      haveAllNulls = (in2000 === null) && haveAllNulls;

      dp.push({x: 4.5, y: in3000,label: "3000"})
      haveAllNulls = (in3000 === null) && haveAllNulls;

      dp.push({x: 5, y: in4000,label: "4000"})
      haveAllNulls = (in4000 === null) && haveAllNulls;

      dp.push({x: 5.5, y: in6000,label: "6000"})
      haveAllNulls = (in6000 === null) && haveAllNulls;

      dp.push({x: 6, y: in8000,label: "8000"})
      haveAllNulls = (in8000 === null) && haveAllNulls;

      // dp.push({x: 1, y: audiogram.f500,label: "500"})
      // haveAllNulls = (audiogram.f500 === null) && haveAllNulls;

      // dp.push({x: 1.5, y: audiogram.f750,label: "750"})
      // haveAllNulls = (audiogram.f750 === null) && haveAllNulls;

      // dp.push({x: 2, y: audiogram.f1000,label: "1000"})
      // haveAllNulls = (audiogram.f1000 === null) && haveAllNulls;

      // dp.push({x: 3, y: audiogram.f1500,label: "1500"})
      // haveAllNulls = (audiogram.f1500 === null) && haveAllNulls;

      // dp.push({x: 4, y: audiogram.f2000,label: "2000"})
      // haveAllNulls = (audiogram.f2000 === null) && haveAllNulls;

      // dp.push({x: 4.5, y: audiogram.f3000,label: "3000"})
      // haveAllNulls = (audiogram.f3000 === null) && haveAllNulls;

      // dp.push({x: 5, y: audiogram.f4000,label: "4000"})
      // haveAllNulls = (audiogram.f4000 === null) && haveAllNulls;

      // dp.push({x: 5.5, y: audiogram.f6000,label: "6000"})
      // haveAllNulls = (audiogram.f6000 === null) && haveAllNulls;

      // dp.push({x: 6, y: audiogram.f8000,label: "8000"})
      // haveAllNulls = (audiogram.f8000 === null) && haveAllNulls;
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
        connectNullData: true,
        // click: function(e){
        //   alert(  e.dataSeries.type+ " x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y);
        // },
          type: "line",
				// toolTipContent: "Week {x}: {y}%",
				dataPoints: getPts()
			}]
    };
    return options ;
  }

  // function dclick(a, b, c, d){
  //   console.log('DCLICK   ', a, b, c, d)
  // }

  function divClick(a, b, c, d){
    if (Position !== 'main')
      Modes.doAudClick(audiogram)

    // if (onclick){
    //   (onclick(a))
    // }
    // console.log('DivCLICK   ', a, b, c, d)
  }



  var chart = useRef(null);
  return (
    <div className="redBox" onClick={divClick}>
      {getBtn()}
			<CanvasJSChart options = {GetOptions()} onRef={ref => chart.current = ref} />
    </div>
  )
}

export default Audiogram;
