const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth');

const { body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { stub } = require('../../utils/utils');
const { Audiogram } = require('../../db/models');

const validateCreate = [
    body('f250')
        .optional({ checkFalsy: true })
        .isInt()
        .custom(db => {
            return (db >= -10 && db <= 120)
    })
    .withMessage('dB must be between -10 and 120'),
    body('f500')
        .optional({ checkFalsy: true })
        .isInt()
        .custom(db => {
            return (db >= -10 && db <= 120)
    })
    .withMessage('dB must be between -10 and 120'),
    body('f750')
        .optional({ checkFalsy: true })
        .isInt()
        .custom(db => {
            return (db >= -10 && db <= 120)
    })
    .withMessage('dB must be between -10 and 120'),
    body('f1000')
        .optional({ checkFalsy: true })
        .isInt()
        .custom(db => {
            return (db >= -10 && db <= 120)
    })
    .withMessage('dB must be between -10 and 120'),
    body('f1500')
        .optional({ checkFalsy: true })
        .isInt()
        .custom(db => {
            return (db >= -10 && db <= 120)
    })
    .withMessage('dB must be between -10 and 120'),
    body('2000')
        .optional({ checkFalsy: true })
        .isInt()
        .custom(db => {
            return (db >= -10 && db <= 120)
    })
    .withMessage('dB must be between -10 and 120'),
    body('f3000')
        .optional({ checkFalsy: true })
        .isInt()
        .custom(db => {
            return (db >= -10 && db <= 120)
    })
    .withMessage('dB must be between -10 and 120'),
    body('f4000')
        .optional({ checkFalsy: true })
        .isInt()
        .custom(db => {
            return (db >= -10 && db <= 120)
    })
    .withMessage('dB must be between -10 and 120'),
    body('f6000')
        .optional({ checkFalsy: true })
        .isInt()
        .custom(db => {
            return (db >= -10 && db <= 120)
    })
    .withMessage('dB must be between -10 and 120'),
    body('8000')
        .optional({ checkFalsy: true })
        .isInt()
        .custom(db => {
            return (db >= -10 && db <= 120)
    })
    .withMessage('dB must be between -10 and 120'),
    handleValidationErrors
  ];
//REQ AUTH - Create a Audiogram
router.post('/', requireAuth, validateCreate,
    async (req, res) => {

    const {f250, f500, f750, f1000, f1500, f2000, f3000, f4000, f6000, f8000} = req.body
    const audiogram = await Audiogram.create({
      f250, f500, f750, f1000, f1500, f2000, f3000, f4000, f6000, f8000, userId: req.user.id,
      })

//      const spot = (await Model.create(modelObject)).get({plain:true})
    //Created.
    res.statusCode = 201;
    return res.json(audiogram);
    //return res.json({spot});
   }
);

//List all audiograms for current user
router.get('/', requireAuth,
    async (req, res) => {
        let audiograms = await Audiogram.findAll(
            {
                where: {userId: req.user.id},
                //include: ['Reviews', 'SpotImages', 'User']
                // include: ['Reviews', 'SpotImages']
            }
        );

        // if (audiograms){
        //     const options = {previewImage: true, avgRating: true};
        //     calcPreviewAndAvgReview(spots, options);

        //     //Remove spotimages and reviews from resultset.
        //     spots.forEach(spot => {
        //         delete spot.dataValues.SpotImages
        //         delete spot.dataValues.Reviews
        //     });
        // }
        const Audiograms = audiograms;
        return res.json({
            Audiograms
        });
    }
);
///
const validateEdit = [
  body('f250')
    .optional({ checkFalsy: true })
    .isInt()
    .custom(db => {
        return (db >= -10 && db <= 120)
  })
  .withMessage('dB must be between -10 and 120'),
  body('f500')
    .optional({ checkFalsy: true })
    .isInt()
    .custom(db => {
        return (db >= -10 && db <= 120)
  })
  .withMessage('dB must be between -10 and 120'),
  body('f750')
    .optional({ checkFalsy: true })
    .isInt()
    .custom(db => {
        return (db >= -10 && db <= 120)
  })
  .withMessage('dB must be between -10 and 120'),
  body('f1000')
    .optional({ checkFalsy: true })
    .isInt()
    .custom(db => {
        return (db >= -10 && db <= 120)
  })
  .withMessage('dB must be between -10 and 120'),
  body('f1500')
    .optional({ checkFalsy: true })
    .isInt()
    .custom(db => {
        return (db >= -10 && db <= 120)
  })
  .withMessage('dB must be between -10 and 120'),
  body('2000')
    .optional({ checkFalsy: true })
    .isInt()
    .custom(db => {
        return (db >= -10 && db <= 120)
  })
  .withMessage('dB must be between -10 and 120'),
  body('f3000')
    .optional({ checkFalsy: true })
    .isInt()
    .custom(db => {
        return (db >= -10 && db <= 120)
  })
  .withMessage('dB must be between -10 and 120'),
  body('f4000')
    .optional({ checkFalsy: true })
    .isInt()
    .custom(db => {
        return (db >= -10 && db <= 120)
  })
  .withMessage('dB must be between -10 and 120'),
  body('f6000')
    .optional({ checkFalsy: true })
    .isInt()
    .custom(db => {
        return (db >= -10 && db <= 120)
  })
  .withMessage('dB must be between -10 and 120'),
  body('8000')
    .optional({ checkFalsy: true })
    .isInt()
    .custom(db => {
        return (db >= -10 && db <= 120)
  })
  .withMessage('dB must be between -10 and 120'),
handleValidationErrors
];
//REQ AUTH - Edit a audiogram
router.put('/:audiogramId', requireAuth, validateEdit,
  async (req, res) => {
    const {audiogramId} = req.params

    if (audiogramId === undefined){
        const err = new Error("Audiogram couldn't be found");
        err.title = "Resource Not Found";
        err.status = 404;
        throw err;
    }

    let audiograms = await Audiogram.findAll(
        {
            where: {id: audiogramId},
        }
    );

    if (!audiograms || audiograms.length === 0){
        const err = new Error("Audiogram couldn't be found");
        err.title = "Resource Not Found";
        err.status = 404;
        throw err;
    }
    const audiogram = audiograms[0]

    if (audiogram.dataValues.userId !== req.user.id) {
      const err = new Error("Forbidden");
      err.title = "Resource Not Found";
      err.status = 403;
      throw err;
    }

    const {f250, f500, f750, f1000, f1500, f2000, f3000, f4000, f6000, f8000} = req.body
    if (f250) audiogram.f250 = f250;
    if (f500) audiogram.f500 = f500;
    if (f750) audiogram.f750 = f750;
    if (f1000) audiogram.f1000 = f1000;
    if (f1500) audiogram.f1500 = f1500;
    if (f2000) audiogram.f2000 = f2000;
    if (f3000) audiogram.f3000 = f3000;
    if (f4000) audiogram.f4000 = f4000;
    if (f6000) audiogram.f6000 = f6000;
    if (f8000) audiogram.f8000 = f8000;
    await audiogram.save();

    return res.json(audiogram);
  }
);

//REQ AUTH - Delete a audiogram
router.delete('/:audiogramId', requireAuth,
  async (req, res) => {
    const {audiogramId} = req.params

    if (audiogramId === undefined){
        const err = new Error("Audiogram couldn't be found");
        err.title = "Resource Not Found";
        err.status = 404;
        throw err;
    }

    let audiograms = await Audiogram.findAll(
        {
            where: {id: audiogramId},
        }
    );

    if (!audiograms || audiograms.length === 0){
        const err = new Error("Audiogram couldn't be found");
        err.title = "Resource Not Found";
        err.status = 404;
        throw err;
    }
    const audiogram = audiograms[0]

    if (audiogram.dataValues.userId !== req.user.id) {
      const err = new Error("Forbidden");
      err.title = "Resource Not Found";
      err.status = 403;
      throw err;
    }

    await audiogram.destroy();

    return res.json(
      {
        message: "Successfully deleted"
    });
  }
);


module.exports = router;
