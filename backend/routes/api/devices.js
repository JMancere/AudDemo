const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth');

const { body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { stub } = require('../../utils/utils');
const { Device } = require('../../db/models');


 router.get('/all',
 async (req, res) => {
   let devices = await Device.findAll(
       {
        //  limit: size,
        //  offset: size * (page - 1),
        //  include: ['Reviews', 'SpotImages'],
       }
   );
   if (devices){
      //  const options = {previewImage: true, avgRating: true};
      //  calcPreviewAndAvgReview(spots, options);

      //  //Remove spotimages and reviews from resultset.
      //  spots.forEach(spot => {
      //      delete spot.dataValues.SpotImages
      //      delete spot.dataValues.Reviews
      //  });
   }
   const Devices = devices;
   return res.json({
       Devices,
   });
 }
)

//Delete a Device
//TODO dont allow delete of in use device.
router.delete('/:deviceId',
  async (req, res) => {
    const {deviceId} = req.params


    res.statusCode = 404


    if (deviceId === undefined){
        const err = new Error("Device couldn't be found");
        err.title = "Resource Not Found";
        err.status = 404;
        throw err;
    }

    let devices = await Device.findAll(
      {
          where: {id: deviceId},
      }
    );

    if (devices.length === 0){
      res.statusCode = 404
      return res.json({
        "message": "Device couldn't be found"
      })
    }

    const device = devices[0]

    await device.destroy();

    return res.json(
      {
        message: "Successfully deleted"
    });
  }
);

const validateDeviceEdit = [
  //const {, , , , , name, description, price} = req.body
  body('deviceName')
    .optional()
    .exists({ checkFalsy: true })
    .withMessage('Name is required'),
  body('volume')
    .optional()
    .isInt()
    .custom(i => {
    return (i > 0 && i <= 120)
  })
  .withMessage("Volume must be an integer from 0 to 120"),
  handleValidationErrors
];
//Edit a Device
router.put('/:deviceId', validateDeviceEdit,
  async (req, res) => {
    const {deviceId} = req.params
    if (deviceId === undefined){
      const err = new Error("Device couldn't be found");
      err.title = "Resource Not Found";
      err.status = 404;
      throw err;
    }

    let devices = await Device.findAll(
        {
            where: {id: deviceId},
        }
    );

    if (!devices || devices.length === 0){
        const err = new Error("Device couldn't be found");
        err.title = "Resource Not Found";
        err.status = 404;
        throw err;
    }
    const device_ = devices[0]

    const {deviceName, volume} = req.body
    if (deviceName) device_.deviceName = deviceName;
    if (volume) device_.volume = volume;
    await device_.save();

    return res.json(device_);
  }
);

const validateDeviceCreate = [
  body('deviceName')
      .exists({ checkFalsy: true })
      .withMessage('Name text is required'),
  body('volume')
      .isInt()
      .custom(i => {
      return (i > 0 && i <= 120)
  })
  .withMessage("Volume must be an integer from 1 to 120"),
  handleValidationErrors
];
//REQ AUTH - Create a Device
router.post('/', validateDeviceCreate,
  async (req, res) => {

    const {deviceName, volume} = req.body
    const device = await Device.create({
      deviceName, volume
    })

    res.statusCode = 201;
    return res.json(device);
  }
);



module.exports = router;
