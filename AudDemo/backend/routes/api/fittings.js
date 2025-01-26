const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth');

const { body } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { stub } = require('../../utils/utils');
const { Fitting } = require('../../db/models');




module.exports = router;
