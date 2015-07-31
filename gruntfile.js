/// <binding Clean='clean:all' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
http://raibledesigns.com/rd/entry/using_grunt_with_angularjs_for

dist/
   --app  (all the components translations)
   --scripts (all js or other scripts)
   --styles (all css or other styles files)
   --fonts (all fonts files)
   --assets
         -- images
*/
module.exports = function (grunt) {
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: appConfig,

        clean: {
            all: ["wwwroot/*", "temp","dist",".tmp",".sass-cache"],
            tmp: ["temp", ".tmp", '.sass-cache', '<%= yeoman.app %>/populate_template_cache.js', 'assets/styles/style.scss'],
            css: ['assets/styles/css/*']
        },
        copy: {
            main: {
                expand: true,
                cwd: '<%= yeoman.app %>/',
                src: ['**', '!*.js', '!**/*.{js,css,tmpl.html,scss}'],
                dest: '<%= yeoman.dist %>/app/'
            },
            index:
                {
                    expand: true,
                    cwd: '<%= yeoman.app %>/',
                    src: ['index.html'],
                    dest: '<%= yeoman.dist %>/'
                },
            assets: {
                expand: true,
                cwd: 'assets/images/',
                src: ['**'],
                dest: '<%= yeoman.dist %>/assets/images/'
            },
            css: {
                src: ['assets/styles/css/style.css'],
                dest: '<%= yeoman.dist %>/styles/'
            },
            publish:
            {
                expand: true,
                cwd: '<%= yeoman.dist %>/',
                src: ['**'],
                dest: 'wwwroot/'
            }
        },
        jshint: {
            files: ['temp/*.js', 'Gruntfile.js', '<%= yeoman.app %>/*.js', '<%= yeoman.app %>/**/*.js', '<%= yeoman.app %>/**/**/*.js'],
            options: {
                '-W069': false,
            }
        },
        concat: {
            scss: {
                src: ['assets/styles/app.scss', '<%= yeoman.app %>/*.scss', '<%= yeoman.app %>/**/{,*/}*.{css,scss}'],
                dest: 'assets/styles/style.scss',
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/styles',
                    src: ['*.scss'],
                    dest: 'assets/styles/css',
                    ext: '.css'
                }]
            },
            concat:
                {
                    files: [{
                        expand: true,
                        cwd: 'assets/styles',
                        src: ['style.scss'],
                        dest: 'assets/styles/css',
                        ext: '.css'
                    }]
                }
        },
        html2js: {
            options: {
                base: 'app',
                module: 'myApp.templates',
                singleModule: true,
                useStrict: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: ['<%= yeoman.app %>/components/**/*.tmpl.html', '<%= yeoman.app %>/shared/**/*.tmpl.html', '<%= yeoman.app %>/*.tmpl.html'],
                dest: '<%= yeoman.app %>/populate_template_cache.js'
            }
        },
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            files: {
                src: ['<%= yeoman.dist %>/**/*.{js,css}',
                    '<%= yeoman.dist %>/assets/images/{,*/}*.{jpg,jpeg,gif,png}',
                    '<%= yeoman.dist %>/fonts/{,*/}*.{eot,svg,ttf,woff}']
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/index.html',],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            js: ['<%= yeoman.dist %>/scripts/*.js'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/scripts',
                    '<%= yeoman.dist %>/styles', '<%= yeoman.dist %>/assets/images', '<%= yeoman.dist %>/fonts'],
                patterns: {
                    js: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                }
            }
        },
        uglify: {
            options: {
                mangle: false
            }
        }
    });
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.registerTask("buildcss", ['clean:css', 'concat:scss', 'sass:concat', 'clean:tmp']);
    grunt.registerTask("nomin", ['clean:all', 'copy:main', "copy:assets", 'copy:index', 'useminPrepare', 'html2js:main', 'concat:generated']);
    grunt.registerTask("all", ['clean:all', 'copy:main', "copy:assets", 'copy:index', 'useminPrepare', 'html2js:main', 'concat:generated',
        'uglify:generated', 'cssmin:generated', 'filerev', 'usemin', 'copy:publish', 'clean:tmp']);
};