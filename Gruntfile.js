module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

 	concat: {
		options: {
			separator: '',
		},
		dist: {
        	//src: '<%= meta.folders.js %>**/*.js',
        	//dest: '<%= meta.folders.js %>page.js',
        	src: 'src2/*.js',
			dest: 'outputASDDFDF.js',
   		},
	},
  	/*library: {
		options: {
			//source: 'src2/',
  			//destination: 'output/',
  			//builder_dir: 'build/',
			// Task-specific options go here
		},
  		leadstep: {
			builder: 'build.js', // XXX: ???
			src: 'src2/',
			dest: 'output/',
			version: '0.0.1',
		},
	},*/

  });
	/*'amd-dist': {
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
	},*/

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  //grunt.loadNpmTasks('grunt-amd-dist');
  //grunt.loadNpmTasks('grunt-library');
  grunt.loadNpmTasks('grunt-neuter');

  //grunt.registerTask('default', ['concat']);
  grunt.registerTask('default', ['neuter:concat:dist','concat:dist']);
  //grunt.registerTask('build', ['amd-dist']);
  //grunt.registerTask('test', ['todo1', 'todo2']);
};
