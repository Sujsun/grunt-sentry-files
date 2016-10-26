/*
 * grunt-sentry-release
 * https://github.com/sundarasan/grunt-sentry-release
 *
 * Copyright (c) 2016 Sundarasan
 */

'use strict';
var grunt,
  request = require('request-promise'),
  fs = require('fs'),
  Promise = require('bluebird'),
  path = require('path');

/**
 * ---------------
 * Sentry API URLs
 * ---------------
 */
function SentryUrl (params) {
  params || (params = {});
  params.organisation && this.setOrganisationName(params.organisation);
  params.project && this.setProjectName(params.project);
  params.authorisationToken && this.setAuthorisationToken(params.authorisationToken);
  return this;
}

SentryUrl.prototype = {

  DOMAIN: 'sentry.io',

  API_VERSION: 0,

  setOrganisationName: function (organistaionName) {
    return (this._organisationName = organistaionName);
  },

  getOrganisationName: function () {
    return this._organisationName;
  },

  setProjectName: function (projectName) {
    return (this._projectName = projectName);
  },

  getProjectName: function () {
    return this._projectName;
  },

  setAuthorisationToken: function (authorisationToken) {
    return (this._authorisationToken = authorisationToken);
  },

  getAuthorisationToken: function () {
    return this._authorisationToken;
  },

  getAPIBaseUrl: function () {
    return 'https://' + this.DOMAIN + '/api/' + this.API_VERSION;
  },

  getProjectUrl: function () {
    return this.getAPIBaseUrl() + '/projects';
  },

  getReleaseUrl: function () {
    return this.getProjectUrl() + '/' + this.getOrganisationName() + '/' + this.getProjectName() + '/releases/';
  },

  getReleaseFilesUrl: function (releaseId) {
    return this.getReleaseUrl() + releaseId + '/files/';
  },

  getAuthorisationHeaders: function () {
    return {
      'Authorization': 'Bearer ' + this.getAuthorisationToken(),
    };
  },

};

/**
 * ------------------
 * Sentry API Helpers
 * ------------------
 */
function SentryUploader (params) {
  params || (params = {});
  Helpers.bindAll(this, 'uploadArtifact');
  this.artifacts = params.artifacts || [];
  this.releaseId = params.releaseId;
  this.sentryUrl = new SentryUrl(params);
  return this;
};

SentryUploader.prototype = {

  createReleaseAndUploadArtifacts: function () {
    var self = this;
    return this.createRelease(this.releaseId).then(function (releaseResponse) {
      self.releaseId = releaseResponse.version;
      grunt.log.writeln('ReleaseID: '.bold + '"' + self.releaseId + '"');
      return self.uploadArtifacts();
    });
  },

  createRelease: function (releaseId) {
    var self = this,
      headers = this.sentryUrl.getAuthorisationHeaders();
    headers['Content-Type'] = 'application/json';

    return request.post({
      uri: this.sentryUrl.getReleaseUrl(),
      headers: headers,
      body: { version: releaseId, },
      json: true,
    });
  },

  uploadArtifacts: function () {
    return Promise.each(this.artifacts, this.uploadArtifact);
  },

  uploadArtifact: function (artifactObject) {
    var self = this;
    grunt.log.writeln('UPLOADING: File: '.bold + '"' + artifactObject.file + '"');
    return request.post({
      url: this.sentryUrl.getReleaseFilesUrl(this.releaseId),
      headers: this.sentryUrl.getAuthorisationHeaders(),
      formData: {
        name: artifactObject.name,
        file: fs.createReadStream(path.resolve(process.cwd(), artifactObject.file)),
      },
      json: true,
    });
  },

};

/**
 * -------
 * Helpers
 * -------
 */
var Helpers = {

  /**
   * Binds the method with given context
   */
  bindAll: function () {
    var index,
      argumentsArray = Array.prototype.slice.apply(arguments),
      context = argumentsArray[0],
      functionName,
      functionNames = argumentsArray.slice(1);

    for (index in functionNames) {
      functionName = functionNames[index];
      if (typeof(context[functionName]) === 'function') {
        (function (context, functionName) {
          var actualFunction = context[functionName];
          if (actualFunction.bindContext !== context) {
            context[functionName] = function () {
              return actualFunction.apply(context, arguments);
            };
            context[functionName].bindContext = context;
          }
        })(context, functionName);
      } else {
        grunt.log.error('"' + functionName + '" is not a function');
      }
    }
  },

};


module.exports = function(gruntArg) {

  grunt = gruntArg;
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('sentry_release', 'Creates release and uploads artifacts to Sentry', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    var done = this.async(),
      sentryUploader;

    var params = {
      organisation: this.data.organisation,
      authorisationToken: this.data.authorisationToken,
      project: this.data.project,
      releaseId: this.data.releaseId,
      artifacts: this.data.artifacts,
    };

    sentryUploader = new SentryUploader(params);

    return sentryUploader.createReleaseAndUploadArtifacts().then(function () {
      done();
    }).catch(function (err) {
      done(err || new Error('Error while trying to create release and upload source maps.'));
    });

  });

};
