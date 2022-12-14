require('dotenv').config()
const lambda = require('../../../src/modules/commands/help');

describe('Test for help', function () {

    it('Verifies successful response', async () => {
        const result = await lambda.action()
        const { embeds } = result
        expect(embeds[0].fields.length).toEqual(1)
    });
});
