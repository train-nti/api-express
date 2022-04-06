const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers', 'getMataKuliah', 'manageMataKuliah'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
