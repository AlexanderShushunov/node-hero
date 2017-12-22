const {doQuery} =  require('./utils');

const USER_TABLE_NAME = 'users';
const COLUMNS = {
    name: 'name',
    age: 'age'
};

module.exports.add = ({name, age}) => doQuery(
    `INSERT INTO ${USER_TABLE_NAME} (${COLUMNS.name}, ${COLUMNS.age}) VALUES ($1, $2);`,
    name, age
);

module.exports.getAll = () => doQuery(
    `SELECT ${COLUMNS.name}, ${COLUMNS.age} FROM ${USER_TABLE_NAME};`
);
