const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMataKuliah = {
  body: Joi.object().keys({
    code: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

const queryMataKuliah = {
  query: Joi.object().keys({
    code: Joi.string(),
    name: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getAllMataKuliah = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMataKuliahByCode = {
  params: Joi.object().keys({
    code: Joi.string(),
  }),
};

const updateMataKuliah = {
  params: Joi.object().keys({
    code: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      semester: Joi.number().integer(),
      isOpen: Joi.boolean(),
    })
    .min(1),
};

const deleteMataKuliah= {
  params: Joi.object().keys({
    code: Joi.string(),
  }),
};

module.exports = {
  createMataKuliah,
  queryMataKuliah,
  getAllMataKuliah,
  getMataKuliahByCode,
  updateMataKuliah,
  deleteMataKuliah,
};
