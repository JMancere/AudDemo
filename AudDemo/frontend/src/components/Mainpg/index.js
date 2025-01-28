import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getAllAudiogramsThunk } from '../../store/audiograms';
// import SpotItem from '../SpotItem';
import './Mainpg.css';


function Mainpg() {
  const dispatch = useDispatch();

  const audiograms = useSelector((store) => store.audiograms)

  useEffect(() => {
    dispatch(getAllAudiogramsThunk());
  }, [dispatch]);

  function getSL(){
    let res = [];
    if (audiograms.audiograms){
      for (let audiogram in audiograms.audiograms){
        //res.push(<SpotItem key={audiograms.audiograms[audiogram].id} spot={audiograms.audiograms[audiogram]}/>)
        res.push(<p key={audiograms.audiograms[audiogram].id}> {audiograms.audiograms[audiogram].f250}</p>)
      }
    }
    return res ;
  }

  // function getSL2(){
  //   let res = [];
  //   let count = 0;

  //   res.push(<p key={123}>HI</p>)
  //   console.log('asdsad' +audiograms.audiograms)
  //   console.log('AAAAAAAA' +audiograms)
  //   if (audiograms.audiograms){
  //     for (let audiogram in audiograms.audiograms){
  //       count++;
  //       {console.log('COUNTING A -- ' + audiogram)}
  //       <p>{audiogram}</p>
  //       res.push(<p>{audiogram.audiograms}</p>)
  //     }
  //   }
  //   // res.push(<SpotItem key={spots.spots[spot].id} spot={spots.spots[spot]}/>)
  //   res.push(<p key={1234}>count is {count}</p>)
  //   return res;
  // }
  return (
    <div className="redBox">
      <h1>Spotsss List</h1>
      <ul className="redBox spots">
        {getSL()}
      </ul>
    </div>
  )
}

export default Mainpg;
