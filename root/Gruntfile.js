module.exports = function(grunt){

    var port = {
        livereload : Math.ceil(Math.random()*(30000-26000)+26000),
        src        : Math.ceil(Math.random()*(9999-6000)+6000),
        dest       : Math.ceil(Math.random()*(9999-6000)+6000)
    };

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            livereload: {
                options: {
                    livereload: port.livereload
                },
                files: [
                    'src/html/*.*',
                    'src/static/**/*.*'
                ]
            },
            lessComponents : {
                files : ['src/less/common/*.less', 'src/less/widget/*.less'],
                tasks : ['less']
            },
            lessApp : {
                files : ['src/less/*.less'],
                tasks : ['newer:less']
            },
            includesComponents : {
                files : ['src/include/*.tpl'],
                tasks : ['includereplace']
            },
            includesApp : {
                files : ['src/tpl/*.html'],
                tasks : ['newer:includereplace']
            }
        },

        connect : {
            options: {
                hostname : "",
                livereload: port.livereload
            },
            src: {
                options: {
                    port : port.src,
                    base : 'src',
                    open: "http://localhost:"+port.src
                }
            },
            dest : {
                options : {
                    port : port.dest,
                    base : 'dist',
                    open: "http://localhost:"+port.dest,
                    keepalive : true
                }
            }
        },

        less : {
            compile: {
                files: [{
                    expand : true,
                    cwd : 'src/less',
                    src : ['*.less', '!_*.less'],
                    dest : 'src/static/css',
                    ext : '.css'
                }]
            }
        },

        includes : {
            files: {
                options: {
                    includePath: 'src/include'
                },
                flatten: true,
                cwd: '.',
                src: ['src/tpl/*.*'], // Source files
                dest: 'src/html' // Destination directory
            }
        },

        includereplace: {
            dist: {
                options: {
                    prefix: '<!-- @@',
                    suffix: ' -->',
                    includesDir: 'src/include/',
                    processIncludeContents: function (contents, locals) {
                        var indent = new Array((locals.spaces || 0) + 1).join("    ");
                        return contents.replace(/^/gm, indent).replace(indent, "");
                    }
                },
                expand: true,
                cwd: 'src/tpl',
                src: '*.*',
                dest: 'src/html/'
            }
        },

        bowercopy : {
            fontawesome: {
                options: {
                    destPrefix: 'src/static/lib/fontawesome' //目的地文件夹的路径
                },
                files: {
                    "css" : "fontawesome/css",
                    "fonts" : "fontawesome/fonts"
                }
            },
            flexslider : {
                options: {
                    destPrefix: 'src/static/lib'
                },
                files: {
                    "flexslider.js" : "flexslider/jquery.flexslider-min.js"
                }
            },
            fullcalendar : {
                options : {
                    destPrefix: 'src/static/lib/fullcalendar'
                },
                files: {
                    "fullcalendar.min.js" : "fullcalendar/dist/fullcalendar.min.js",
                    "fullcalendar.min.css" : "fullcalendar/dist/fullcalendar.min.css"
                }
            },
            datetimepicker : {
                options : {
                    destPrefix: 'src/static/lib/datetimepicker'
                },
                files: {
                    "jquery.datetimepicker.css" : "datetimepicker/jquery.datetimepicker.css",
                    "jquery.datetimepicker.js" : "datetimepicker/jquery.datetimepicker.js"
                }
            },
            masonry : {
                options : {
                    destPrefix: 'src/static/lib'
                },
                files: {
                    "masonry.pkgd.min.js" : "masonry/dist/masonry.pkgd.min.js"
                }
            },
            infinitescroll : {
                options : {
                    destPrefix: 'src/static/lib'
                },
                files: {
                    "jquery.infinitescroll.min.js" : "jquery-infinite-scroll/jquery.infinitescroll.min.js"
                }
            },
            arttemplate : {
                options : {
                    destPrefix: 'src/static/lib'
                },
                files: {
                    "template.js" : "artTemplate/dist/template.js"
                }
            },
            imagesloaded : {
                options : {
                    destPrefix: 'src/static/lib'
                },
                files: {
                    "imagesloaded.pkgd.min.js" : "imagesloaded/imagesloaded.pkgd.min.js"
                }
            },
            artDialog : {
                options : {
                    destPrefix: 'src/static/lib/artDialog'
                },
                files: {
                    "ui-dialog.css" : "artDialog/css/ui-dialog.css",
                    "dialog-min.js" : "artDialog/dist/dialog-min.js",
                    "dialog-plus-min.js" : "artDialog/dist/dialog-plus-min.js"
                }
            }
        },

        copy : {
            main : {
                files : [
                    {expand: true, cwd: 'src', src: ['static/lib/**'], dest: 'dist/'}, // 复制所有依赖模块
                    {expand: true, cwd: 'src', src: ['html/**'], dest: 'dist/'}, // 复制所有静态页面
                    {expand: true, cwd: 'src', src: ['static/img/**'], dest: 'dist/'} // 复制所有图片
                ]
            }
        },

        uglify : {
            generated : {
                options : {
                    sourceMap : false
                }
            }
        },

        useminPrepare : {
            html: ['src/html/*.html'],
            options: {
                flow: { steps: { js: ['uglifyjs'], css: ['cssmin'] }, post: {} },
                dest: 'dist/html'
            }
        },

        usemin:{
            html: ['dist/html/*.html'],
            options: {
                assetsDirs: ['dist/static/js', 'dist/static/css']
            }
        },

        clean : ['dist/*', '!dist/.svn', 'src/html/*']
    });

    require('load-grunt-tasks')(grunt);

    // 开始编码
    grunt.registerTask('default', ['connect:src', 'watch']);

    // 编码完成，发布(依次为发布)
    grunt.registerTask('build', ['clean', 'includereplace', 'copy', 'prettify', 'useminPrepare', 'cssmin:generated', 'uglify:generated', 'usemin', 'connect:dest']);
}
