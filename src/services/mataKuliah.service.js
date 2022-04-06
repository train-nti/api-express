const httpStatus = require('http-status');
const { MataKuliah } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a mata kuliah
 * @param {Object} mataKuliahBody
 * @returns {Promise<MataKuliah>}
 */
const createMataKuliah = async (mataKuliahBody) => {
  if (await MataKuliah.isCodeExist(mataKuliahBody.code)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Code already taken');
  }
  return MataKuliah.create(mataKuliahBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMataKuliah = async (filter, options) => {
  const mataKuliahs = await MataKuliah.paginate(filter, options);
  return mataKuliahs;
};

const getAllMataKuliah = async () => {
  return MataKuliah.find({});
};

/**
 * Get mata kuliah by id
 * @param {ObjectId} id
 * @returns {Promise<MataKuliah>}
 */
const getMataKuliahById = async (id) => {
  return MataKuliah.findById(id);
};

/**
 * Get mata kuliah by code
 * @param {string} code
 * @returns {Promise<MataKuliah>}
 */
const getMataKuliahByCode = async (mataKuliahCode) => {
  return MataKuliah.findOne({ code: mataKuliahCode });
};

/**
 * Update mata kuliah by code
 * @param {ObjectId} mataKuliahCode
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateMataKuliahByCode = async (mataKuliahCode, updateBody) => {
  const mataKuliah = await getMataKuliahByCode(mataKuliahCode);
  if (!mataKuliah) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mata Kuliah not found');
  }
  if (updateBody.code && (await MataKuliah.isCodeExist(updateBody.code, mataKuliahCode))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Code already used');
  }
  Object.assign(mataKuliah, updateBody);
  await mataKuliah.save();
  return mataKuliah;
};

/**
 * Delete mata kuliah by code
 * @param {ObjectId} code
 * @returns {Promise<MataKuliah>}
 */
const deleteMataKuliahByCode = async (code) => {
  const mataKuliah = await getMataKuliahByCode(code);
  if (!mataKuliah) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mata Kuliah not found');
  }
  await mataKuliah.remove();
  return mataKuliah;
};

module.exports = {
  createMataKuliah,
  queryMataKuliah,
  getAllMataKuliah,
  getMataKuliahById,
  getMataKuliahByCode,
  updateMataKuliahByCode,
  deleteMataKuliahByCode,
};
