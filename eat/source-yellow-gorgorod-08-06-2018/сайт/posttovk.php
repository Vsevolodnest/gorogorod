<?php

if ( $_GET['llbappkey']==1 ){ 

    header('Content-Type: text/html; charset=utf-8');

        $postimgsrc = '';
    
        if ( isset($_GET['code']) ){

            //https://oauth.vk.com/authorize?client_id=6364096&display=mobile&redirect_uri=.....&scope=photos,wall&response_type=code
            
            $llburl = 'https://oauth.vk.com/access_token?client_id=6385173&client_secret=pLZq1XKfAiS4EK8sWOSk&redirect_uri=http://gg.geekks.com/social/posttovk.php?llbappkey=1%26repostparams='.$_GET['repostparams'].'&code='.$_GET['code'];
            


        	$ch = curl_init();
        
        	curl_setopt($ch, CURLOPT_HEADER, 0);
        	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        	curl_setopt($ch, CURLOPT_URL, $llburl);
        
        	$data = curl_exec($ch);
        	curl_close($ch);
        	
        
            $forpostparams = explode("&&", base64_decode( str_replace("-", "+", $_GET['repostparams']) ) );
            ///echo 'link ===> ' . $forpostparams[0] . '<br/>photo ===> ' . $forpostparams[1] . '<br/>text ===> ' . $forpostparams[2];
            ///echo '<br/>';


//            print_r( $forpostparams );exit;

        	$vkjson = json_decode($data);
        	
        	$userid = $vkjson->user_id;
        	$usertoken = $vkjson->access_token;

        	
        
        	///////------------------------------------------------------------------------------------------------
        	
        	//https://api.vk.com/method/METHOD_NAME?PARAMETERS&access_token=ACCESS_TOKEN&v=V 
        	$llburl = 'https://api.vk.com/method/photos.getWallUploadServer?access_token='.$usertoken;
        	
        	$ch = curl_init();
        
        	curl_setopt($ch, CURLOPT_HEADER, 0);
        	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        	curl_setopt($ch, CURLOPT_URL, $llburl);
        
        	$data = curl_exec($ch);
        	curl_close($ch);
        	
        	$vkjson = json_decode($data);

        	//$vkserverurlforupload = ;
        	
        	///////------------------------------------------------------------------------------------------------
        	
        	$dnload_url = $forpostparams[1];

            $ch = curl_init();

        	curl_setopt($ch, CURLOPT_HEADER, 0);
        	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        	curl_setopt($ch, CURLOPT_URL, $dnload_url);
            
            $data = curl_exec($ch);
        	curl_close($ch);

            if( substr($forpostparams[1], -4, 4)=='jpeg' ){

                $filetemppath = date("dmY_His") . '_' . $userid . '.' . substr($forpostparams[1], -4, 4);
            }else{
                $filetemppath = date("dmY_His") . '_' . $userid . substr($forpostparams[1], -4, 4);
            }        	

        	file_put_contents($filetemppath, $data);


        	///////------------------------------------------------------------------------------------------------

        	$upload_url = $vkjson->response->upload_url;
 
            $post_params['file1'] = '@' . $filetemppath;

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $upload_url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $post_params);
            
            $data = curl_exec($ch);
            curl_close($ch);
            
        	$vkjson = json_decode($data);
        	
        	///////------------------------------------------------------------------------------------------------
        	
        	$llburl = 'https://api.vk.com/method/photos.saveWallPhoto?'
        	.'user_id='.$userid
        	.'&photo='.$vkjson->photo
        	.'&server='.$vkjson->server
        	.'&hash='.$vkjson->hash
        	.'&access_token='.$usertoken;
        	
        	$ch = curl_init();
        
        	curl_setopt($ch, CURLOPT_HEADER, 0);
        	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        	curl_setopt($ch, CURLOPT_URL, $llburl);
        
        	$data = curl_exec($ch);
        	curl_close($ch);
        	
        	$vkjson = json_decode($data);
        	
        	$postimgsrc = $vkjson->response[0]->id;
            unlink($filetemppath);

        }

        //'http://gg.geekks.com/get-coupons-list?token_key=551f645cc030f7bb70bc380e9fd93217'

?>

<!DOCTYPE html>
<html lang="ru">
<head>

    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1,width=device-width, height=device-height, target-densitydpi=device-dpi" />

<title>ГорГород</title>

<style>
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto'), local('Roboto-Regular'), url(font/roboto.woff) format('woff');
  }
  html{
    background: #C98604;
    background: -webkit-linear-gradient(#C98604 , #EABF18);
    background: linear-gradient(#C98604 , #EABF18);
    width: 100%;
    height: 100%;
  }
  #clickforpost
  {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    color: #fff;
    left: 0;
  }
  #clickforpost div{
    width: 70%;
    margin: auto;
    text-align: center;
    padding-top: 6em;
    font-size: 2em;
    line-height: 1.2em;
}
  #clickforpost a{
    color: #fff;
}
.clickbg{
    background-image: url('data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTE3NS4zNjUsMGMtNC41NjQsMC04LjI2NCwzLjY5OS04LjI2NCw4LjI2NFY0MS4zMmMwLDQuNTY1LDMuNyw4LjI2NCw4LjI2NCw4LjI2NGM0LjU2NCwwLDguMjY0LTMuNjk5LDguMjY0LTguMjY0VjguMjY0ICAgIEMxODMuNjI5LDMuNjk5LDE3OS45MjksMCwxNzUuMzY1LDB6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMTM0LjQ2LDU5LjA3NkwxMTEuMDg3LDM1LjdjLTMuMjI3LTMuMjI2LTguNDYtMy4yMjYtMTEuNjg2LDBjLTMuMjI3LDMuMjI5LTMuMjI3LDguNDYsMCwxMS42ODhsMjMuMzc0LDIzLjM3NSAgICBjMS42MTMsMS42MTQsMy43MjksMi40MjEsNS44NDMsMi40MjFjMi4xMTUsMCw0LjIzLTAuODA3LDUuODQzLTIuNDJDMTM3LjY4OCw2Ny41MzUsMTM3LjY4OCw2Mi4zMDQsMTM0LjQ2LDU5LjA3NnoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0yNTEuMzMxLDM1LjcwMWMtMy4yMjctMy4yMjYtOC40Ni0zLjIyNi0xMS42ODYsMGwtMjMuMzc0LDIzLjM3NWMtMy4yMjcsMy4yMjgtMy4yMjcsOC40NiwwLDExLjY4NyAgICBjMS42MTMsMS42MTMsMy43MjgsMi40Miw1Ljg0MywyLjQyYzIuMTE0LDAsNC4yMy0wLjgwNyw1Ljg0My0yLjQybDIzLjM3NC0yMy4zNzVDMjU0LjU1OCw0NC4xNjEsMjU0LjU1OCwzOC45MjksMjUxLjMzMSwzNS43MDF6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzczLjcwMSwyMTUuNDE0Yy0xMC40OTUsMC0yMC4wODMsMy45MzktMjcuMzc4LDEwLjQwOWMtNS44NTQtMTUuNzE0LTIxLjAwNi0yNi45MzctMzguNzM0LTI2LjkzNyAgICBjLTEwLjQ5NSwwLTIwLjA4MywzLjkzOS0yNy4zNzgsMTAuNDA5Yy01Ljg1NC0xNS43MTQtMjEuMDA2LTI2LjkzNy0zOC43MzQtMjYuOTM3Yy05LjI5NSwwLTE3Ljg4MSwzLjA4Ni0yNC43OTIsOC4yODd2LTgzLjIxNCAgICBjMC0yMi43ODQtMTguNTM2LTQxLjMyLTQxLjMyLTQxLjMyYy0yMi43ODQsMC00MS4zMiwxOC41MzYtNDEuMzIsNDEuMzJWMjY1LjgzYy0xOC44MzcsMy44MzktMzMuMDU2LDIwLjUzMy0zMy4wNTYsNDAuNDg4djQ5LjU4NCAgICBjMCw4MC4xNjMsNjAuMDA2LDE0Ny4yNDksMTM5LjU4LDE1Ni4wNDZjMC4zMDgsMC4wMzQsMC42MTUsMC4wNTIsMC45MTgsMC4wNTJjNC4xNTYsMCw3LjczNi0zLjEyOSw4LjIwMy03LjM1NyAgICBjMC41MDEtNC41MzYtMi43NjktOC42Mi03LjMwNS05LjEyMWMtNzEuMTg2LTcuODcyLTEyNC44NjgtNjcuODk0LTEyNC44NjgtMTM5LjYxOXYtNDkuNTg0YzAtMTAuNzczLDYuOTEtMTkuOTU5LDE2LjUyOC0yMy4zNzEgICAgdjU2LjQyNmMwLDQuNTY1LDMuNyw4LjI2NCw4LjI2NCw4LjI2NHM4LjI2NC0zLjY5OSw4LjI2NC04LjI2NFYxMDcuNDMyYzAtMTMuNjcsMTEuMTIxLTI0Ljc5MiwyNC43OTItMjQuNzkyICAgIGMxMy42NzEsMCwyNC43OTIsMTEuMTIyLDI0Ljc5MiwyNC43OTJ2MTY1LjgzMWMwLDQuNTY1LDMuNyw4LjI2NCw4LjI2NCw4LjI2NGM0LjU2NCwwLDguMjY0LTMuNjk5LDguMjY0LTguMjY0di00OS41ODQgICAgYzAtMTMuNjcsMTEuMTIxLTI0Ljc5MiwyNC43OTItMjQuNzkyczI0Ljc5MiwxMS4xMjIsMjQuNzkyLDI0Ljc5MnY0OS41ODRjMCw0LjU2NSwzLjcsOC4yNjQsOC4yNjQsOC4yNjQgICAgYzQuNTY0LDAsOC4yNjQtMy42OTksOC4yNjQtOC4yNjR2LTMzLjA1NmMwLTEzLjY3LDExLjEyMS0yNC43OTIsMjQuNzkyLTI0Ljc5MnMyNC43OTIsMTEuMTIyLDI0Ljc5MiwyNC43OTJ2MzMuMDU2ICAgIGMwLDQuNTY1LDMuNyw4LjI2NCw4LjI2NCw4LjI2NGM0LjU2NCwwLDguMjY0LTMuNjk5LDguMjY0LTguMjY0di0xNi41MjhjMC0xMy42NywxMS4xMjEtMjQuNzkyLDI0Ljc5Mi0yNC43OTIgICAgczI0Ljc5MiwxMS4xMjIsMjQuNzkyLDI0Ljc5MnY5OS4xNjhjMCw3MS43MjYtNTMuNjgyLDEzMS43NDgtMTI0Ljg2OCwxMzkuNjE5Yy00LjUzNiwwLjUwMS03LjgwNyw0LjU4NS03LjMwNSw5LjEyMSAgICBjMC40NjcsNC4yMjgsNC4wNDYsNy4zNTcsOC4yMDMsNy4zNTdjMC4zMDMsMCwwLjYxLTAuMDE4LDAuOTE4LTAuMDUxYzc5LjU3My04Ljc5OCwxMzkuNTgtNzUuODg0LDEzOS41OC0xNTYuMDQ3di05OS4xNjggICAgQzQxNS4wMiwyMzMuOTUsMzk2LjQ4NSwyMTUuNDE0LDM3My43MDEsMjE1LjQxNHoiIGZpbGw9IiNGRkZGRkYiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K');
    background-repeat: no-repeat;
    background-size: 3em;
    background-position: center 2em;
}
.wallbg{
    background-image: url('data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIuMDA5IDUxMi4wMDkiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMi4wMDkgNTEyLjAwOTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik00ODYuNDA5LDQwNi41OTFoLTU2LjAyMWMwLjAzNC0wLjUyOSwwLjMwNy0wLjk3MywwLjMwNy0xLjUwMnYtNTQuMjEyYzAtMTQuMTQtMTEuNDYtMjUuNi0yNS42LTI1LjZoLTU2LjAyMSAgICBjMC4wMzQtMC41MjksMC4zMDctMC45NzMsMC4zMDctMS41MXYtNTQuMjEyYzAtMTQuMTQtMTEuNDYtMjUuNi0yNS42LTI1LjZIMTg4LjI0NWMtMTQuMTQsMC0yNS42LDExLjQ2LTI1LjYsMjUuNnY1NC4yMTIgICAgYzAsMC41MzgsMC4yNzMsMC45ODEsMC4zMDcsMS41MWgtNTYuMDIxYy0xNC4xNCwwLTI1LjYsMTEuNDYtMjUuNiwyNS42djU0LjIxMmMwLDAuNTM4LDAuMjczLDAuOTgxLDAuMzA3LDEuNTAyaC01Ni4wMyAgICBjLTE0LjE0LDAtMjUuNiwxMS40Ni0yNS42LDI1LjZ2NTQuMjEyYzAsMTQuMTQsMTEuNDYsMjUuNiwyNS42LDI1LjZoNDYwLjhjMTQuMTQsMCwyNS42LTExLjQ2LDI1LjYtMjUuNnYtNTQuMjEyICAgIEM1MTIuMDA5LDQxOC4wNTIsNTAwLjU0OCw0MDYuNTkxLDQ4Ni40MDksNDA2LjU5MXogTTQwNS4wOTQsMzUwLjg3N3Y1NC4yMTJIMjY5LjU1OXYtNTQuMjEySDQwNS4wOTR6IE0xODguMjQ1LDI2OS41NTVoMTM1LjUyNiAgICB2NTQuMjEySDE4OC4yNDVWMjY5LjU1NXogTTEwNi45MzEsMzUwLjg3N2gxMzUuNTI2djU0LjIxMkgxMDYuOTMxVjM1MC44Nzd6IE0xNjEuMTM1LDQ4Ni40MDRIMjUuNjA4di01NC4yMTJoMTM1LjUyNlY0ODYuNDA0eiAgICAgTTMyMy43NzIsNDg2LjQwNEgxODguMjQ1di01NC4yMTJoMTM1LjUyNlY0ODYuNDA0eiBNNDg2LjQwOSw0ODYuNDA0SDM1MC44ODJ2LTU0LjIxMmgxMzUuNTI2VjQ4Ni40MDR6IiBmaWxsPSIjRkZGRkZGIi8+Cgk8L2c+CjwvZz4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzYwLjUwOCw3LjUwNGMtNy4zMTMtNy4zMDUtMTguMjk2LTkuNTA2LTI3Ljg1My01LjU3MmwtMTUzLjg3Myw2My4zNmMtMy4xNzQsMS4zMDYtNS45OTksMy4yMTctOC4zNTQsNS41NzIgICAgYy0zLjUyNCwzLjUyNC01Ljk5OSw4LjA1NS03LjAwNiwxMy4wODJjLTEuNjgxLDguMzk3LDAuOTQ3LDE3LjA2Nyw2Ljk5NywyMy4xMjVsMzYuMjA3LDM2LjIwN2wtMTMuNTc3LDEzLjU3N2wtNTcuMDItOC4xNDEgICAgYy0zLjk4NS0wLjU3Mi04LjAyMSwwLjc2OC0xMC44NjMsMy42MThsLTE4LjA5OSwxOC4wOTljLTEwLjAwMS0xMC4wMDEtMjYuMjA2LTEwLjAwMS0zNi4yMDcsMGwtNjMuMzYsNjMuMzYgICAgYy0xMC4wMDEsMTAuMDAxLTEwLjAwMSwyNi4yMDYsMCwzNi4yMDdsMTguMTA4LDE4LjA4MmMxMC4wMDEsMTAuMDAxLDI2LjIwNiwxMC4wMDEsMzYuMjA3LDBsNjMuMzYtNjMuMzYgICAgYzEwLjAwMS0xMC4wMDEsMTAuMDAxLTI2LjIwNiwwLTM2LjIwN2wxMy41NzctMTMuNTc3bDU3LjAyLDguMTQxYzMuOTg1LDAuNTcyLDguMDIxLTAuNzY4LDEwLjg2My0zLjYxOGwxOC4wOTktMTguMDk5ICAgIGwzNi4yMDcsMzYuMjA3YzYuMDUsNi4wNSwxNC43MjksOC42NzgsMjMuMTI1LDYuOTk3YzUuMDI2LTEuMDA3LDkuNTU3LTMuNDgyLDEzLjA4Mi02Ljk5N2MyLjM1NS0yLjM1NSw0LjI2Ny01LjE4LDUuNTcyLTguMzU0ICAgIGw2My4zNi0xNTMuODY1QzM3MC4wMTQsMjUuNzkxLDM2Ny44MjEsMTQuODA5LDM2MC41MDgsNy41MDR6IE00My43MDgsMjY5Ljk4MWwtMTguMDk5LTE4LjA5OWw2My4zNi02My4zNmwxOC4wOTksMTguMDk5ICAgIEw0My43MDgsMjY5Ljk4MXogTTI3OS4wMzEsMTc5LjQ2OGwtMzYuMjA3LTM2LjIwN2wyNy4xNTMtMjcuMTUzYzUtNS4wMDEsNS0xMy4wOTksMC0xOC4wOTljLTUuMDAxLTUtMTMuMDk5LTUtMTguMDk5LDAgICAgbC0yNy4xNTMsMjcuMTUzbC0zNi4xOTgtMzYuMTk4bDE1My44NjUtNjMuMzZMMjc5LjAzMSwxNzkuNDY4eiIgZmlsbD0iI0ZGRkZGRiIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=');
    background-repeat: no-repeat;
    background-size: 3em;
    background-position: center 2em;
}
.itsokbg{
    background-image: url('data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIuMDAxIDUxMi4wMDEiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMi4wMDEgNTEyLjAwMTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSIxNnB4IiBoZWlnaHQ9IjE2cHgiPgo8Zz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBkPSJNNDczLjAzNywxOTguNDI2SDM1NC41ODJjLTIuNzcyLDAtNC40MDEtMS41ODMtNS4xMjQtMi41MjdjLTAuNzI1LTAuOTQ0LTEuODMzLTIuOTI2LTEuMTE1LTUuNjAzbDIxLjA5OS03OC43NDUgICAgIGM5LjA4NC0zMy45MDctMTEuMTA5LTY4Ljg4My00NS4wMTctNzcuOTY3Yy0xNC44MzYtMy45NzgtMzAuMTQxLDQuODYyLTM0LjExNywxOS42OThsLTE0LjgwMiw1NS4yNDQgICAgIGMtNi41MDIsMjQuMjY1LTE5LjE0Myw0Ni4zOTQtMzYuNTYsNjMuOTk0Yy0xNy4wMTMsMTcuMTkzLTM0Ljk1NSwzMS4xNTgtNDYuODI5LDQwLjM5OWMtNC41MzIsMy41MjctOC4xMTMsNi4zMTQtMTAuNjA0LDguNDcyICAgICBsLTQuMTgsMy42MjNjLTIuMzUsMi4wMzYtNS4zNTYsMy4xNTctOC40NjUsMy4xNTdoLTQzLjAzM3YtMzAuMjE3YzAtNi4zMTgtNS4xMjMtMTEuNDQtMTEuNDQtMTEuNDRIMTEuNDQgICAgIGMtNi4zMTcsMC0xMS40NCw1LjEyMi0xMS40NCwxMS40NHYyNjkuOTc4YzAsNi4zMTgsNS4xMjMsMTEuNDQsMTEuNDQsMTEuNDRoMTAyLjk1OGM2LjMxNywwLDExLjQ0LTUuMTIyLDExLjQ0LTExLjQ0di0zMC4yMTYgICAgIGg0My4wMzNjMy4xMSwwLDYuMTE4LDEuMTIxLDguNDY3LDMuMTU4YzE5Ljc4LDE3LjE0NCw0NS4wOTEsMjYuNTg1LDcxLjI2NywyNi41ODVoMTkwLjExM2MyMS40ODUsMCwzOC45NjUtMTcuNDc5LDM4Ljk2NS0zOC45NjQgICAgIHYtNi40OWMwLTguMTczLTIuNTI5LTE1Ljc2NS02Ljg0NC0yMi4wMzZjMTAuOTc1LTYuODk5LDE4LjI4NC0xOS4xMTgsMTguMjg0LTMzLjAxMnYtNi40OWMwLTguMTczLTIuNTI5LTE1Ljc2NS02Ljg0NC0yMi4wMzYgICAgIGMxMC45NzUtNi44OTksMTguMjg0LTE5LjExOCwxOC4yODQtMzMuMDEydi02LjQ5YzAtOC4xNzEtMi41MjktMTUuNzY0LTYuODQ0LTIyLjAzNmMxMC45NzUtNi44OTksMTguMjg0LTE5LjExOCwxOC4yODQtMzMuMDEyICAgICB2LTYuNDkxQzUxMiwyMTUuOTA2LDQ5NC41MjEsMTk4LjQyNiw0NzMuMDM3LDE5OC40MjZ6IE0xMDIuOTU4LDQ1Ni40OTJIMjIuODc5VjIwOS4zOTNoODAuMDc4VjQ1Ni40OTJ6IE00ODkuMTIxLDI0My44ODEgICAgIGMwLDguODY5LTcuMjE2LDE2LjA4NC0xNi4wODUsMTYuMDg0aC0zMC44MThjLTYuMzE3LDAtMTEuNDQsNS4xMjItMTEuNDQsMTEuNDRzNS4xMjMsMTEuNDQsMTEuNDQsMTEuNDRoMTkuMzggICAgIGM4Ljg2OCwwLDE2LjA4Myw3LjIxNiwxNi4wODMsMTYuMDg0djYuNDljMCw4Ljg2OS03LjIxNiwxNi4wODQtMTYuMDg1LDE2LjA4NEg0MjguNDljLTYuMzE3LDAtMTEuNDQsNS4xMjItMTEuNDQsMTEuNDQgICAgIHM1LjEyMywxMS40NCwxMS40NCwxMS40NGgyMS42NjZjOC44NjksMCwxNi4wODUsNy4yMTUsMTYuMDg1LDE2LjA4NHY2LjQ5YzAsOC44NjktNy4yMTYsMTYuMDg0LTE2LjA4NSwxNi4wODRoLTMzLjY3NyAgICAgYy02LjMxNywwLTExLjQ0LDUuMTIyLTExLjQ0LDExLjQ0czUuMTIzLDExLjQ0LDExLjQ0LDExLjQ0aDIyLjIzOGM4Ljg2OSwwLDE2LjA4NSw3LjIxNSwxNi4wODUsMTYuMDg0djYuNDkgICAgIGMwLDguODY5LTcuMjE2LDE2LjA4NC0xNi4wODUsMTYuMDg0SDI0OC42MDRjLTIwLjY3MiwwLTQwLjY2MS03LjQ1Ni01Ni4yODItMjAuOTk0Yy02LjUwOC01LjY0Mi0xNC44MzctOC43NDktMjMuNDUxLTguNzQ5ICAgICBoLTQzLjAzMlYyNTEuMDQ5aDQzLjAzMmM4LjYxNCwwLDE2Ljk0My0zLjEwNywyMy40NS04Ljc0OGw0LjE3OS0zLjYyMmMyLjAzNS0xLjc2NCw1LjU3NS00LjUxOSw5LjY3Mi03LjcwOCAgICAgYzEyLjMzOC05LjYwNCwzMC45ODMtMjQuMTE2LDQ5LjAzOS00Mi4zNjFjMjAuMjA3LTIwLjQyMSwzNC44NjctNDYuMDY3LDQyLjM5Ny03NC4xNjVMMzEyLjQwOSw1OS4yICAgICBjMC43MS0yLjY1MSwzLjQzOS00LjIzMyw2LjA5Ni0zLjUyYzIxLjcxOSw1LjgxOSwzNC42NTcsMjguMjI1LDI4LjgzNyw0OS45NDdsLTIxLjA5OSw3OC43NDUgICAgIGMtMS4yNTcsNC42OTEtMS4zMjQsOS40OTItMC4yOTMsMTQuMDU0aC0xMy4zODNjLTYuMzE3LDAtMTEuNDQsNS4xMjItMTEuNDQsMTEuNDRjMCw2LjMxOCw1LjEyMywxMS40NCwxMS40NCwxMS40NGgxNjAuNDcgICAgIGM4Ljg2OSwwLDE2LjA4NCw3LjIxNSwxNi4wODQsMTYuMDg0VjI0My44ODF6IiBmaWxsPSIjRkZGRkZGIi8+CgkJCTxwYXRoIGQ9Ik03MS41Nyw0MzcuMzMzYzYuMzE3LDAsMTEuNDQtNS4xMjIsMTEuNDQtMTEuNDR2LTExLjQ0YzAtNi4zMTgtNS4xMjMtMTEuNDQtMTEuNDQtMTEuNDRzLTExLjQ0LDUuMTIyLTExLjQ0LDExLjQ0djExLjQ0ICAgICBDNjAuMTMxLDQzMi4yMTIsNjUuMjUzLDQzNy4zMzMsNzEuNTcsNDM3LjMzM3oiIGZpbGw9IiNGRkZGRkYiLz4KCQkJPHBhdGggZD0iTTIwMS42OTcsMjY2LjEzYy02LjMxNywwLTExLjQ0LDUuMTIyLTExLjQ0LDExLjQ0djU0LjQ1OWMwLDYuMzE4LDUuMTIzLDExLjQ0LDExLjQ0LDExLjQ0czExLjQ0LTUuMTIyLDExLjQ0LTExLjQ0ICAgICBWMjc3LjU3QzIxMy4xMzcsMjcxLjI1MSwyMDguMDE2LDI2Ni4xMywyMDEuNjk3LDI2Ni4xM3oiIGZpbGw9IiNGRkZGRkYiLz4KCQkJPHBhdGggZD0iTTIwMS42OTcsMzY0LjYyNmMtNi4zMTcsMC0xMS40NCw1LjEyMi0xMS40NCwxMS40NHYxMS4zMTVjMCw2LjMxOCw1LjEyMywxMS40NCwxMS40NCwxMS40NHMxMS40NC01LjEyMiwxMS40NC0xMS40NCAgICAgdi0xMS4zMTVDMjEzLjEzNywzNjkuNzQ4LDIwOC4wMTYsMzY0LjYyNiwyMDEuNjk3LDM2NC42MjZ6IiBmaWxsPSIjRkZGRkZGIi8+CgkJPC9nPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=');
    background-repeat: no-repeat;
    background-size: 3em;
    background-position: center 2em;
}
.itsnookbg{
    background-image: url('data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDI5NyAyOTciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI5NyAyOTc7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTI1LjYwMiwyMjIuMzI5aDM1LjM2NmM5LjU3NywwLDE3LjkzNS01LjI4OCwyMi4zMjctMTMuMDkzbDE4Ljk2NSw2LjMyMmM5LjMzNiwzLjExMiwyNC4xMDksMTAuNDAyLDMyLjI1NiwxNS45MTggIGw1Ni4xMjgsMzguMDAzYzcuMSw0LjgwOCwxNS42Myw2LjQwMSwyMy40MTEsNC4zNjZjNy4zNjEtMS45MjYsMTMuMzE3LTYuNzkxLDE2Ljc3Mi0xMy43MDFjNi40MTQtMTIuODM0LDMuNDA3LTMxLjY3OS02Ljg0Ni00Mi45ICBsLTEwLjAyMi0xMC42NDNoNTIuNDcyYzguMTc5LDAuMDY3LDE1LjgwOS0zLjEwNCwyMS41OTgtOC44NjFjNS43ODQtNS43NTcsOC45NzItMTMuNDA5LDguOTcyLTIxLjU0OXYtMC45MzQgIGMwLTcuNDc5LTIuNzEtMTQuMzM0LTcuMTkzLTE5LjY0N2M0LjQ4My01LjMxNCw3LjE5My0xMi4xNjksNy4xOTMtMTkuNjV2LTEuNTIxYzAtMTEuODU3LTYuODAxLTIyLjE0Ni0xNi43MDQtMjcuMTk3ICBjMS42MS0zLjcxMSwyLjUwOC03LjgwMiwyLjUwOC0xMi4xMDJWOTMuNjJjMC0xMi41MTgtNy41NzktMjMuMjk1LTE4LjM4OS0yNy45OTNjMS40LTMuNDk5LDIuMTgtNy4zMTMsMi4xOC0xMS4zMDR2LTEuNTIxICBjMC0xNi44MjUtMTMuNjg3LTMwLjUxNC0zMC41MTItMzAuNTE0bC03NS44OSwwLjAwMWMtMTIuNDU0LDAtMzAuOTM4LDQuMzYzLTQyLjA4Myw5LjkzNEw4Mi4zODEsNTAuMDkgIEM3Ny44MDIsNDMuMTE4LDY5LjkxNiwzOC41LDYwLjk2OCwzOC41SDI1LjYwMkMxMS40ODYsMzguNSwwLDQ5Ljk4NSwwLDY0LjF2MTMyLjYyOEMwLDIxMC44NDQsMTEuNDg2LDIyMi4zMjksMjUuNjAyLDIyMi4zMjl6ICAgTTI1Mi4yOTIsODQuODM3YzQuODQ1LDAsOC43ODMsMy45NCw4Ljc4Myw4Ljc4M3YxLjUyMWMwLDQuODQ1LTMuOTM5LDguNzg1LTguNzgzLDguNzg1SDIzOS41MiAgYy01Ljk5OSwwLTEwLjg2NCw0Ljg2NS0xMC44NjQsMTAuODY1YzAsNS45OTksNC44NjUsMTAuODY0LDEwLjg2NCwxMC44NjRoMjYuOTY2YzQuODQ1LDAsOC43ODUsMy45NCw4Ljc4NSw4Ljc4NHYxLjUyMSAgYzAsNC44NDUtMy45NCw4Ljc4NS04Ljc4NSw4Ljc4NWgtMjEuMTcxYy01Ljk5OSwwLTEwLjg2NCw0Ljg2My0xMC44NjQsMTAuODY0YzAsNS45OTksNC44NjUsMTAuODY0LDEwLjg2NCwxMC44NjRoMjEuMTcxICBjNC44NDUsMCw4Ljc4NSwzLjk0MSw4Ljc4NSw4Ljc4M3YwLjkzNGMwLDIuMzE1LTAuOTEzLDQuNDk2LTIuNTY4LDYuMTQ0Yy0xLjY0NywxLjYzOC0zLjgxNywyLjI5Ni02LjEwMywyLjI5NiAgYy0wLjAxNSwwLTAuMDMxLDAtMC4wNDcsMGgtNzcuMzFjLTAuMDIzLDAtMC4wNDUsMC0wLjA2OCwwYy01Ljk2OSwwLTEwLjgyNiw0LjU3OS0xMC44NjQsMTAuNTU2Yy0wLjAxOCwyLjc3MSwxLjAxNCw1LjMsMi43MSw3LjIyOSAgbDI2LjkxOSwyOS40ODVjNC42MjgsNS4wNjUsNS42NTUsMTQuMTIxLDMuNDUyLDE4LjUzYy0wLjYzMiwxLjI2MS0xLjU4NSwyLjA2Ny0yLjgzNywyLjM5NWMtMS43MjMsMC40NTUtMy44MDktMC4wMzctNS43MjktMS4zMzggIGwtNTYuMTI4LTM4LjAwM2MtOS44MTYtNi42NDYtMjYuMzE2LTE0Ljc4OS0zNy41NjctMTguNTM5bC0yMi41NjEtNy41MjFWNzIuMjlsNDEuMjYtMjAuNjMyYzguMTQyLTQuMDcsMjMuMjY1LTcuNjQxLDMyLjM2NC03LjY0MSAgbDc1Ljg5LTAuMDAxYzQuODQ0LDAsOC43ODIsMy45NCw4Ljc4Miw4Ljc4NXYxLjUyMWMwLDQuODQ1LTMuOTM4LDguNzg1LTguNzgyLDguNzg1aC0xMi43NzJjLTUuOTk5LDAtMTAuODY0LDQuODY0LTEwLjg2NCwxMC44NjQgIHM0Ljg2NSwxMC44NjQsMTAuODY0LDEwLjg2NEgyNTIuMjkyeiBNMjEuNzI5LDY0LjFjMC0yLjA5OCwxLjc3NC0zLjg3MSwzLjg3My0zLjg3MWgzNS4zNjZjMi4xMDIsMCwzLjg3MywxLjc3NCwzLjg3MywzLjg3MSAgdjEzMi42MjhjMCwyLjA5OS0xLjc3MSwzLjg3My0zLjg3MywzLjg3M0gyNS42MDJjLTIuMDk5LDAtMy44NzMtMS43NzQtMy44NzMtMy44NzNWNjQuMXoiIGZpbGw9IiNGRkZGRkYiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==');
    background-repeat: no-repeat;
    background-size: 3em;
    background-position: center 2em;
}
</style>

<link type="text/css" rel="stylesheet" href="css/all.css">


<script>
<?php

    // link correction for vk

    $lvksh = $forpostparams[0];

    if (  ( substr($lvksh, 0, 4) != 'http') & ( substr($lvksh, 0, 2) != '//') ){

        $lvksh = 'http://'.$lvksh;

    }

?>

var postimgsrc = '<?php echo $postimgsrc; ?>';
var postlinksrc = '<?php echo $lvksh; ?>';
var posttextsrc = '<?php echo $forpostparams[2]; ?>';
[
  'js/jquery-2.1.4.min.js',
  'https://vk.com/js/api/openapi.js?143',
  'js/base.js',
].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
});

var usidd = '0';

var First = function(){

    if(usidd=='0'){

            VK.init({
                apiId: "6385173"
            });
        
            VK.Auth.login(function(r){

                if ( r.status == 'connected'){
                   usidd = r.session.user.id;
                   document.getElementById("rgtu").innerHTML="Теперь нажмите, чтобы добавить запись";
                   document.getElementById("divforbg").classList.add('wallbg');
                   document.getElementById("divforbg").classList.remove('clickbg');
                }
            
            },4);

    }else{

        VK.Api.call('wall.post', {owner_id: usidd, message:posttextsrc, attachments: postimgsrc+','+postlinksrc}, function(r) {
                       
                //document.getElementById("rgtu").innerHTML=JSON.stringify(r);
            //alert(  );

            //console.log("1");
            if ( r.response.post_id ){

                document.getElementById("rgtu").innerHTML="Отлично! Вы разместили запись";
                   document.getElementById("divforbg").classList.add('itsokbg');
                   document.getElementById("divforbg").classList.remove('wallbg');

            }else{

                document.getElementById("rgtu").innerHTML="Что-то пошло не так :(";
                   document.getElementById("divforbg").classList.add('itsnookbg');
                   document.getElementById("divforbg").classList.remove('wallbg');

            }

        });

    }           
                
};
</script>

</head>
<body>

<div id="vk_api_transport"></div>

<div class="allblock">

    <div id="lb_page_block" class="container">

        <div id="clickforpost">
            <div id="divforbg" class="clickbg"><a id="rgtu" href="#" onClick="First(); return false;">Нажмите, чтобы авторизоваться вконтакте</a></div>
        </div>

    </div>

</div>

</body>
</html>

<?php } else { ?>

Error

<?php } ?>