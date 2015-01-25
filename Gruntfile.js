module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bootstrap: 'assets/vendor/bootstrap',
        vendor: 'assets/vendor',
        less_src: 'assets/less',
        app: 'assets/coffee',

        coffee: {

            options: { sourceMap: true },

            app: {
                src: [
                    // Inputs
                    '<%= app %>/inputs/code.coffee',
                    '<%= app %>/inputs/markdown.coffee',

                    // Fields
                    '<%= app %>/fields/code.coffee',
                    '<%= app %>/fields/markdown.coffee'
                ],

                dest: 'public/js/app.js'
            }
        },

        uglify: {
            all: {
                options: { sourceMap: true },

                expand: true,
                cwd: 'public/js',
                src: ['*.js', '!*.min.js'],
                dest: 'public/js/',
                ext: '.min.js'
            }
        },

        less: {
            styles: {
                options: {
                    paths: [ '<%= bootstrap %>/less' ],

                    sourceMap: true,
                    sourceMapFilename: "public/css/styles.min.css.map",
                    sourceMapURL: "styles.min.css.map",
                    sourceMapBasepath: "assets",
                    outputSourceFiles: true,

                    compress: true
                },

                files: {
                    'public/css/styles.min.css': '<%= less_src %>/styles.less'
                }
            }
        },

        copy: {
            ace: {
                expand: true,
                cwd: '<%= vendor %>/ace-builds/src-min-noconflict',
                src: '*.js',
                dest: 'public/js/ace'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('styles', [ 'less' ]);
    grunt.registerTask('scripts', [ 'coffee', 'uglify' ]);

    // Default task
    grunt.registerTask('default', [ 'styles', 'scripts' ]);

    // Install project
    grunt.registerTask('install', [ 'copy:ace', 'default' ]);
};