// import { useSelector, useDispatch } from 'react-redux'
// import { useEffect } from 'react';
// import { getAllSpotsThunk } from '../../store/spots';
// import SpotItem from '../SpotItem';
import React, { Component, useRef, useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import './device.css';
import { useReducer } from 'react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


function Device({device, Modes, Position}) {
  const [init, setinit] = useState(false);

  const [inEdit, setinEdit] = useState(false);

  //deviceName volume
  const [indeviceName, setindeviceName] = useState('');
  const [involume, setinvolume] = useState(0);


  useEffect(() => {
    if (!init){
      console.log('init A dev ==', Position, device)

      setindeviceName(device.deviceName)
      setinvolume(device.volume)

      setinit(true)
    }
    //   if (chart && chart.data) {
    //     console.log('chartclick', chart);
    //     chart.data[0].set('dataPoints', getPts(true));
    //  }
  }, [indeviceName]);

  const Mnormal = 0
  const MAddAudiogram = 1

  function getBtn(){
    function isValid(str) {
      if (typeof str != "string") return false //If not string can't be number
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
            <label htmlFor='indeviceName'>Device Name</label>
            <input
              className="inputA" type='string'
              id='indeviceName' value={indeviceName}
              onChange={e => setindeviceName(e.target.value)} />
              </div>
            <div>
            <label htmlFor='involume'>Volume</label>
            <input
              className="inputA" type='number' min='-5' max ='105'
              id='in500' value={involume}
              onChange={e => setinvolume(isValid(e.target.value))} />
            </div>
          </>)
      } else {
        //We are not editing show only edit button.
        return (<>
          <button onClick={testClick}>Edit</button>
          {getDel()}
        </>)
      }
    }
    function getDel(){
      if (device.id)
        return <button onClick={delClick}>Delete</button>
    }

    return <></>
  }

  function delClick(){
    Modes.doDelete(device)
  }

  function testClick(){
    function isNum(str) {
      return !isNaN(str) && // Use Type conversion to determine if it is a number
             !isNaN(parseFloat(str))
    }

    setinEdit(!inEdit);

    if (inEdit) {
      //Changes may have ben made. trigger save
      let dev = {}

      if (device){
        dev.id = device.id
        dev.userId = device.userId
      }


        dev.deviceName = indeviceName;
        dev.volume = involume;

      Modes.doSave(dev)
    } else {
    }
  }

  function divClick(a, b, c, d){
    if (Position !== 'main') {
      console.log('triggering d.js doaudclick with ', device)
      Modes.doDevClick(device)
    }
  }



  return (
    <div className="redBox" onClick={divClick}>
      {getBtn()}
      <h1>Name:  </h1> <h3> {device.deviceName} </h3>
      <h1>Volume:  </h1> <h3> {device.volume} </h3>
    </div>
  )
}

export default Device;
