const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { mataKuliahService } = require('../services');

const createMataKuliah = catchAsync(async (req, res) => {
  const mataKuliah = await mataKuliahService.createMataKuliah(req.body);
  res.status(httpStatus.CREATED).send(mataKuliah);
});

const getMataKuliahs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['code', 'name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await mataKuliahService.queryMataKuliah(filter, options);
  res.send(result);
});

const getAllMataKuliah = catchAsync(async (req, res) => {
  const result = await mataKuliahService.getAllMataKuliah();
  res.send(result);
});

const getMataKuliahByCode = catchAsync(async (req, res) => {
  const mataKuliah = await mataKuliahService.getMataKuliahByCode(req.params.code);
  if (!mataKuliah) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mata Kuliah not found');
  }
  res.send(mataKuliah);
});

const updateMataKuliah = catchAsync(async (req, res) => {
  const mataKuliah = await mataKuliahService.updateMataKuliahByCode(req.params.code, req.body);
  res.send(mataKuliah);
});

const deleteMataKuliah = catchAsync(async (req, res) => {
  await mataKuliahService.deleteMataKuliahByCode(req.params.code);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMataKuliah,
  getMataKuliahs,
  getAllMataKuliah,
  getMataKuliahByCode,
  updateMataKuliah,
  deleteMataKuliah,
};
