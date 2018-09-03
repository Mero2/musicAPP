

var gulp = require("gulp");
var connect = require("gulp-connect");
var less = require("gulp-less");

        //任务名，相当于事件    事件触发前执行的任务     事件函数
       //转移HTML文件到dist文件夹 
gulp.task("html",function(){
    //输出流文件：读取一点代码，处理一点儿代码，一般是64K左右。
    gulp.src("./src/index.html")
    .pipe(connect.reload())
    .pipe(gulp.dest("./dist"))

})

//把less转换成css
gulp.task("less",function(){
    gulp.src("./src/less/*.less")//*读取所有的less文件
    .pipe(less())
    .pipe(connect.reload())
    .pipe(gulp.dest("./dist/css"));
})

gulp.task("css",function(){

})

//监听文件
gulp.task("watch",function(){
                                 //当前面的变化的时候，将进行HTML任务，即为下面default执行前的任务
    gulp.watch("./src/index.html",["html"]);
    gulp.watch("./src/less/*.less",["less"]);
    gulp.watch("./src/js/*.js",["js"]);
            
})
//开启服务器
gulp.task("server",function(){
    connect.server({
        root: "dist",
        // port: 8080,修改端口
        livereload: true      //实时监听
    });
})
//转移js
gulp.task("js",function(){
    gulp.src("./src/js/*.js")
    .pipe(connect.reload())
    .pipe(gulp.dest("./dist/js"));
})


            //执行default之前先执行html,,默认控制后台输入gulp执行default事件。
            //default任务相当于gulp的入口
gulp.task("default",["html","watch","css","server","less","js"],function(){
    console.log(222);
})