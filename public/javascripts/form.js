/**
 * Created by Home on 18/11/2016.
 */
$(function(){

    $("form").submit(function(e){
       return false;
    });

    $("#playBtn").click(function(){
        var url = '/token?function=valid&token='+ $("#token").val();

        $.ajax({
            url:url,
            success: function(result,status,xhr){
                var res = JSON.parse(result);
                if(res.valid == true){
                    var nextUrl = "/controller.html?token=" + $("#token").val() + "&device=mobile";
                    window.location.assign(nextUrl);
                }else{
                    $("#token").css("color", "red");
                    $("#token").css("border-color", "red");
                }
            },
            error: function(xhr,status,error){
                $("#token").css("color", "red");
                $("#token").css("border-color", "red");
            }
        })

    });

});
