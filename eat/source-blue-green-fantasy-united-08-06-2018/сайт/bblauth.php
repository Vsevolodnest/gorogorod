<?php if ( $_GET['llbappkey']==1 ){

  // VK //-------------------------------------------------------------------

  if ( isset($_GET['code']) ){

    $llburl = 'https://oauth.vk.com/access_token?client_id=6385170&client_secret=BXqJldIpueMGXjx8fATr&redirect_uri=http://s.geekks.com/social/bblauth.php?llbappkey=1&code='.$_GET['code'];

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $llburl);

    $data = curl_exec($ch);
    curl_close($ch);

    $vkjson = json_decode($data);

    //print_r( $vkjson->user_id ); // ->access_token

    if( $vkjson->user_id ){
      $userisvk = 'true';
      $uservk = $vkjson->user_id;
    }else{
      $userisvk = 'false';
      $uservk = '-';
    }

    //exit();

  }

  // ! VK //-------------------------------------------------------------------

  // FB //-------------------------------------------------------------------

  session_start();

  require_once __DIR__ . '/php-graph-sdk-5-0-0/src/Facebook/autoload.php';

  $fb = new Facebook\Facebook([
    'app_id' => '147426082737215',
    'app_secret' => 'd5a024e31a58db57e2a5de0d516b1255',
    //'default_graph_version' => 'v2.4',
  ]);

  $helper = $fb->getRedirectLoginHelper();
  $loginUrl = '';

  $permissions = ['public_profile'];
  
  if(  isset($_GET['fb']) && $_GET['fb'] == '1'  ){

        $fbauth = true;

        try {
          $accessToken = $helper->getAccessToken();
        } catch (Exception $e) {
          $fbauth = false;
        }
          
        if ($fbauth){


                $oAuth2Client = $fb->getOAuth2Client();

                $tokenMetadata = $oAuth2Client->debugToken($accessToken);

                $an_array = (array) $tokenMetadata;

                $new_arr = array();

                foreach ($an_array as $key => $value) {

                  $key2 = ($key{0} === "\0") ? substr($key, strpos($key, "\0", 1) + 1) : $key;

                  $new_arr[$key2] = $value;

                }

                $userisvk2 = 'true';
                $uservk2 = $new_arr["metadata"]["user_id"];

        } else{

          $loginUrl = $helper->getLoginUrl('http://s.geekks.com/social/bblauth.php?llbappkey=1&fb=1', $permissions); //http://s.geekks.com/social/fbcallback.php
          $userisvk2 = 'false';
          $uservk2 = '-';

        }


  }else{

    $loginUrl = $helper->getLoginUrl('http://s.geekks.com/social/bblauth.php?llbappkey=1&fb=1', $permissions); //http://s.geekks.com/social/fbcallback.php
    $userisvk2 = 'false';
    $uservk2 = '-';

  }

  // ! FB //-------------------------------------------------------------------

  // GP //-------------------------------------------------------------------

  // ссылка 
  /*
$gp_client_id = '221723025336-6494uursrvl15m88npmrccju1tqmdmb3.apps.googleusercontent.com'; //'221723025336-0vcivk98gdligvs9h8hp3p97tvve3vnu.apps.googleusercontent.com'; // Client ID
$gp_client_secret = 'A-GVg-6LEb-UmZRXJhTvn3jl'; // 'Lwg6xPsg1W4T6wk4ax7pJHMd'; // Client secret
$gp_redirect_uri = 'http://s.geekks.com/social/bblauth.php?llbappkey=1&gp=1'; // Redirect URI

$gp_url = 'https://accounts.google.com/o/oauth2/auth?'
. 'redirect_uri=' . urlencode($gp_redirect_uri)
. '&response_type=code'
. '&client_id=' . $gp_client_id
. '&scope=' . urlencode('profile'); // https://www.googleapis.com/auth/userinfo.profile


  if(  isset($_GET['gp']) && $_GET['gp'] == '1'  ){

    if (isset($_GET['code'])) {

      $gp_result = false;

      $gp_params = array( 
          'code' => $_GET['code'],
          'client_id' => $gp_client_id,
          'client_secret' => $gp_client_secret,
          'redirect_uri' => $gp_redirect_uri,
          'grant_type' => 'authorization_code'
      );

      $gp_url2 = 'https://accounts.google.com/o/oauth2/token';

      $curl = curl_init();
      curl_setopt($curl, CURLOPT_URL, $gp_url2);
      curl_setopt($curl, CURLOPT_POST, 1);
      //curl_setopt($curl, CURLOPT_POSTFIELDS, $gp_params);

      curl_setopt($curl, CURLOPT_POSTFIELDS, $gp_params); 

      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
      $gp_result = curl_exec($curl);
      curl_close($curl);
       
      $gp_tokenInfo = json_decode($gp_result, true);

      if ( isset($gp_tokenInfo['access_token']) ) {

        $gp_params['access_token'] = $gp_tokenInfo['access_token'];
        */
/*
        $gp_url3 = 'https://www.googleapis.com/oauth2/v1/userinfo?'
        . 'code=' . urldecode($_GET['code'])
        . '&client_id=' . urldecode($params['client_id'])
        . '&client_secret=' . urldecode($params['client_secret'])
        . '&redirect_uri=' . urldecode($params['redirect_uri'])
        . '&grant_type=' . urldecode($params['grant_type'])
        //. '&key=' . 'AIzaSyANiYnzU416Zqa_bwuyZynecid7iHXFiNs'
        . '&access_token=' . urldecode($params['access_token']); */
/*
        $gp_url3 = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' . $gp_tokenInfo['access_token'];
        
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_URL, $gp_url3);

        $gp_userInfo = curl_exec($ch);
        curl_close($ch);

        $gp_userInfo = json_decode($gp_userInfo, true);

        if (  isset( $gp_userInfo['id'] )  ) {
            $userisvk3 = 'true';
            $uservk3 = $gp_userInfo['id'];
        }else{
            $userisvk3 = 'false';
            $uservk3 = '-';
        }
        */
      /*
        if (isset($gp_userInfo['id'])) {

          $gp_userInfo = $gp_userInfo;
          $gp_result = true;

        }*/
/*
      }else{
            $userisvk3 = 'false';
            $uservk3 = '-';
        }

    }else{
            $userisvk3 = 'false';
            $uservk3 = '-';
        }

  }else{
            $userisvk3 = 'false';
            $uservk3 = '-';
        }
*/
  // ! GP //-------------------------------------------------------------------

?>

<!DOCTYPE html>
<html lang="ru">
<head>

    <meta charset="utf-8" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="msapplication-tap-highlight" content="no" />
    <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1,width=device-width, height=device-height, target-densitydpi=device-dpi" />

<title>Фентези Юнайтед</title>

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
</style>

<link type="text/css" rel="stylesheet" href="css/all.css">
<link type="text/css" rel="stylesheet" href="css/images.css">

<script>

<?

  if ( isset($_GET['ttopas']) ){


    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, 'http://s.geekks.com/auth-by-token?token='.$_GET['ttopas']);

    $data = curl_exec($ch);
    curl_close($ch);

    $passjson = json_decode($data);

    if( isset($passjson->data->login) && isset($passjson->data->password) ){
    
      echo 'var log_memory = true, log_memory_is = "'.$passjson->data->login.'", pass_memory_is = "'.$passjson->data->password.'";';

    }else{
    
      echo 'var log_memory = false;';

    }

  }else{
    
    echo 'var log_memory = false;';

  }

?>

var userisinstagram = 'false', userisinstagram2 = 'false';/*, userisinstagram3 = 'false';*/ var fblink = '<?= $loginUrl ?>'; //var gp_link = '<?php //$gp_url; ?>'; //htmlspecialchars()
[
  'js/jquery-2.1.4.min.js',
  'js/auth.js',
].forEach(function(src) {
  var script = document.createElement('script');
  script.src = src;
  script.async = false;
  document.head.appendChild(script);
}); var userinstagram = '<?= $uservk; ?>', userinstagram2 = '<?= $uservk2; ?>';/*, userinstagram3 = '<?= $uservk3; ?>';*/ userisinstagram = '<?= $userisvk; ?>'; userisinstagram2 = '<?= $userisvk2; ?>';// userisinstagram3 = '<?= $userisvk3; ?>';
</script>

</head>
<body>
    
<div id="vk_api_transport"></div>

<div class="allblock">

    <div id="all_alert">
        <div id="all_alert_text">Предупреждение</div>
        <div id="all_alert_ok">OK</div>
    </div>

  <div class="preloader"><div></div></div>
  
  <div id="lb_page_block" class="container"></div>

</div>

</body>
</html>

<?php } else { ?>

Error

<?php } ?>