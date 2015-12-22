// Gruntfile.js
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function (grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // all of our configuration will go here

        // configure jshint to validate js files -----------------------------------
        /*jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Grunfile.js', 'src//*.js']
        },*/

        // configure uglify to minify js files -------------------------------------
        uglify: {
            build: {
                files: {
                    'www/js/lib.min.js': [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/bootstrap/dist/js/bootstrap.js',
                        'bower_components/raphael/raphael.js',
                        'bower_components/wanakana/lib/wanakana.js',
                        'libs/dmark.js',
                        'libs/handwriter.js',
                        'libs/parse.min.js',
                        'libs/socket.io.js',
                        'libs/scrollheader.js',
                        'libs/fastclick.js',
                        'bower_components/angular/angular.js',
                        'bower_components/angular-route/angular-route.js',
                        'bower_components/angular-ui-router/release/angular-ui-router.js',
                        'bower_components/angular-sanitize/angular-sanitize.js',
                        'bower_components/ngAudio/app/angular.audio.js'
                    ],
                    'www/js/app.min.js': [
                        'services/localStoreServices.js',
                        'services/noteServices.js',
                        'services/historyServices.js',
                        'services/searchServices.js',
                        'services/utilServices.js',
                        'services/authServices.js',

                        'app.js',
                        
                        'components/example/example-directive.js',
                        'components/kanji/kanji-directive.js',
                        'components/grammar/grammar-directive.js',
                        'components/kanji-result-search-word/kanji-result-search-word-directive.js',
                        'components/word/word-directive.js',
                        'components/setting/setting-directive.js',
                        'components/kanji-recognize/kanji-recognize-directive.js',
                        'components/kanji-draw/kanji-draw-directive.js',
                        'components/history/history-directive.js',
                        'components/notes/note-directive.js',
                        'components/notes/note-content-directive.js',
                        'components/notes/category-directive.js',
                        'components/news/newsother-directive.js',
                        'components/verb-conjugtion/verb-conjugtion.js',
                        'components/google-translate/google-translate-directive.js',
                        'components/synonyms/synonyms-directive.js',
                        'components/report/report-directive.js',
                        'components/focus/focus.js',
                        'components/footer/footer-directive.js',
                        'components/notify/notify-directive.js',

                        'views/search/search.js',
                        'views/news/news.js',
                        'views/jlpt/jlpt.js',
                        'views/note/note.js',
                        'views/help/help.js',
                        'views/header/header.js',
                        'views/write/write.js',
                        'views/about/about.js',
                        'views/chat/chat.js',
                        'views/term/term.js'
                          
                     ]
                }
            }
        },

        // configure cssmin to minify css files ------------------------------------
        cssmin: {
            build: {
                files: {
                    'www/css/style.min.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'fonts/Font-Awesome-master/css/font-awesome.min.css',
                        'app.css',
                        'css/mobile.css',
                        'css/app.css'
                     ]
                }
            }
        },
        
        // configure copy files ------------------------------------
        copy: {
          main: {
            files: [
                // includes files within path and its sub-directories
                {
                    expand: true, 
                    cwd: 'imgs',
                    src: ['**'], 
                    dest: 'www/imgs/'
                },
                {
                    expand: true, 
                    cwd: 'db',
                    src: ['**'], 
                    dest: 'www/db'
                },

                {
                    expand: true, 
                    cwd: 'fonts/Font-Awesome-master/fonts/',
                    src: ['**'], 
                    dest: 'www/fonts'
                },
                {
                    expand: true, 
                    cwd: 'fonts/',
                    src: ['Meiryo.ttf'], 
                    dest: 'www/fonts'
                }

            ]
          },
        },
        
        html2js: {
            options: {
              rename: function (moduleName) {
                  return moduleName.replace("../", "");
              }
            },
            main: {
              src: ['views/**/*.html', 'components/**/*.html'],
              dest: 'www/js/templates.js'
            },
          }
    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html2js');
    
    // ===========================================================================
    // CREATE TASKS ==============================================================
    // ===========================================================================
    grunt.registerTask('default', ['uglify', 'cssmin', 'copy', 'html2js']);
};

