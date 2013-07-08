module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

	'amd-dist': {
		all: {
			options: {
				standalone: true, // remove r.js dependency via almond
				env: 'browser', // node or browser
				//exports: 'deferreds', // XXX: ???
			},
			//Grunt files configuration object for which to trace dependencies
			//(more: http://gruntjs.com/configuring-tasks)
			files: [{
				src: 'src/*js',
				dest: 'dist/output.js'
			}],
		},
	},
	requirejs: {
		//out: './src',
		optimize: 'none',
		//appDir: '.',
		baseUrl: './src',
		out: 'leadstep.out.js',
		mainConfigFile: './src/main.js',
		name: 'main',
		keepBuildDir: true,
		useStrict: true,
		removeCombined: false, // don't delete files!
		skipModuleInsertion: true,
		findNestedDependencies: true, // XXX: ???
		preserveLicenseComments: false, // XXX: ???
		logLevel: 0, // XXX: ???
		locale: 'en-us',  // XXX: ???
		//optimizeCss: 'standard',
		/*paths: {
			'deferreds': 'src',
			'mout': 'lib/mout',
			'signals': 'lib/signals',
			'setimmediate': 'lib/setImmediate'
		},
		shim: {
			setImmediate: {
				exports: 'setImmediate'
			}
		},*/
	},

  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-amd-dist');

  grunt.registerTask('default', ['amd-dist']);
  //grunt.registerTask('build', ['amd-dist']);
  //grunt.registerTask('test', ['todo1', 'todo2']);
};
