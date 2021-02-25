/*
 * Copyright 2016, 2017, 2018 Uppsala University Library
 *
 * This file is part of Cora.
 *
 *     Cora is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     Cora is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with Cora.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
module.exports = function(config) {
	var base_config = {
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath : '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks : [ 'qunit' ],

		// list of files / patterns to load in the browser
		files : [ 'src/main/webapp/script/**/*.js', 'src/main/webapp/css/**/*.css',
				'src/test/script/**/*.js', {
					pattern : 'src/main/webapp/**/*.svg',
					watched : false,
					included : false,
					served : true
				}, {
					pattern : 'src/main/webapp/**/*.png',
					watched : false,
					included : false,
					served : true
				}, {
					pattern : 'src/main/webapp/**/*.gif',
					watched : false,
					included : false,
					served : true
				}, {
					pattern : 'src/main/webapp/**/*.woff2',
					watched : false,
					included : false,
					served : true
				}

		],

		// list of files to exclude
		exclude : ['src/main/webapp/css/student-1.css','src/main/webapp/css/student-2.css','src/main/webapp/css/student-3.css'],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors : {
			'src/main/webapp/script/*.js' : [ 'coverage' ],
			'src/main/webapp/script/!(lib)/**/*.js' : [ 'coverage' ]
		},

		coverageReporter : {
			type : 'lcov',
			dir : 'reports/coverage',
			subdir : function(browser) {
				return browser.toLowerCase().split(/[ /-]/)[0];
			}
		},

		junitReporter : {
			outputFile : 'reports/tests/karma-junit.xml',
			useBrowserName : false,
			suite : ''
		},

		customLaunchers : {
			FirefoxHeadless : {
				base : 'Firefox',
				flags : [ '-headless' ]
			},
			ChromiumHeadless : {
				base : 'Chromium',
				flags : [ '-no-sandbox', '-headless', '-remote-debugging-port=9222', '-disable-dev-shm-usage' ]
			}
		},

		// web server port
		port : 39876,

		// enable / disable colors in the output (reporters and logs)
		colors : true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN ||
		// config.LOG_INFO || config.LOG_DEBUG
		logLevel : config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch : true,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency : Infinity
	};

	base_config.singleRun = config.singleRun;
	base_config.browsers = config.browsers;
	base_config.reporters = config.reporters;
	return base_config;
};
