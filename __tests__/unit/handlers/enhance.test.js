require('dotenv').config()
const lambda = require('../../../src/modules/commands/enhance');

describe('Test for enhance', function () {

    it('Verifies successful response', async () => {
        const result = await lambda.action({data: {options: [{name:"text", value: "Happy berthday Dad"}, {name:"instruction", value: "Fix my spelling"}]}})
        const { content } = result
        console.log(content)
        expect(content).toMatch(/Happy birthday/)
    });
});
