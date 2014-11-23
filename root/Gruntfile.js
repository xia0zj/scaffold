module.exports = function(grunt){

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            livereload: {
                options: {
                    livereload: true
                },
                files: [
                    'src/app/css/*.css',
                    'src/app/js/*.js',
                    'src/html/*.html'
                ]
            },
            less : {
                files : ['src/app/less/*.less'],
                tasks : ['less']
            }
        },

        connect : {
            options: {
                port : 8001,
                base : 'src',
                hostname : "localhost",
                livereload: true,
                open : true
            },
            livereload: {
            },
            dest : {
                options : {
                    port : 8002,
                    base : 'dest',
                    hostname : "localhost"
                }
            }
        },

        less : {
            compile: {
                files: [{
                    expand : true,
                    cwd : 'src/app/less',
                    src : ['*.less', '!_*.less'],
                    dest : 'src/app/css',
                    ext : '.css'
                }]
            }
        },

        bowercopy : {
            libs: {
                options: {
                    destPrefix: 'dest/lib' //目的地文件夹的路径
                },
                files: {
                  // 'jquery.min.js': 'jquery/dist/jquery.min.js'
                }
            }
        },

        copy : {
            main : {
                files : [
                    {expand: true, cwd: 'src', src: ['lib/**'], dest: 'dest/'}, // 复制所有非bower安装的依赖模块
                    {expand: true, cwd: 'src', src: ['html/**'], dest: 'dest/'}, // 复制所有静态页面
                    {expand: true, cwd: 'src', src: ['app/img/**'], dest: 'dest/'} // 复制所有非sprite图片
                ]
            }
        },

        useminPrepare : {
            html: ['dest/html/*.html'],
            options: {
                root: 'src',
                dest: 'dest',
                staging : 'src/tmp'
            }
        },

        usemin:{
            html: ['dest/html/*.html']
        },

        clean : ['src/tmp']
    });

    require('load-grunt-tasks')(grunt);

    // 当使用bower install安装新的依赖后 用bowercopy复制需要的文件到dist目录
    grunt.registerTask('lib', ['bowercopy']);

    // 开始编码
    grunt.registerTask('coding', ['connect', 'watch']);

    // 编码完成，发布(依次为发布)
    grunt.registerTask('build', ['copy', 'useminPrepare', 'concat', 'cssmin', 'uglify', 'usemin', 'clean']);
}
