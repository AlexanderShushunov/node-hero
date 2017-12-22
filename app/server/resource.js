module.exports.resource = (expressApp, dataProvider, name) => {

    expressApp.get(`/${name}`, async (request, response, next) => {
        try {
            const users = await dataProvider.getAll();
            response.json(users);
        } catch (err) {
            next(err);
        }
    });

    expressApp.post(`/${name}`, async ({body}, response, next) => {
        try {
            await dataProvider.add(body);
            response.sendStatus(200);
        } catch (err) {
            next(err);
        }
    });
};
