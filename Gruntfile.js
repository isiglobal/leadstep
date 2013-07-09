module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		meta: {
			copyright: 'Copyright (c) 2013 Brandon Thomas <bt@brand.io>',
		},

		neuter: {
			production: {
				options: {
					filepathTransform: function(fp) { 
						return 'src/' + fp; 
					},
					includeSourceURL: false,
					//template: '(function){ {%= src %} })();',
					template: '{%= src %}',
				},
				files: [{
					src: 'src/main.js',
					dest: 'leadstep.js',
				}],
			},
			/*development: {
				options: {
					filepathTransform: function(fp) { 
						return 'src/' + fp; 
					},
					includeSourceURL: true,
					//template: '(function){ {%= src %} })();',
					template: '{%= src %}',
				},
				files: [{
					src: 'src/main.js',
					dest: 'leadstep.dev.js',
				}],
			},*/
		},
		uglify: {
			options: {
				banner: '/*! ' +
					'<%= pkg.name %> // v<%= pkg.version %> // ' +
					'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
					'<%= meta.copyright %> ' +
					'*/\n',
			},
			production: {
				files: [{
					src: 'leadstep.js',
					dest: 'leadstep.min.js',
				}],
			},
		},

		watch: {
			script: {
				files: ['src/*.js', 'src/*/*.js'],
				tasks: ['neuter:production'],
			},
			/*style: {
				// Less, SASS, Stylus, etc.
			},*/
		},
	});
 
	// TODO: Write these dependencies to package.json
	// TODO: Write jQuery, Backbone, etc. dependencies
	// TODO: Remove old dependencies that are no longer used
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-neuter');

	// TODO: jslint, build tests, etc.
	//grunt.registerTask('test', ['todo1', 'todo2']);
	//grunt.registerTask('default', ['neuter:production']);
	grunt.registerTask('default', ['neuter:production', 'watch']);
	grunt.registerTask('build', ['neuter:production', 'uglify']);
};
