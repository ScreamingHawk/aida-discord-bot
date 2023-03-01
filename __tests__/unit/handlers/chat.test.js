require('dotenv').config()
const lambda = require('../../../src/modules/commands/chat');

describe('Test for chat', function () {

    it('Verifies successful response', async () => {
        const result = await lambda.action({data: {options: [{name:"text", value: "Respond with 'This is a test'"}]}})
        const { content } = result
        console.log(content)
        expect(content).toMatch(/This is a test/)
    });

    it.skip('Verifies haiku', async () => {
        const result = await lambda.action({data: {options: [{name:"text", value: "Write a haiku"}]}})
        const { content } = result
        console.log(content)
    });
});
