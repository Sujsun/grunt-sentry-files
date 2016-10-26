# grunt-sentry-release

> Creates release and uploads artifacts to Sentry

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sentry-release --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sentry-release');
```

## The "sentry_release" task

### Overview
In your project's Gruntfile, add a section named `sentry_release` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({

  sentry_release: {
    dist: {
      organisation: '<Organisation Name>',
      authorisationToken: '<AuthorisationToken>',
      project: '<Project Name>',
      releaseId: '<Release ID/Version>',
      artifacts: [
        {
          file: '<File Path>',
          name: '<File Mapping Path>',
        },
        {
          file: '<File Path>',
          name: '<File Mapping Path>',
        },
      ],
    },
  }
  
});
```

Find more information [here](https://docs.sentry.io/api/releases/post-release-files/)

### Parameters

organisation [String] – Sentry Organisation Slug.
authorisationToken [String] - Sentry Organisation Authorisation Token. (Go to https://sentry.io/api/ to create)
project [String] – Sentry Project Slug.
releaseId (string) – Release Identifier/Version.

### Contributors
[Sundarasan Natarajan](https://www.facebook.com/s.n.sundarasan)
