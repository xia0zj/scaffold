module.exports = function(grunt){

    // 项目配置
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')
    });

    // 加载提供"uglify"任务的插件
    // grunt.loadNpmTasks('grunt-contrib-uglify');

    // 默认任务
    // grunt.registerTask('default', ['uglify']);
}
