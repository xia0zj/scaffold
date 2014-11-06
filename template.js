/*
   * xia0zj的个人前端脚手架
   * https://github.com/xia0zj/scaffold
   *
   * 版权信息
   * Licensed under the MIT license.
   */

  'use strict';

  // 模板简单介绍信息
  exports.description = 'xia0zj的个人前端脚手架';

  // 开始回答项目相关问题前，控制台打印的相关信息
  exports.notes = '请根据提示逐个填写项目信息，如果不想填的会可以直接enter跳过';

  // 结束回答项目相关问题后，控制台打印出来的信息
  exports.after = '项目主框架已经搭建好了，现在可以运行 ' +
    '\n\n' +
    '1、npm install 安装项目依赖的node模块\n'+
    '2、grunt 运行任务，包括文件压缩、合并、校验等\n\n';

  // 如果运行grunt-init运行的那个目录下，有目录或文件符合warOn指定的模式
  // 则会跑出警告，防止用户不小心把当前目录下的文件覆盖了，一般都为*，如果要强制运行，可加上--force
  // 例：grunt-init --force scaffold
  exports.warnOn = '*';

  // The actual init template.
  exports.template = function(grunt, init, done) {

    init.process({type: 'xia0zj'}, [
      // 项目创建的时候，需要回答的问题
      init.prompt('name'),
      init.prompt('title'),
      init.prompt('description', 'xia0zj的个人前端项目'),
      init.prompt('version', '0.1.0'),
      init.prompt('author_name', 'xia0zj'),
      init.prompt('author_email', 'bladecamper #at# Gmail ( d o t ) com'),
    ], function(err, props) {

      props.keywords = [];

      // 需要拷贝处理的文件，这句一般不用改它
      var files = init.filesToCopy(props);

      // 实际修改跟处理的文件，noProcess表示不进行处理
      init.copyAndProcess(files, props, {noProcess: 'libs/**'});

      // 生成package.json，供Grunt、npm使用
      init.writePackageJSON('package.json', {
        name: 'xia0zj-PROJ',
        version: '0.0.0-ignored',
        npm_test: 'grunt qunit',

        node_version: '>= 0.8.0',
        devDependencies: {
          "connect-livereload": "^0.5.0",
          "grunt-bowercopy": "^1.1.0",
          "grunt-contrib-clean": "^0.6.0",
          "grunt-contrib-concat": "^0.5.0",
          "grunt-contrib-connect": "^0.8.0",
          "grunt-contrib-copy": "^0.7.0",
          "grunt-contrib-cssmin": "^0.10.0",
          "grunt-contrib-jshint": "^0.10.0",
          "grunt-contrib-less": "^0.12.0",
          "grunt-contrib-sass": "^0.8.1",
          "grunt-contrib-uglify": "^0.6.0",
          "grunt-contrib-watch": "^0.6.1",
          "grunt-usemin": "^2.5.1",
          "load-grunt-tasks": "^1.0.0"
        },
      });

      // All done!
      done();
    });
  };
