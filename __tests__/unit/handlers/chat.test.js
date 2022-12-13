require('dotenv').config()
const lambda = require('../../../src/modules/commands/chat');

describe('Test for chat', function () {

    it('Verifies successful response', async () => {
        const result = await lambda.action()
        const { content } = result
        console.log(content)
        expect(content).toMatch(/(hello|hi)/i)
    });
});
