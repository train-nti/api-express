const mongoose = require('mongoose');
// const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const mataKuliahSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    semester: {
      type: Number,
      default: 1,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
mataKuliahSchema.plugin(toJSON);
mataKuliahSchema.plugin(paginate);


/**
 * Check if mata kuliah code exist 
 * @param {string} mataKuliah - Kode Mata Kuliah
 * @returns {Promise<boolean>}
 */
mataKuliahSchema.statics.isCodeExist = async function (code) {
  const mataKuliah = await this.findOne({ code });
  return !!mataKuliah;
};

/**
 * @typedef User
 */
const MataKuliah = mongoose.model('MataKuliah', mataKuliahSchema);

module.exports = MataKuliah;
