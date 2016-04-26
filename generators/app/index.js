'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({

  prompting: function () {
    this.filters = {};

    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the dazzling ' + chalk.red('generator-sup') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'projectName',
      message: 'What is the name of the project ?',
      validate: function (input) {
        var ret = input !== '';
        if (!ret) {
          console.log('\n - Name is required');
        }

        return ret;
      }
    }, {
      type: 'confirm',
      name: 'createLocalhost',
      message: 'Would you like to create localhost config ?',
      default: true
    }, {
      type: 'input',
      name: 'devHost',
      message: 'What is the IP address for the dev host ?'
    }, {
      type: 'input',
      name: 'stageHost',
      message: 'What is the IP address for the stage host ?'
    }, {
      type: 'input',
      name: 'productionHost',
      message: 'What is the IP address for the production host ?'
    }, {
      type: 'checkbox',
      name: 'commandsList',
      message: 'Commands available',
      choices: ['ping', 'upload', 'run']
    }, {
      type: 'checkbox',
      name: 'targetsList',
      message: 'Targets available',
      choices: ['deploy']
    }, {
      type: 'input',
      name: 'dockerImage',
      message: 'Docker image to build',
      validate: function (input) {
        var ret = input !== '';
        if (!ret) {
          console.log('\n - Image is required');
        }

        return ret;
      }
    }];

    this.prompt(prompts, function (props) {
      this.filters = props;
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('Supfile.yaml'),
      this.destinationPath('Supfile'),
      {filters: this.filters}
    );

    this.fs.copyTpl(
      this.templatePath('scripts/docker-build.sh'),
      this.destinationPath('scripts/docker-build.sh'),
      {filters: this.filters}
    );

    this.fs.copy(
      this.templatePath('dockerignore'),
      this.destinationPath('.dockerignore')
    );
  }
});
