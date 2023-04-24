const Repair = require('./repairs.model');
const User = require('./users.model');

const initModel = () => {};

//1 User <---> N Repair
User.hasMany(Repair, { foreignKey: 'userId' });
Repair.belongsTo(User, { foreignKey: 'userId' });

module.exports = initModel;
