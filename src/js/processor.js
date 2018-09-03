(function($,root){
    var $scope = $(document.body);
    var curDuration;
    var frameId;
    var startTime;
    var songWord;
    var lastPercent = 0;
    function formatTime(duration ){
        duration = Math.round(duration);
        var minute = Math.floor(duration /60);
        var second = duration - 60 *minute;
        if(minute < 10){
            minute = "0" + minute;
        }
        if(second < 10){
            second = "0" + second;
        }
        return minute + ":" + second;
    }
    function renderAllTime(duration){
        curDuration = duration;
        lastPercent = 0;
        var allTime = formatTime(duration);
        $scope.find(".all-time").text(allTime);
    }
    function stop(){
        var stopTime = new Date().getTime();
        lastPercent = lastPercent + (stopTime - startTime) /(curDuration * 1000);
        cancelAnimationFrame(frameId);
    }
    function process(percent){
        var percentage =  (percent - 1) *100 +"%";
        $scope.find(".pro-top").css({
            transform: "translateX(" + percentage + ")"
        })
    }
    function update(percent,index){
        var curTime = percent * curDuration;
        var time = formatTime(curTime);
        $scope.find(".current-time").text(time);
        process(percent);
    }



    function upword(percent,list){
        var curTime = percent * curDuration;
        var time = formatTime(curTime);
        var leng = songWord[list].length;
        for(var i = 0; i < leng; i ++){
             if(time == songWord[list][i].time){
            $scope.find(".song-word").text(songWord[list][i].word);
             }
        }
    }





    function startProcessor(percentage){
        lastPercent = percentage == undefined ? lastPercent:percentage;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percent = lastPercent + (curTime - startTime)/ (curDuration *1000);
            var num,alldate;
            alldate = curDuration;
            function changeIndex(){
                if(alldate == 248){
                num = 0;
            }else if(alldate == 265){
                num = 1;
            }else{
                num = 2;
              }
              return num;
            }
            // console.log(curDuration);
            // console.log(changeIndex());
            
            if(percent <1){
                frameId = requestAnimationFrame(frame); //每隔多少秒刷新一次，并执行括号中的函数               
                update(percent);
                upword(percent,changeIndex());
        }else{
                cancelAnimationFrame(frameId);
            }
            // console.log(percent);
        }
        frame();
    }
    function getwords(url,callback){
        $.ajax({
        url: url,
        type: "GET",
        success: callback,
        error:function(err){
            console.log(err);
        }
    })
}
function successCallback(data){
    songWord = data;
      
}
getwords("./mock/data1.json",successCallback);
    root.processor = {
        upword:upword,
        update: update,
        stop :stop,
        startProcessor: startProcessor,
        renderAllTime : renderAllTime
    }
}(window.Zepto,window.player || (window.player = {})))