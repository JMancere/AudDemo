import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { getAllAudiogramsThunk, updateAudiogramThunk, createAudiogramThunk, deleteAudiogramThunk } from '../../store/audiograms';
import { getAllDevicesThunk, updateDeviceThunk, createDeviceThunk, deleteDeviceThunk } from '../../store/devices';
// import SpotItem from '../SpotItem';
import Audiogram from '../Audiogram/Audiogram';
import Device from '../Device/Device';
import * as sessionActions from "../../store/session";
import { useNavigate } from "react-router-dom";


import './Mainpg.css';

function Mainpg() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Mnormal = 0
  const MAddAudiogram = 1

  const [modeA, setModeA] = useState({state: Mnormal} );
  const [modeD, setModeD] = useState({state: Mnormal} );

  const audiograms = useSelector((store) => store.audiograms)
  const devices = useSelector((store) => store.devices)
  const sessionUser = useSelector(state => state.session.user);
  const validUser = !!useSelector(state => state.session.user)

  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedAud, setselectedAud] = useState()
  const [selectedDev, setselectedDev] = useState()
  const [changeMade, setchangeMade] = useState(0)

  /*
    -1: uninit
    0: no user
    1: logged in user
  */
  const [pageState, setpageState] = useState(-1);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    //  console.log('su, iL, vU', sessionUser, isLoaded, validUser)

    if (isLoaded && !validUser){
      setpageState(0);
    }
    if (isLoaded && validUser){
      setpageState(1);
      dispatch(getAllAudiogramsThunk());
      dispatch(getAllDevicesThunk());
    }
  }, [dispatch, isLoaded, validUser, pageState, changeMade]);


  const deleteClickDev = (device) => {
    // console.log('Aud DELETE triggered : ', audiogram)
    dispatch(deleteDeviceThunk(device.id)).then();
    setselectedDev(null)
  }

  const deleteClick = (audiogram) => {
    // console.log('Aud DELETE triggered : ', audiogram)
    dispatch(deleteAudiogramThunk(audiogram.id)).then();
    setselectedAud(null)
  }

  let SaveDev = (device) => {
    console.log('Dev SAVE triggered : ', device)
    //need to reset errors on submit cause they need to be retried.
    // setErrors('');

    console.log('saving Dev ::: ', device)
    if (!device.id ) {
      //saving new.

      return dispatch(createDeviceThunk(device))
      .then(
        () => {
          setchangeMade(changeMade+1)
        }
      ).catch(async (res) => {
        //console.log('IN CATCH, ', res);
        const data = await res.json();

        if (data && data.errors) {
          return device;
        }
      });
    }

    return dispatch(updateDeviceThunk(device))
      .then(
        () => {
          // navigate(`/`);
          //reset({id})
          setchangeMade(changeMade+1)
        }
      ).catch(async (res) => {
        //console.log('IN CATCH, ', res);
        const data = await res.json();

        if (data && data.errors) {
          return device;
        }
      });
  }

  let Save = (audiogram) => {
    console.log('Aud SAVE triggered : ', audiogram)
    //need to reset errors on submit cause they need to be retried.
    // setErrors('');

    console.log('savinf ::: ', audiogram)
    function isNumeric(str) {
      if (typeof str != "string") return false //If not string can't be number
      return !isNaN(str) && // Use Type conversion to determine if it is a number
             !isNaN(parseFloat(str))
    }

    if (!audiogram.id ) {
      //console.log('saving A: ', audiogram)
      //saving new.


      return dispatch(createAudiogramThunk(audiogram))
      .then(
        () => {
          // navigate(`/`);
          //reset({id})
          setchangeMade(changeMade+1)
        }
      ).catch(async (res) => {
        //console.log('IN CATCH, ', res);
        const data = await res.json();

        //console.log('EL errors::', data.errors)
        if (data && data.errors) {
          return audiogram;
          // return spot.Owner;
        }
      });
    }

    return dispatch(updateAudiogramThunk(audiogram))
      .then(
        () => {
          // navigate(`/`);
          //reset({id})
          setchangeMade(changeMade+1)
        }
      ).catch(async (res) => {
        //console.log('IN CATCH, ', res);
        const data = await res.json();

        //console.log('EL errors::', data.errors)
        if (data && data.errors) {
          return audiogram;
          // return spot.Owner;
        }
      });
  }

  let audClick = (a) => {
    // console.log('Aud click triggered', a)
    if (a){
      //Lt aud has been clicked.
      //Set Mode for middle to display

      console.log('Aud click ID =', a.id, a)
      setModeA(Mnormal);

      setselectedAud(a)
    }
  }

  let devClick = (d) => {
    // console.log('Aud click triggered', a)
    if (d){
      //Lt aud has been clicked.
      //Set Mode for middle to display

      console.log('Dev click ID =', d.id, d)
      setModeD(Mnormal);

      setselectedDev(d)
    }
  }

  const ModesDev = {
    doSave : SaveDev,
    doDevClick : devClick,
    M : modeD,
    doDelete : deleteClickDev,
    haveSelected : false,
  }



  const Modes = {
    doSave : Save,
    doAudClick : audClick,
    M : modeA,
    doDelete : deleteClick,
    haveSelected : false,
  }

  function getHeader(){
    // console.log('JEDAER AAGE STATEW', pageState)
    // console.log('!!!su, iL, vU, ps', sessionUser, isLoaded, validUser, pageState)
    if (pageState === 0){
      return <h1> Please log in or select a Demo User.</h1>
    } else if (pageState === 1) {
      return <h1> Please Select/Create an audiogram and Device.</h1>
    }
    // if (!validUser){
    //   return <h1> Please log in or select a Demo User.</h1>
    // } else {
    //   return <h1> Please Select/Create an audiogram and Device.</h1>
    // }
  }

  //////
  function doAddAud(){
    console.log('add Audiogram clickec!!!')
    //setMode(MAddAudiogram);
    setselectedAud(-1)
  }
  function doAddDev(){
    console.log('add Device clicked!!!')
    setselectedDev(-1)
  }

  function getMain(){
    function getdevs(){
      if (selectedDev){

        return <>
          <h1>Selected Deivice</h1>
          <Device key={selectedDev.id} device={selectedDev} Modes={ModesDev} Position = {'main'}/>
        </>
      }

    }

    // console.log('IN GET MAIN', selectedAud)
    if (selectedAud) {
      if (selectedAud === -1) {
        let aud = {}
        aud.f250 = '';
        aud.f500 = '';
        aud.f750 = '';
        aud.f1000 = '';
        aud.f1500 = '';
        aud.f2000 = '';
        aud.f3000 = '';
        aud.f4000 = '';
        aud.f6000 = '';
        aud.f800 = '';

       return (<>
         <h1>NEW audiogram</h1>
          <Audiogram key={-1} audiogram={aud} Modes={Modes} Position = {'main'}/>
        </>)
      }
      return (<>
        {getdevs()}

         <h1>Selected audiogram</h1>
        <Audiogram key={selectedAud.id} audiogram={selectedAud} Modes={Modes} Position = {'main'}/>
      </>)
    }

    //console.log ('mainnnn get');
  }

  function getAudSL(){
    let res = [];
    if (audiograms.audiograms && validUser){
      for (let audiogram in audiograms.audiograms){
        // console.log('selcted Aud:::', audiograms.audiograms[audiogram])
//        res.push(<Audiogram onClick={selectAud} key={audiograms.audiograms[audiogram].id} audiogram={audiograms.audiograms[audiogram]} Modes={Modes} Position = {'lt'}/>)
        res.push(<Audiogram key={audiograms.audiograms[audiogram].id+(changeMade*1000)} audiogram={audiograms.audiograms[audiogram]} Modes={Modes} Position = {'lt'}/>)
      }
    }
    return res ;
  }

  function getDevSL(){
    let res = [];
    console.log('in getdevsl ', devices)
    if (devices.devices && validUser){
      for (let device in devices.devices){
        let key = devices.devices[device].id;
        // console.log('selcted Dev:::', key, devices.devices[device].id)
        res.push(<Device key={key+(changeMade*1000)} device={devices.devices[device]} Modes={ModesDev} Position = {'rt'}/>)
      }
    }
    return res ;
  }

  function getLtAuds(){
    if (pageState === 0){
      return <h1> </h1>
    } else if (pageState === 1) {
      return <>
        <h1>Defined Audiograms</h1>
        <button onClick={doAddAud}> Add audiogram</button>
        {getAudSL()}
        </>
    }
  }

  function getRtDevs(){
    if (pageState === 0){
      return <h1> </h1>
    } else if (pageState === 1) {
      return <>
        <h1>Devices</h1>
        <button onClick={doAddDev}> Add device</button>
        {getDevSL()}
        </>
    }
  }

  return (
    < div className="containerA">
      <div className="redBox header">
        {getHeader()}
      </div>

      <div className="redBox lt">
        {getLtAuds()}
      </div>

      <div className="redBox rt">
        {/* <h1>section RT</h1> */}
        {getRtDevs()}
      </div>

      <div className="redBox main">
         {getMain()}
      </div>
  </div>
  )
}

export default Mainpg;
