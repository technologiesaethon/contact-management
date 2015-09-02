module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {

            js : {
                src : [
                    "public/javascripts/controller/admincontroller.js",
                    "public/javascripts/controller/contactcontroller.js",
                    "public/javascripts/controller/logincontroller.js",
                    "public/javascripts/controller/signupcontroller.js",
                    "public/javascripts/controller/maincontroller.js",
                    "public/javascripts/controller/alertcontroller.js",
                ],
                dest : 'public/javascripts/controllers.js'
            },
            combine:{
                src:[
                    'public/javascripts/lib.all.min.js',
                    'public/javascripts/factory.config.min.js'
                ],
                dest:'public/javascripts/scripts.js'
            }
        },
        uglify : {
            js: {
                files: {
                    'public/javascripts/lib.all.min.js' : [ 'public/javascripts/controllers.js' ],
                    'public/javascripts/factory.config.min.js' : [ 'public/javascripts/factory/factory.js' ]
                }
            }
        },
        clean: {
            js: ["javascripts/controllers.js", "javascripts/controller/lib.all.min.js", "javascripts/factory.config.min.js", "javascripts/factory/factory.js"]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('mytask', ['concat:js','uglify:js','concat:combine','clean:js']);
};