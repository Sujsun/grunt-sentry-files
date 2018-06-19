# About this fork
This fork only introduces an additional parameter "domain" making the plugin usable for self-hosted sentry.
Also a new parameter "tryToDeleteReleaseFirst" is introduced, tryiing to delete existing release first before creating new one (when your release id is not unique by build)

# grunt-sentry-files [![Build Status](https://travis-ci.org/Sujsun/grunt-sentry-files.svg?branch=master)](https://travis-ci.org/Sujsun/grunt-sentry-files)

> Creates release and uploads artifacts to Sentry

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sentry-files --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sentry-files');
```

## The "sentry_files" task

### Overview
In your project's Gruntfile, add a section named `sentry_files` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({

  sentry_files: {
    dist: {
      organisation: '<Organisation Name>',
      authorisationToken: '<AuthorisationToken>',
      project: '<Project Name>',
      releaseId: '<Release ID/Version>',
      files: [
        {
          file: '<File Path>',
          name: '<File Mapping Path>',
        },
        {
          file: '<File Path>',
          name: '<File Mapping Path>',
        },
      ],
      /**
       * Optional parameters
       */
      refs: [{
        repository: 'my-repo',
        commit: '2da95dfb052f477380608d59d32b4ab9',
      }],
      projects:[
        'my-project',
        'my-other-project',
      ],
    }
  }
  
});
```

Find more information [here](https://docs.sentry.io/api/releases/post-release-files/)

### Parameters

**organisation** _[String]_ - Sentry Organisation Slug.  
**authorisationToken** _[String]_ - Sentry Organisation Authorisation Token. (Go to https://sentry.io/api/ to create)  
**project** _[String]_ – Sentry Project Slug.  
**releaseId** _[String]_ – Release Identifier/Version.  
#### Optional Parameters:
**refs** _[Object[]]_ - Object with repository and commit information (https://blog.sentry.io/2017/05/01/release-commits.html).  
**projects** _[String[]]_ - Name of projects in Sentry.
**domain** _[String]_ - Custom domain for selfhosted Sentry instance (sentry.io is used by default)
**tryToDeleteReleaseFirst** _[Boolean] - When set to true, tries do delete the release with releaseId first, so you can update one release if your release id is not unique by build

### Contributors
- [Sundarasan Natarajan](https://github.com/sundarasan)
- [Moisesrodriguez](https://github.com/moisesrodriguez)
- [JanST123](https://github.com/JanST123)
