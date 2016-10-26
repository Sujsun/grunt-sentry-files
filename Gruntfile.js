/*
 * grunt-sentry-files
 * https://github.com/sundarasan/grunt-sentry-release
 *
 * Copyright (c) 2016 Sundarasan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var buildId = new Date().getTime();

  // Project configuration.
  grunt.initConfig({

    buildId: buildId,

    // Configuration to be run (and then tested).
    sentry_release: {

      one: {
        organisation: 'sundarasan',
        authorisationToken: 'b870d2fc440c4c5ba4e2f504fd96e6ce4e683f1500d24fb4a50035a2c4c3b47d',
        project: 'test-project',
        releaseId: '<%= buildId %>',
        artifacts: [
          {
            file: 'test/artifacts/sample1.js',
            name: '~/js/sample1.js',
          },
          {
            file: 'test/artifacts/sample1.js.map',
            name: '~/js/sample1.js.map',
          },
        ],
      },

    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.registerTask('test', ['sentry_release']);
  grunt.registerTask('default', ['test']);

};
