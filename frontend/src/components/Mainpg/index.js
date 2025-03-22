import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { getAllAudiogramsThunk } from '../../store/audiograms';
// import SpotItem from '../SpotItem';
import Audiogram from '../Audiogram/Audiogram';
import * as sessionActions from "../../store/session";

import './Mainpg.css';

/*
workflow:
 state:
  0. No user logged in
    No devices loaded,
    No audiograms loaded.
    Set Log in message.
*/



function Mainpg() {
  const dispatch = useDispatch();
  const Mnormal = 0
  const MAddAudiogram = 1

  const [mode, setMode] = useState(Mnormal);

  const audiograms = useSelector((store) => store.audiograms)
  const sessionUser = useSelector(state => state.session.user);
  const validUser = !!useSelector(state => state.session.user)

  const [isLoaded, setIsLoaded] = useState(false);

  /*
    -1: uninit
    0: no user
    1: logged in user
  */
  const [pageState, setpageState] = useState(-1);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    //  console.log('su, iL, vU', sessionUser, isLoaded, validUser)

//    if (isLoaded && pageState === -1){
    // if (isLoaded){
    //   if (validUser){
    //     console.log('Setting page 0')
    //     setpageState(0)
    //   } else {
    //     console.log('Setting page 1')
    //     setpageState(1);
    //   }
    // }

    if (isLoaded && !validUser){
      setpageState(0);
    }
    if (isLoaded && validUser){
      setpageState(1);
      dispatch(getAllAudiogramsThunk());
    }
  }, [dispatch, isLoaded, validUser, pageState]);

  let Save = () => {
    console.log('SSSAVVVEEEE triggered')
  }

  const Modes = {
    doSave : Save,
    M : mode
  }

  function getHeader(){
    console.log('JEDAER AAGE STATEW', pageState)
      console.log('!!!su, iL, vU, ps', sessionUser, isLoaded, validUser, pageState)
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
    console.log('addddddd clickec!!!')
    setMode(MAddAudiogram);
  }

  function getMain(){
    console.log ('mainnnn get');
    return <Audiogram key={0} audiogram={null} Modes={Modes} Position = {'main'}/>
  }

  function getSL(){
    let res = [];
    if (audiograms.audiograms && validUser){
      for (let audiogram in audiograms.audiograms){
        res.push(<Audiogram key={audiograms.audiograms[audiogram].id} audiogram={audiograms.audiograms[audiogram]} Modes={Modes} Position = {'lt'}/>)
      }
    }
    return res ;
  }

  return (
    < div className="containerA">
      <div className="redBox header">
        {getHeader()}
        {/* <h1>Header. todo.</h1> */}
      </div>

      <div className="redBox lt">
        <h1>Defined Audiograms</h1>
        <button onClick={doAddAud}> Add audiogram</button>
        {getSL()}
      </div>

      <div className="redBox rt">
        <h1>section RT</h1>
        {/* {getSL()} */}
      </div>

      <div className="redBox main">
         <h1>MAIN</h1>
         {getMain()}
      </div>
  </div>
  )
}

export default Mainpg;
