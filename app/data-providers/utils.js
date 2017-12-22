const {Client} = require('pg');

const endQuietly = (client) => {
    try {
        client.end();
    } catch (err) {
        // do nothing
    }
};

module.exports.doQuery = async function (query, ...params) {
    const client = new Client();

    try {
        await client.connect();
    } catch (err) {
        console.log(err);
        throw Error('can not connect to DB');
    }

    try {
        const res = await client.query(query, params);
        return res.rows;
    } catch (err) {
        console.log(err);
        throw Error('query is failed');
    } finally {
        endQuietly(client);
    }
};
