const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth');

const { body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { stub } = require('../../utils/utils');
const { Fitting } = require('../../db/models');


const validateCreate = [
    body('fitName')
    .exists({ checkFalsy: true })
    .withMessage('Name is required'),
  body('audiogramId')
    .optional({ checkFalsy: true })
    .isInt(),
  body('deviceId')
    .optional({ checkFalsy: true })
    .isInt(),
  body('userId')
    .optional({ checkFalsy: true })
    .isInt(),
    handleValidationErrors
  ];
//REQ AUTH - Create a Fitting
router.post('/', requireAuth, validateCreate,
  async (req, res) => {

    const {fitName, audiogramId, deviceId} = req.body
    const fitting = await Fitting.create({
      fitName, audiogramId, deviceId, userId: req.user.id,
      })

    res.statusCode = 201;
    return res.json(fitting);
    //return res.json({spot});
   }
);

//List all audiograms for current user
router.get('/', requireAuth,
    async (req, res) => {
        let fittings = await Fitting.findAll(
            {
                where: {userId: req.user.id},
            }
        );
        const Fittings = audiograms;
        return res.json({
            Fittings
        });
    }
);
///
const validateEdit = [
  body('fitName')
  .exists({ checkFalsy: true })
  .withMessage('Name is required'),
  handleValidationErrors
];
//REQ AUTH - Edit a audiogram
router.put('/:fittingId', requireAuth, validateEdit,
  async (req, res) => {
    const {fittingId} = req.params

    if (fittingId === undefined){
        const err = new Error("Fitting couldn't be found");
        err.title = "Resource Not Found";
        err.status = 404;
        throw err;
    }

    let fittings = await Fitting.findAll(
        {
            where: {id: fittingId},
        }
    );

    if (!fittings || fittings.length === 0){
        const err = new Error("Fitting couldn't be found");
        err.title = "Resource Not Found";
        err.status = 404;
        throw err;
    }
    const fitting = fittings[0]

    if (fitting.dataValues.userId !== req.user.id) {
      const err = new Error("Forbidden");
      err.title = "Resource Not Found";
      err.status = 403;
      throw err;
    }

    const {fitName} = req.body
    if (fitName) audiogram.fitName = fitName;
    await fitting.save();

    return res.json(fitting);
  }
);

//REQ AUTH - Delete a fitting
router.delete('/:fittingId', requireAuth,
  async (req, res) => {
    const {fittingId} = req.params

    if (fittingId === undefined){
        const err = new Error("Fitting couldn't be found");
        err.title = "Resource Not Found";
        err.status = 404;
        throw err;
    }

    let fittings = await Fitting.findAll(
        {
            where: {id: audiogramId},
        }
    );

    if (!fittings || fittings.length === 0){
        const err = new Error("Fitting couldn't be found");
        err.title = "Resource Not Found";
        err.status = 404;
        throw err;
    }
    const fitting = fittings[0]

    if (fitting.dataValues.userId !== req.user.id) {
      const err = new Error("Forbidden");
      err.title = "Resource Not Found";
      err.status = 403;
      throw err;
    }

    await fitting.destroy();

    return res.json(
      {
        message: "Successfully deleted"
    });
  }
);


module.exports = router;
