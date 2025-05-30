import { csrfFetch } from "./csrf";

const GET_AUDIOGRAMS = "audiograms/getAll";
// const GET_SPOTDETAILS = "spots/getSpotDetails";
 const ADD_AUDIOGRAM = 'audiograms/addAudiogram';
 const EDIT_AUDIOGRAM = 'audiograms/editAudiogram';
 const DELETE_AUDIOGRAM = 'audiograms/deleteAudiogram';
// const DELETE_REVIEW = 'spots/deleteReview';
// const ADD_REVIEW = 'spots/addReview';
// const GET_SPOTSCURRENT = 'spots/getSpotsCurrent';

// const deleteReview = (reviewID) => {
//   return {
//     type: DELETE_REVIEW,
//     payload: reviewID
//   };
// }

const deleteAudiogram = (audiogramID) => {
  return {
    type: DELETE_AUDIOGRAM,
    payload: audiogramID
  };
}

const editAudiogram = (audiogram) => {
  return {
    type: EDIT_AUDIOGRAM,
    payload: audiogram
  };
}


const getAllAudiograms = (audiograms) => {
  return {
    type: GET_AUDIOGRAMS,
    payload: audiograms,
  };
};
export const getAllAudiogramsThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/audiograms");

  if (response.ok){
    const data = await response.json();
    console.log('Auds THUNK data', data)
    dispatch(getAllAudiograms(data.Audiograms));
  } else {
  }
  return response;
};

export const updateAudiogramThunk = (audiogram) => async (dispatch) => {

  let response;
  response = await csrfFetch(`/api/audiograms/${audiogram.id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(audiogram)
    }
  );
  if (response.ok){
    const data = await response.json();
    //console.log('SPOTS THUNK data', data)
    dispatch(editAudiogram(data));
  } else {
  }
  return response;

}

const addAudiogram = (audiogram) => {
  return {
    type: ADD_AUDIOGRAM,
    payload: {audiogram},
  };
}

export const createAudiogramThunk = (audiogram) => async (dispatch) => {
  //console.log('CREATING SPOT:::', spot);

  let response;
  response = await csrfFetch("/api/audiograms/",
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(audiogram)
    }
  );

  if (response.ok){
    const data = await response.json();
    dispatch(addAudiogram(data));
    //console.log('adadaddadad', data)
  } else {
  }

  return response;
};

export const deleteAudiogramThunk = (audiogramId) => async (dispatch) => {
  //console.log('Deleting SPOT:::', spotId);

  let response;
  response = await csrfFetch(`/api/audiograms/${audiogramId}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: null
    }
  );
  if (response.ok){
    //const data = await response.json();
    await response.json();
    //console.log('SPOTS DELETED data', data)
    dispatch(deleteAudiogram(audiogramId));
  } else {
  }
  return response;
}

// const getAllSpots = (spots) => {
//   return {
//     type: GET_SPOTS,
//     payload: spots,
//   };
// };

// const getSpotDetails = (spot, reviews) => {
//   return {
//     type: GET_SPOTDETAILS,
//     payload: spot,
//     reviews: {reviews}
//   };
// };

// const addSpot = (spot) => {
//   return {
//     type: ADD_SPOT,
//     payload: {spot},
//   };
// }


// export const deleteReviewThunk = (reviewId) => async (dispatch) => {
//   //console.log('Deleting REVIEW:::', reviewId);

//   let response;
//   response = await csrfFetch(`/api/reviews/${reviewId}`,
//     {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: null//JSON.stringify(spot)
//     }
//   );
//   if (response.ok){
//     //const data = await response.json();
//     await response.json();
//     //console.log('REVIEW DELETED data', data)
//     dispatch(deleteReview(reviewId));
//   } else {
//   }
//   return response;

// }

// export const deleteSpotThunk = (spotId) => async (dispatch) => {
//   //console.log('Deleting SPOT:::', spotId);

//   let response;
//   response = await csrfFetch(`/api/spots/${spotId}`,
//     {
//       method: 'DELETE',
//       headers: { 'Content-Type': 'application/json' },
//       body: null//JSON.stringify(spot)
//     }
//   );
//   if (response.ok){
//     //const data = await response.json();
//     await response.json();
//     //console.log('SPOTS DELETED data', data)
//     dispatch(deleteSpot(spotId));
//   } else {
//   }
//   return response;
// }


// export const getCurrentSpotsThunk = () => async (dispatch) => {
//   const response = await csrfFetch("/api/spots");
//   //console.log('resp', response)

//   if (response.ok){
//     const data = await response.json();
//     //console.log('SPOTS THUNK data', data)
//     dispatch(getAllSpots(data.Spots));
//   } else {
//   }
//   return response;

// }

// export const createReviewThunk = (spot, review) => async (dispatch) => {
//   //console.log('CREATING REVIEW:::', review);

//   let response;
//   response = await csrfFetch(`/api/spots/${spot.id}/reviews`,
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(review)
//     }
//   );

//   if (response.ok){

//     //const data = await response.json();
//     // dispatch(addReview(spot.id, data));
//     dispatch(getSpotDetailsThunk(spot.id))
//   } else {
//   }

//   return response;
// };

// export const createSpotThunk = (spot) => async (dispatch) => {
//   //console.log('CREATING SPOT:::', spot);

//   let response;
//   response = await csrfFetch("/api/spots/",
//     {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(spot)
//     }
//   );

//   if (response.ok){
//     const data = await response.json();
//     dispatch(addSpot(data));
//     //console.log('adadaddadad', data)
//     //add any images
//     if (spot.imgPreview){
//       let img = {};
//       img.url = spot.imgPreview;
//       img.preview = true;
//       response = await csrfFetch(`/api/spots/${data.id}/images`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(img)
//       }
//       );

//       for(let i = 1; i <=4; i++){
//         if (spot['img'+i]){
//           let img = {};
//           img.url = spot['img'+i];
//           img.preview = false;
//           //console.log('attempting create ', 'img'+i, 'img'+i)
//           response = await csrfFetch(`/api/spots/${data.id}/images`,
//           {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(img)
//           }
//           );
//         }
//       }
//       //reload all spots.
//       getAllSpotsThunk()
//       return(data)
//     }

//   } else {
//   }

//   return response;
// };

// export const getAllSpotsThunk = () => async (dispatch) => {
//   const response = await csrfFetch("/api/spots");
//   //console.log('resp', response)

//   if (response.ok){
//     const data = await response.json();
//     //console.log('SPOTS THUNK data', data)
//     dispatch(getAllSpots(data.Spots));
//   } else {
//   }
//   return response;
// };


// export const getSpotDetailsThunk = (id) => async (dispatch) => {
//   const response = await csrfFetch(`/api/spots/${id}`);
//   //console.log('resp', response)

//   if (response.ok){
//     const data = await response.json();
//     //console.log('data for spotdets::', data)
//     //dispatch(getSpotDetails(data));

//     //now that we have pot data, get reviews for that spot.
//     const responseReviews = await csrfFetch(`/api/spots/${id}/reviews`);
//     if (responseReviews.ok){
//       const dataReviews = await responseReviews.json();
//       dispatch(getSpotDetails(data, dataReviews));
//     } else {
//       return responseReviews;
//     }
//   } else {
//     return response;
//   }
//   return response;
// };

//Get all Spots
// const initialState = { spots: null };
const initialState = { audiograms: null };

const audiogramsReducer = (state = initialState, action) => {
  let newState = structuredClone(state);
  switch (action.type) {
    case GET_AUDIOGRAMS:
      if (!newState.audiograms) newState.audiograms = {};
      action.payload.forEach(element => {
        newState.audiograms[element.id] = element
      });
      return newState;
    case EDIT_AUDIOGRAM:
      if (!newState.audiograms) newState.audiograms = {}
          newState.audiograms[action.payload.id] = action.payload;
      return newState;
    case ADD_AUDIOGRAM:
      if (!newState.audiograms) newState.audiograms = {}
      newState.audiograms[action.payload.audiogram.id] = action.payload;
      return newState;
    case DELETE_AUDIOGRAM:
      if (newState.audiograms && newState.audiograms[action.payload]) {
        delete newState.audiograms[action.payload];
      }
      return newState;

    // case ADD_REVIEW:
    //   if (!newState.spots) newState.spots = {};
    //   if (!newState.spots[action.spotId]) newState.spots[action.spotId] = {};
    //   if (!newState.spots[action.spotId].Reviews) newState.spots[action.spotId].Reviews = {};

    //   newState.spots[action.spotId].Reviews[action.payload.id] = action.payload;
    //   newState.spots[action.spotId].Reviews2 = action.payload;

    //   return newState;

    // case DELETE_REVIEW:
    //   //Sice reviews are nested in spots atm (they prob should be seperate store items)
    //   //need to find and delete whatever wherever review matches.
    //   if (newState.spots) {
    //     for (let spot in newState.spots){
    //       if (newState.spots[spot].Reviews && newState.spots[spot].Reviews[action.payload])
    //         delete newState.spots[spot].Reviews[action.payload];
    //     }
    //   }
    //   return newState;
    // case DELETE_SPOT:
    //   if (newState.spots && newState.spots[action.payload]) {
    //     delete newState.spots[action.payload];
    //   }
    //   return newState;
    // case ADD_SPOT:
    //   if (!newState.spots) newState.spots = {}
    //   newState.spots[action.payload.spot.id] = action.payload;
    //   return newState;
    // case EDIT_SPOT:
    //   if (!newState.spots) newState.spots = {}
    //       newState.spots[action.payload.id] = action.payload;
    //   return newState;
    // case GET_SPOTDETAILS:
    //   if (!newState.spots) newState.spots = {};
    //   newState.spots[action.payload.id] = action.payload;
    //   //console.log('act revs ===', action.reviews)

    //   //newState.spots[action.payload.id].Reviews = action.reviews.reviews.Reviews;
    //   //normalize reviews.
    //   if (!newState.spots[action.payload.id].Reviews)
    //     newState.spots[action.payload.id].Reviews = {};
    //   //newState.spots[action.payload.id].Reviews2 = action.reviews.reviews.Reviews;

    //   if (Array.isArray(action.reviews.reviews.Reviews)){
    //     action.reviews.reviews.Reviews.forEach(el => {
    //       newState.spots[action.payload.id].Reviews[el.id] = el;
    //     });
    //   }
    //   return newState;
    //   case GET_SPOTS:
    // case GET_SPOTSCURRENT:
    //   if (!newState.spots) newState.spots = {};
    //   action.payload.forEach(element => {
    //     newState.spots[element.id] = element
    //   });
    //   return newState;
    default:
      return state;
  }
};
// const Reducer = (state = initialState, action) => {
//   let newState = structuredClone(state);
//   switch (action.type) {
//     case ADD_REVIEW:
//       if (!newState.spots) newState.spots = {};
//       if (!newState.spots[action.spotId]) newState.spots[action.spotId] = {};
//       if (!newState.spots[action.spotId].Reviews) newState.spots[action.spotId].Reviews = {};

//       newState.spots[action.spotId].Reviews[action.payload.id] = action.payload;
//       newState.spots[action.spotId].Reviews2 = action.payload;

//       return newState;

//     case DELETE_REVIEW:
//       //Sice reviews are nested in spots atm (they prob should be seperate store items)
//       //need to find and delete whatever wherever review matches.
//       if (newState.spots) {
//         for (let spot in newState.spots){
//           if (newState.spots[spot].Reviews && newState.spots[spot].Reviews[action.payload])
//             delete newState.spots[spot].Reviews[action.payload];
//         }
//       }
//       return newState;
//     case DELETE_SPOT:
//       if (newState.spots && newState.spots[action.payload]) {
//         delete newState.spots[action.payload];
//       }
//       return newState;
//     case ADD_SPOT:
//       if (!newState.spots) newState.spots = {}
//       newState.spots[action.payload.spot.id] = action.payload;
//       return newState;
//     case EDIT_SPOT:
//       if (!newState.spots) newState.spots = {}
//           newState.spots[action.payload.id] = action.payload;
//       return newState;
//     case GET_SPOTDETAILS:
//       if (!newState.spots) newState.spots = {};
//       newState.spots[action.payload.id] = action.payload;
//       //console.log('act revs ===', action.reviews)

//       //newState.spots[action.payload.id].Reviews = action.reviews.reviews.Reviews;
//       //normalize reviews.
//       if (!newState.spots[action.payload.id].Reviews)
//         newState.spots[action.payload.id].Reviews = {};
//       //newState.spots[action.payload.id].Reviews2 = action.reviews.reviews.Reviews;

//       if (Array.isArray(action.reviews.reviews.Reviews)){
//         action.reviews.reviews.Reviews.forEach(el => {
//           newState.spots[action.payload.id].Reviews[el.id] = el;
//         });
//       }
//       return newState;
//       case GET_SPOTS:
//     case GET_SPOTSCURRENT:
//       if (!newState.spots) newState.spots = {};
//       action.payload.forEach(element => {
//         newState.spots[element.id] = element
//       });
//       return newState;
//     default:
//       return state;
//   }
// };

export default audiogramsReducer;
