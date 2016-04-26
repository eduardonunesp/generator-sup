'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-sup:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({projectName: 'testProject'})
      .withPrompts({createLocalhost: true})
      .withPrompts({devHost: '192.168.99.100'})
      .withPrompts({stageHost: '192.168.99.101'})
      .withPrompts({productionHost: '192.168.99.102'})
      .withPrompts({commandsList: ['ping', 'upload', 'run']})
      .withPrompts({targetsList: ['deploy']})
      .withPrompts({dockerImage: 'node:6'})
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'Supfile'
    ]);
  });
});
