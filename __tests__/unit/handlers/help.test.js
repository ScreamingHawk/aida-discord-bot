require('dotenv').config()
const fs = require('fs');
const path = require('path');

const lambda = require('../../../src/modules/commands/help');

// Load command list
const modulesPath = path.join(__dirname, '..', '..', '..', 'src', 'modules')
const modules = fs.readdirSync(modulesPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
const commands = modules.flatMap(m => fs.readdirSync(`${modulesPath}/${m}`))

describe('Test for help', function () {
    it('Verifies each command has a help message', async () => {
        const result = await lambda.action()
        const { embeds } = result
        expect(embeds[0].fields.length).toEqual(commands.length - 1)
    });
});
