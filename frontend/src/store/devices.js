import { csrfFetch } from "./csrf";

const GET_DEVICES = "devices/getAll";
 const ADD_DEVICE = 'devices/addDevice';
 const EDIT_DEVICE = 'devices/editDevice';
 const DELETE_DEVICE = 'devices/deleteDevice';

const deleteDevice = (deviceID) => {
  return {
    type: DELETE_DEVICE,
    payload: deviceID
  };
}

const editDevice = (device) => {
  return {
    type: EDIT_DEVICE,
    payload: device
  };
}


const getAllDevices = (devices) => {
  return {
    type: GET_DEVICES,
    payload: devices,
  };
};
export const getAllDevicesThunk = () => async (dispatch) => {
  const response = await csrfFetch("/api/devices");

  if (response.ok){
    const data = await response.json();
    console.log('Auds THUNK data', data)
    dispatch(getAllDevices(data.Devices));
  } else {
  }
  return response;
};

export const updateDeviceThunk = (device) => async (dispatch) => {

  let response;
  response = await csrfFetch(`/api/devices/${device.id}`,
    {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(device)
    }
  );
  if (response.ok){
    const data = await response.json();
    //console.log('SPOTS THUNK data', data)
    dispatch(editDevice(data));
  } else {
  }
  return response;

}

const addDevice = (device) => {
  return {
    type: ADD_DEVICE,
    payload: {device},
  };
}

export const createDeviceThunk = (device) => async (dispatch) => {
  //console.log('CREATING SPOT:::', spot);

  let response;
  response = await csrfFetch("/api/devices/",
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(device)
    }
  );

  if (response.ok){
    const data = await response.json();
    dispatch(addDevice(data));
    //console.log('adadaddadad', data)
  } else {
  }

  return response;
};

export const deleteDeviceThunk = (deviceId) => async (dispatch) => {
  //console.log('Deleting SPOT:::', spotId);

  let response;
  response = await csrfFetch(`/api/devices/${deviceId}`,
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
    dispatch(deleteDevice(deviceId));
  } else {
  }
  return response;
}

const initialState = { devices: null };

const devicesReducer = (state = initialState, action) => {
  let newState = structuredClone(state);
  switch (action.type) {
    case GET_DEVICES:
      if (!newState.devices) newState.devices = {};
      action.payload.forEach(element => {
        newState.devices[element.id] = element
      });
      return newState;
    case EDIT_DEVICE:
      if (!newState.devices) newState.devices = {}
          newState.devices[action.payload.id] = action.payload;
      return newState;
    case ADD_DEVICE:
      if (!newState.devices) newState.devices = {}
      newState.devices[action.payload.device.id] = action.payload;
      return newState;
    case DELETE_DEVICE:
      if (newState.devices && newState.devices[action.payload]) {
        delete newState.devices[action.payload];
      }
      return newState;

    default:
      return state;
  }
};

export default devicesReducer;
