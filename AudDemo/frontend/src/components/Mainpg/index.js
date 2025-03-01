import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react';
import { getAllAudiogramsThunk } from '../../store/audiograms';
// import SpotItem from '../SpotItem';
import Audiogram from '../Audiogram/Audiogram';
import './Mainpg.css';

function Mainpg() {
  const dispatch = useDispatch();
  const Mnormal = 0
  const MAddAudiogram = 1
  const [mode, setMode] = useState(Mnormal);

  const audiograms = useSelector((store) => store.audiograms)

  useEffect(() => {
    dispatch(getAllAudiogramsThunk());
  }, [dispatch]);

  let Save = () => {
    console.log('SSSAVVVEEEE triggered')
  }

  const Modes = {
    doSave : Save,
    M : mode
  }
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
    if (audiograms.audiograms){
      for (let audiogram in audiograms.audiograms){
        // console.log('ADDING ' + audiograms.audiograms[audiogram].id)
        res.push(<Audiogram key={audiograms.audiograms[audiogram].id} audiogram={audiograms.audiograms[audiogram]} Modes={Modes} Position = {'lt'}/>)
        // res.push(<Audiogram key={audiograms.audiograms[audiogram].id}/>)
        // res.push(<p key={audiograms.audiograms[audiogram].id}> {'A'+audiograms.audiograms[audiogram].id}</p>)
      //break;
      }
      // for (let audiogram in audiograms.audiograms){
      //   //res.push(<SpotItem key={audiograms.audiograms[audiogram].id} spot={audiograms.audiograms[audiogram]}/>)
      //   res.push(<p key={audiograms.audiograms[audiogram].id}> {'A'+audiograms.audiograms[audiogram].f250}</p>)
      //   res.push(<p key={audiograms.audiograms[audiogram].i+1}> {'B'+audiograms.audiograms[audiogram].f250}</p>)
      //   res.push(<p key={audiograms.audiograms[audiogram].id+2}> {'C'+audiograms.audiograms[audiogram].f250}</p>)
      //   res.push(<p key={audiograms.audiograms[audiogram].i+4}> {'D'+audiograms.audiograms[audiogram].f250}</p>)
      //   res.push(<p key={audiograms.audiograms[audiogram].id+56}> {'E'+audiograms.audiograms[audiogram].f250}</p>)
      //   res.push(<p key={audiograms.audiograms[audiogram].id+3}> {'F'+audiograms.audiograms[audiogram].f250}</p>)
      // }
    }
    return res ;
  }

  return (
    < div className="container">
      <div className="redBox header">
        <h1>Header. todo.</h1>
      </div>

      <div className="redBox lt">
        <h1>Defined Audiograms</h1>
        <button onClick={doAddAud}> Add audiogram</button>
        {getSL()}
        {/* { <ul className="redBox spots">
          {getSL()}
        </ul> } */}
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
