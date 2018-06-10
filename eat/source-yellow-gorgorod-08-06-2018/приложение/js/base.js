var

url = 'http://gg.geekks.com',

G_token = '', urlforkupactivation = '', repostparams='', firstget=true, device_key_G = '',

now = new Date(),
month = now.getMonth(),
date = now.getDate(),
day = now.getDay(),
daystr='',
daystr2='',
monthstr='',
set_coupon_id ='',
set_post=false;

switch (day) {
  case 0: daystr = 'вс'; daystr2 = 'Воскресенье'; break;
  case 1: daystr = 'пн'; daystr2 = 'Понедельник'; break;
  case 2: daystr = 'вт'; daystr2 = 'Вторник'; break;
  case 3: daystr = 'ср'; daystr2 = 'Среда'; break;
  case 4: daystr = 'чт'; daystr2 = 'Четверг'; break;
  case 5: daystr = 'пт'; daystr2 = 'Пятница'; break;
  case 6: daystr = 'сб'; daystr2 = 'Суббота'; break;
}

switch (month) {
  case 0: monthstr = 'января'; break;
  case 1: monthstr = 'февраля'; break;
  case 2: monthstr = 'марта'; break;
  case 3: monthstr = 'апреля'; break;
  case 4: monthstr = 'мая'; break;
  case 5: monthstr = 'июня'; break;
  case 6: monthstr = 'июля'; break;
  case 7: monthstr = 'августа'; break;
  case 8: monthstr = 'сентября'; break;
  case 9: monthstr = 'октября'; break;
  case 10: monthstr = 'ноября'; break;
  case 11: monthstr = 'декабря'; break;
}

var Base64 = {
   _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
   //метод для кодировки в base64 на javascript
  encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0
    input = Base64._utf8_encode(input);
       while (i < input.length) {
       chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
       enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
       if( isNaN(chr2) ) {
         enc3 = enc4 = 64;
      }else if( isNaN(chr3) ){
        enc4 = 64;
      }
       output = output +
      this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
      this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
     }
    return output;
  },
 
   //метод для раскодировки из base64
  decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
     input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
     while (i < input.length) {
       enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));
       chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
       output = output + String.fromCharCode(chr1);
       if( enc3 != 64 ){
        output = output + String.fromCharCode(chr2);
      }
      if( enc4 != 64 ) {
        output = output + String.fromCharCode(chr3);
      }
   }
   output = Base64._utf8_decode(output);
     return output;
   },
   // метод для кодировки в utf8
  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
       if( c < 128 ){
        utftext += String.fromCharCode(c);
      }else if( (c > 127) && (c < 2048) ){
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
     }
    return utftext;
 
  },
 
  //метод для раскодировки из urf8
  _utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
    while( i < utftext.length ){
      c = utftext.charCodeAt(i);
       if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }else if( (c > 191) && (c < 224) ) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
     }
     return string;
  }
 };

var 

//слайды
this_slide=0,
quiz_s = [],
this_fact=0,
fact_s =[],
mySwiper = {},
clicknextslide = true,
clicknextslideTimeout = {},

//вопросы   
q_id_before_play = '',
srv_q_data = [],
qst_s = [],
this_qq = 0,
ans_s = [],
//'{"answers":[{"question_id":1,"is_correct":true},{"question_id":2,"is_correct":false}]}'
ans_reslt_arr = [],
ans_reslt_str = '',
    
allAlert = function(str){

    jQuery("#all_alert_text").text(str);
    jQuery("#all_alert").css({'display':'block'});

},

nextSlide = function(anima){

    if(clicknextslide){

        clicknextslide = false;
        clearTimeout(clicknextslideTimeout);
        clicknextslideTimeout = setTimeout( function(){ clicknextslide = true; }, 100);

        this_slide +=1;
        
        if ( !quiz_s[this_slide] ){
            this_slide = 0;
        }

        jQuery('#sl_gl_title').text( quiz_s[this_slide].title );

        if(anima){

            jQuery('#mySwipe3').slick('slickNext');
            
        }
    }

},

prevSlide = function(anima){

    if(clicknextslide){

        clicknextslide = false;
        clearTimeout(clicknextslideTimeout);
        clicknextslideTimeout = setTimeout( function(){ clicknextslide = true; }, 100);

        this_slide -=1;
        
        if ( this_slide<0 ){
            this_slide = quiz_s.length-1;
        }

        jQuery('#sl_gl_title').text( quiz_s[this_slide].title );

        if(anima){

            jQuery('#mySwipe3').slick('slickPrev');
        
        }
    }

},

nextFact = function(){

    this_fact +=1;
    
    if ( !fact_s[this_fact] ){
        this_fact = 0;
    }

    jQuery('#fact_lg_title').text( fact_s[this_fact].title );
    jQuery('#fact_lg_body').text( fact_s[this_fact].body );

    if(this_fact==0){

        jQuery('#indul li:eq('+(fact_s.length-1)+')').removeClass("actindi");

    }else{

        jQuery('#indul li:eq('+(this_fact-1)+')').removeClass("actindi");

    }

    jQuery('#indul li:eq('+this_fact+')').toggleClass("actindi");

},

get_general_info = function(token){

  //alert( '10^      ^   '+device_key_G );

var general_data_str = {token_key:token};

    if(firstget){

      general_data_str = {token_key:token,device_key:device_key_G};

    }

    // запрос основной инфы
    jQuery.getJSON(url+'/get-general-data', general_data_str, function( q ){

        //непройденные викторины 
        this_slide=0;
        var photo_str = '';
        quiz_s = [];

        if(q.data.new_quiz.length>=1){

              for (var i = 0; i < q.data.new_quiz.length; i++) {

                  //q.data.new_quiz[i].start_date
                  //q.data.new_quiz[i].category_id

                  quiz_s.push( { id:q.data.new_quiz[i].id, title:q.data.new_quiz[i].title } );
                  photo_str = photo_str + '<div><img src="' + url + q.data.new_quiz[i].photo + '" /></div>'; // 

              }

        }else{

          photo_str = '0';

        }

        //факты
        var li_str = '';  
        fact_s = [];                

        for (var i = 0; i < q.data.facts.length; i++) {

            for (var i = 0; i < q.data.facts.length; i++) {

                fact_s.push( { id:q.data.facts[i].id, title:q.data.facts[i].title, body:q.data.facts[i].fact_body } );
                li_str = li_str + '<li class="indicator ind1" data-num="'+i+'"></li>';

            }

        }

        if( photo_str != '0' ){
          // основная инфа //Привет, '+q.data.user.status+'
          jQuery('#lb_page_block').html('<h1 id="glh1">Привет</h1><h2 id="timeh2">Сегодня '+date+' '+monthstr+' ('+daystr+')</h2>'+
              '<div class="victimgcont">'+
              '<div id="mySwipe3">'+
              photo_str+
              '</div>'+
              //'<span>категория</span>'+
              '<div class="victtitle" id="sl_gl_title"></div>'+
              '<div class="victimgcontrolleritem victcontroller1" id="new_but_for_mein_slider_1"></div>'+
              '<div class="victimgcontrolleritem victcontroller2" id="new_but_for_mein_slider_2"></div>'+
              '</div>'+
              '<div id="playgamecontainer"><div id="playgamenow">Играть</div></div>'+
              '<div id="mySwipe2" class="swipe2">'+
              '<div class="swipe-wrap"><div id="fact_lg_title"></div><div id="fact_lg_body"></div></div></div>'+
              '<div class="indcont"><ul id="indul">'+li_str+'</ul></div>');

              jQuery('#sl_gl_title').text( quiz_s[0].title );

        }else{

          jQuery('#lb_page_block').html('<h1 id="glh1">Привет</h1><h2 id="timeh2">Сегодня '+date+' '+monthstr+' ('+daystr+')</h2>'+
              '<div class="victimgcont">'+
              '<div id="mySwipe3"></div>'+
              '<div class="victtitle" id="sl_gl_title">Викторины отсутствуют</div>'+
              '<div style="display:none" class="victimgcontrolleritem victcontroller1" id="new_but_for_mein_slider_1"></div>'+
              '<div style="display:none" class="victimgcontrolleritem victcontroller2" id="new_but_for_mein_slider_2"></div>'+
              '</div>'+
              '<div id="playgamecontainer" style="display:none"><div id="playgamenow">Играть</div></div>'+
              '<div id="mySwipe2" class="swipe2">'+
              '<div class="swipe-wrap"><div id="fact_lg_title"></div><div id="fact_lg_body"></div></div></div>'+
              '<div class="indcont"><ul id="indul">'+li_str+'</ul></div>');

        }

        var docemsize = jQuery(window).height()*.03;
        jQuery('.victimgcont span').css({"margin-left": jQuery('#mySwipe').width()-jQuery('.victimgcont span').width()-docemsize*1.2 +"px"});
        jQuery('.victimgcont span').css({"margin-top":"-"+ jQuery('#mySwipe').height()-docemsize*(-0.5) +"px"});
    
        jQuery('#mySwipe3').slick({arrows:false,mobileFirst:true,waitForAnimate:true,speed:100}); //,useTransform:false

        jQuery('#mySwipe3').on('swipe', function(event, slick, direction){
          if(direction=='left'){
            nextSlide(false);
          }else{
            prevSlide(false);
          }
        });

        //факты
        jQuery('#fact_lg_title').text( fact_s[0].title );
        jQuery('#fact_lg_body').text( fact_s[0].body );
        jQuery('#indul li:eq(0)').toggleClass("actindi");

        jQuery("#mySwipe2").data('factsSlideAnimation',setInterval(function(){

            nextFact();

        }, 5000));

        if( !jQuery('.appnewsblock').length ){
            //новости
            var newsstr = '';

            for (var i = 0; i < q.data.news.length; i++) {

                //q.data.news[i].id

                var news_date_rerr = new Date(q.data.news[i].start_date*1000);
                var news_day_rerr = '', news_month_rerr = '', news_h_rerr = '', news_min_rerr = '';
                
                if ( news_date_rerr.getDate() < 9 ){
                    news_day_rerr = '0' + news_date_rerr.getDate();
                }else{
                    news_day_rerr = news_date_rerr.getDate();
                }

                if ( news_date_rerr.getMonth() < 9 ){
                    news_month_rerr = '0' + (news_date_rerr.getMonth()+1);
                }else{
                    news_month_rerr = (news_date_rerr.getMonth()+1);
                }

                if ( news_date_rerr.getHours() < 9 ){
                    news_h_rerr = '0' + news_date_rerr.getHours();
                }else{
                    news_h_rerr = news_date_rerr.getHours();
                }

                if ( news_date_rerr.getMinutes() < 9 ){
                    news_min_rerr = '0' + news_date_rerr.getMinutes();
                }else{
                    news_min_rerr = news_date_rerr.getMinutes();
                }

                //, '+news_h_rerr+':00
                newsstr = '<div class="appnewstitle">'+q.data.news[i].title+'<br/><span>'+news_day_rerr+'.'+news_month_rerr+'</span></div>'+'<div class="appnewsstring">'+q.data.news[i].news_body+'</div>' + newsstr;

                //q.data.news[i].start_date
            }

            jQuery('.allblock').prepend('<div class="appnewsblock"></div>'+
                '<div class="appnewscont dnone"><div class="container" id="newscont_lb">'+
                '<h1 id="weekdayh1">'+daystr2+'</h1>'+
                '<h2 id="dateinnewsh2">'+date+' '+monthstr+'</h2>'+
                '<div id="news_items_cont" class="lbClass_news_items_cont">'+
                newsstr+'</div></div></div>');
                    
            jQuery('#newscont_lb').css({"padding-top":jQuery(window).height()*.1});

            jQuery('#news_items_cont').css({"height":jQuery(window).height()*.7}); 
        }

        if( !jQuery('.menuvictcont').length ){
            //меню

            jQuery('.allblock').prepend('<div class="menublock"></div><div class="menucont dnone"><div class="container" id="menucont_lb">'+
                '<h1 id="nameh1">'+q.data.user.login+'</h1>'+
                '<h2 id="reyth2">'+q.data.user.rating+'</h2>'+
                '<h3 class="menuh3">Пройденные викторины:</h3>'+
                '<div class="scrollblockmay"></div><div class="categorybut" id="dost">Достижения</div><div class="categorybut" id="kup">Купоны</div><div id="pravila_button" class="smallfont">Правила</div><div id="kontakti_button" class="smallfont">Контакты</div></div></div>');
                    
          jQuery('.scrollblockmay').css({"height":jQuery(window).height()*.3});  
            jQuery('#menucont_lb').css({"padding-top":jQuery(window).height()*.1});
        }

            //пройденные викторины
            var menustr = '';
            for (var i = 0; i < q.data.ended_quiz.length; i++) {


                var news_date_rerr02 = new Date(q.data.ended_quiz[i].start_date*1000);
                var news_day_rerr02 = '', news_month_rerr02 = '', news_y_rerr02 = '';
                
                if ( news_date_rerr02.getDate() < 9 ){
                    news_day_rerr02 = '0' + news_date_rerr02.getDate();
                }else{
                    news_day_rerr02 = news_date_rerr02.getDate();
                }

                if ( news_date_rerr02.getMonth() < 9 ){
                    news_month_rerr02 = '0' + (news_date_rerr02.getMonth()+1);
                }else{
                    news_month_rerr02 = (news_date_rerr02.getMonth()+1);
                }

                news_y_rerr02 = news_date_rerr02.getFullYear();

                //q.data.ended_quiz[i].id
                //q.data.ended_quiz[i].photo
                
                //q.data.ended_quiz[i].start_date
                //q.data.ended_quiz[i].category_id 

                menustr = menustr + '<div class="menuvictcont"><span class="victtypespan">'+q.data.ended_quiz[i].category_title+'</span>'+
                    '<div class="victnameinmenu">'+q.data.ended_quiz[i].title+'</div>'+
                    '<div class="vicdate">'+news_day_rerr02+'.'+news_month_rerr02+'.'+news_y_rerr02+'</div><div class="clear"></div></div>';

            }
        jQuery('.scrollblockmay').html(menustr);

        setTimeout(function() {
    
            jQuery('.preloader').fadeOut(0);
    
        }, 300);

    });

},

set_answers = function(token_ss,quiz_id_ss,answers_ss){  

    jQuery.getJSON(url+'/set-answers', {token_key:token_ss, quiz_id:quiz_id_ss, answers:answers_ss}, function( q ){
            
        if ( q.data.achivs.length != 0 ){

            for (var i = 0; i < q.data.achivs.length; i++) {

                var achparams = JSON.stringify(q.data.achivs[i]).replace(/\"/gi, "'");
                jQuery('.allblock').prepend('<div class="otherlogin_cont_new"><div class="ach_image" style="background-image:url('+url+q.data.achivs[i].photo+');"></div><div class="ach_title">'+q.data.achivs[i].title+'</div><div class="ach_body">'+q.data.achivs[i].achivs_body+'</div><div class="otherlogin_button_new otherlogin_button_new2_22" data-params="'+achparams+'">Поделиться</div><div class="otherlogin_button_new2">Продолжить</div></div>');

            }

        }
        
        if ( q.data.coupons.length != 0 ){

            for (var i = 0; i < q.data.coupons.length; i++) {

                var achparams = JSON.stringify(q.data.coupons[i]).replace(/\"/gi, "'");
                jQuery('.allblock').prepend('<div class="otherlogin_cont_new"><div class="ach_image" style="background-image:url('+url+q.data.coupons[i].photo+');"></div><div class="ach_title">'+q.data.coupons[i].title+'</div><div class="ach_body">'+q.data.coupons[i].coupons_body+'</div><div class="otherlogin_button_new new_cup_list_item_button" data-params="'+achparams+'">Поделиться</div><div class="otherlogin_button_new2">Продолжить</div></div>');

            }

        }

            setTimeout(function() {
        
                jQuery('.preloader').fadeOut(0);
        
            }, 300);

        get_general_info( G_token );

    });
},

get_quiz_questions = function(token,q_id){

    jQuery('.preloader').fadeIn(0);

    jQuery.getJSON(url+'/get-quiz-questions', {token_key:token, quiz_id:q_id}, function( q ){

        //вопросы
        qst_s = [];
        for (var i = 0; i < q.data.questions.length; i++) {

            /*
            q.data.questions[i].id
            q.data.questions[i].question_body
            q.data.questions[i].photo
            q.data.questions[i].correct_alert
            q.data.questions[i].wrong_alert
            */

            qst_s.push( { id:q.data.questions[i].id, body:q.data.questions[i].question_body, photo:q.data.questions[i].photo, correct_alert:q.data.questions[i].correct_alert, wrong_alert:q.data.questions[i].wrong_alert } );

        } 

        //ответы
        
        var ansssstring = '';
        ans_s = [];
        this_qq = 0;

        if( q.data.questions[this_qq] ){

            for (var i = 0; i < q.data.questions[this_qq].answers.length; i++) {

                /*
                q.data.questions[i].answers[j].id
                q.data.questions[i].answers[j].answer_body
                q.data.questions[i].answers[j].is_correct
                */

                ans_s.push( {answer_body:q.data.questions[this_qq].answers[i].answer_body, is_correct:q.data.questions[this_qq].answers[i].is_correct} );
                ansssstring = ansssstring + '<div class="qvariant">'+ans_s[i].answer_body+'</div>';

            }

            srv_q_data = q.data.questions;

            jQuery('#lb_page_block').html('<h1 id="qh1">Вопрос (1 из '+qst_s.length+'):</h1>'+
            '<div class="qimgblock" style="background-image:url('+url+qst_s[this_qq].photo+');"></div>'+
            '<div class="qtext">'+qst_s[this_qq].body+'</div>'+
            '<div id="lg_qvar_cont">'+ansssstring+'</div>'+
            '<div class="smallfont margintop" id="backbut">На главную</div>'+
            '<div class="smallfont margintop" id="nextqbut">Далее</div>');

            setTimeout(function() {
        
                jQuery('.preloader').fadeOut(0);
        
            }, 300);

        } else {

            allAlert("В викторине отсутствуют вопросы!");

            get_general_info( G_token );

        }


    });

};

// -------------------------------------------------------------------------------------------------

// ок в оповещении
jQuery(".allblock").on('click', '#all_alert_ok', function(){
    jQuery("#all_alert").css({'display':'none'});
});

// открыть\закрыть новости
jQuery(".allblock").on('click', '.appnewsblock', function(){
    jQuery(".appnewsblock").toggleClass("appnewsexit");
    jQuery(".appnewscont").toggleClass("dnone");
});

// открыть\закрыть меню
jQuery(".allblock").on('click', '.menublock', function(){
    jQuery(".menublock").toggleClass("menuexit");
    jQuery(".menucont").toggleClass("dnone");
});

// слайд вправо
jQuery("#lb_page_block").on('click', '#new_but_for_mein_slider_2', function(){
    if( clicknextslide ){
        nextSlide(true);
    }
});

// слайд влево
jQuery("#lb_page_block").on('click', '#new_but_for_mein_slider_1', function(){
    if( clicknextslide ){
        prevSlide(true);
    }
});

// выбор варианта ответа
jQuery("#lb_page_block").on('click', '.qvariant', function(){
    jQuery('.qvariant').removeClass('reg_chkd_2');
    jQuery(this).addClass("reg_chkd_2");
});

// пройти викторину
jQuery("#lb_page_block").on('click', '#playgamenow', function(){

    clearInterval( jQuery('.victimgcont').data('victSlideAnimation') );
    clearInterval( jQuery('#mySwipe2').data('factsSlideAnimation') );
    jQuery("#lb_page_block").html('');
    q_id_before_play = quiz_s[this_slide].id;
    get_quiz_questions(G_token,q_id_before_play);

});

// ответить на вопрос
jQuery("#lb_page_block").on('click', '#nextqbut', function(){

    if ( jQuery(".qvariant").is(".reg_chkd_2") ){

        for (var i = 0; i < ans_s.length; i++) {

            if( ans_s[i].answer_body == jQuery('.reg_chkd_2').text() ){

                if (ans_s[i].is_correct){

                    ans_reslt_arr.push('{"question_id":'+qst_s[this_qq].id+',"is_correct":true, "answer_id":'+(i+1)+'}');
                    jQuery("#gl_question_alert").removeClass("redalert");
                    jQuery("#gl_question_alert").addClass("greenalert");
                    jQuery("#alert_h1").text("Отлично!");
                    jQuery("#alert_text").text(qst_s[this_qq].correct_alert);

                }else{

                    ans_reslt_arr.push('{"question_id":'+qst_s[this_qq].id+',"is_correct":false, "answer_id":'+(i+1)+'}');
                    jQuery("#gl_question_alert").removeClass("greenalert");
                    jQuery("#gl_question_alert").addClass("redalert");
                    jQuery("#alert_h1").text("Не верно :(");
                    jQuery("#alert_text").text(qst_s[this_qq].wrong_alert);

                }

            }            
         
        }
        
        jQuery('#gl_question_alert').removeClass('dnone');

    }else{
            
            allAlert("Необходимо выбрать вариант ответа");

    }


});

// вернуться к главному экрану
jQuery("#lb_page_block").on('click', '#backbut', function(){
    get_general_info( G_token );
});

// скрыть окно оповещение о результате ответа на вопрос
jQuery(".allblock").on('click', '#ok_alert', function(){

    var ansssstring = '';

    this_qq += 1;
    ans_s = [];

    if( qst_s[this_qq] ){

        jQuery('.preloader').fadeIn(0);

        for (var i = 0; i < srv_q_data[this_qq].answers.length; i++) {

            ans_s.push( {answer_body:srv_q_data[this_qq].answers[i].answer_body, is_correct:srv_q_data[this_qq].answers[i].is_correct} );
            ansssstring = ansssstring + '<div class="qvariant">'+ans_s[i].answer_body+'</div>';

        }

        jQuery('#qh1').text('Вопрос ('+(this_qq+1)+' из '+qst_s.length+'):');
        jQuery('.qimgblock').css({"background-image":"url("+url+qst_s[this_qq].photo+")"});
        jQuery('.qtext').text(qst_s[this_qq].body);
        jQuery('#lg_qvar_cont').html(ansssstring);
        
        setTimeout(function() {
    
            jQuery('.preloader').fadeOut(0);
    
        }, 300);

    }else{

        var q_res_str = '';

        jQuery('.preloader').fadeIn(0);
        for (var i = 0; i < ans_reslt_arr.length; i++) {

            q_res_str = q_res_str + ans_reslt_arr[i];

            if( i != (ans_reslt_arr.length-1) ){
                q_res_str = q_res_str + ',';
            }

        }

        set_answers(G_token,q_id_before_play,'['+q_res_str+']'); //"answers":
        ans_reslt_arr = [];

    }

    jQuery('#gl_question_alert').addClass('dnone');

});

// перейти к выбранному факту на главной
jQuery(".allblock").on('click', '.indicator.ind1', function(){

    if ( !jQuery(this).hasClass('actindi') ){

        clearInterval(  jQuery("#mySwipe2").data('factsSlideAnimation') );

        jQuery('.actindi').removeClass("actindi");

        this_fact = parseInt( jQuery(this).attr('data-num') ) - 1;
        
        nextFact();

        jQuery("#mySwipe2").data('factsSlideAnimation',setInterval(function(){

            nextFact();

        }, 5000));

    }

});

// поделиться новым достижением
jQuery(".allblock").on('click', '.otherlogin_button_new2_22', function(){

    urlforkupactivation = JSON.parse( jQuery(this).attr('data-params').replace(/\'/gi, "\"").replace(/\&/gi, "\%26") );

    set_post = false;

    repostparams = urlforkupactivation.url+'&&'+url+urlforkupactivation.photo+'&&'+urlforkupactivation.achivs_body+'&&'+urlforkupactivation.fullurl;
    
    repostparams = Base64.encode(repostparams).replace(/\+/gi, "\-");

    urlforkupactivation = 'http://gg.geekks.com/social/posttovk.php?llbappkey=1%26repostparams='+repostparams;

    jQuery(".allblock").prepend('<div id="reposttosoc_button"><div id="reposttosoc_title">Выберите социальную сеть:</div><div id="reposttosoc_vk">ВКонтакте</div><div id="reposttosoc_fb">Facebook</div><div id="reposttosoc_close">Вернуться к списку</div></div>');


});

jQuery(".allblock").on('click', '.new_cup_list_item_button', function(){

    urlforkupactivation = JSON.parse( jQuery(this).attr('data-params').replace(/\'/gi, "\"").replace(/\&/gi, "\%26") );

    set_post = true;    
    set_coupon_id = urlforkupactivation.id;
  
    repostparams = urlforkupactivation.url+'&&'+url+urlforkupactivation.photo+'&&'+urlforkupactivation.coupons_body+'&&'+urlforkupactivation.fullurl;
    
    repostparams = Base64.encode(repostparams).replace(/\+/gi, "\-");

    urlforkupactivation = 'http://gg.geekks.com/social/posttovk.php?llbappkey=1%26repostparams='+repostparams;

    jQuery(".allblock").prepend('<div id="reposttosoc_button"><div id="reposttosoc_title">Выберите социальную сеть:</div><div id="reposttosoc_vk">ВКонтакте</div><div id="reposttosoc_fb">Facebook</div><div id="reposttosoc_close">Вернуться к списку</div></div>');


});

// скрыть оповещение о новом достижении
jQuery(".allblock").on('click', '.otherlogin_button_new2', function(){

    jQuery(this).parent('.otherlogin_cont_new').remove();

});


// открыть список достижений
jQuery(".allblock").on('click', '#dost', function(){

    jQuery('#lb_page_block').html('<h1 id="dosth1">Достижения:</h1><div id="list_kup_dost_kont"></div><div class="smallfont margintop" id="backbut">На главную</div>');
    jQuery('#list_kup_dost_kont').css({"height":jQuery(window).height()*.6});  

    jQuery.getJSON(url+'/get-achivs-list', {token_key:G_token}, function( q ){

        if ( q.data.achivs.length != 0 ){

            for (var i = 0; i < q.data.achivs.length; i++) {

                var achparams = JSON.stringify(q.data.achivs[i]).replace(/\"/gi, "'");
                jQuery('#list_kup_dost_kont').prepend('<div class="ach_list_item" style="background-image:url('+url+q.data.achivs[i].photo+');"><div class="ach_list_item_title">'+q.data.achivs[i].title+'</div><div class="ach_list_item_body">'+q.data.achivs[i].achivs_body+'</div><div class="ach_list_item_repost" data-params="'+achparams+'">Поделиться</div></div>');

            }

        }

    });

    jQuery(".menublock").toggleClass("menuexit");
    jQuery(".menucont").toggleClass("dnone");

});

jQuery(".allblock").on('click', '.ach_list_item_repost', function(){

    set_post = false;

    urlforkupactivation = JSON.parse( jQuery(this).attr('data-params').replace(/\'/gi, "\"").replace(/\&/gi, "\%26") );

    repostparams = urlforkupactivation.url+'&&'+url+urlforkupactivation.photo+'&&'+urlforkupactivation.achivs_body+'&&'+urlforkupactivation.fullurl;
    
    repostparams = Base64.encode(repostparams).replace(/\+/gi, "\-");

    urlforkupactivation = 'http://gg.geekks.com/social/posttovk.php?llbappkey=1%26repostparams='+repostparams;

    jQuery(".allblock").prepend('<div id="reposttosoc_button"><div id="reposttosoc_title">Выберите социальную сеть:</div><div id="reposttosoc_vk">ВКонтакте</div><div id="reposttosoc_fb">Facebook</div><div id="reposttosoc_close">Вернуться к списку</div></div>');

});

// открыть список купонов
jQuery(".allblock").on('click', '#kup', function(){

    jQuery('#lb_page_block').html('<h1 id="kuph1">Купоны (бейджи):</h1><div id="list_kup_dost_kont"></div><div class="smallfont margintop" id="backbut">На главную</div>');
    jQuery('#list_kup_dost_kont').css({"height":jQuery(window).height()*.6});

    jQuery.getJSON(url+'/get-coupons-list', {token_key:G_token}, function( q ){

        if ( q.data.coupons.length != 0 ){

            for (var i = 0; i < q.data.coupons.length; i++) {

              if( q.data.coupons[i].is_direct_link == 0 ){

                var kupparams = JSON.stringify(q.data.coupons[i]).replace(/\"/gi, "'");
                jQuery('#list_kup_dost_kont').prepend('<div class="cup_list_item" style="background-image:url('+url+q.data.coupons[i].photo+');"><div class="cup_list_item_title">'+q.data.coupons[i].title+'</div><div class="cup_list_item_body">'+q.data.coupons[i].coupons_body+'</div><div class="cup_list_item_button" data-params="'+ kupparams +'">Активировать</div></div>');

              }else{

                var kupparams = JSON.stringify(q.data.coupons[i]).replace(/\"/gi, "'");
                jQuery('#list_kup_dost_kont').prepend('<div class="cup_list_item" style="background-image:url('+url+q.data.coupons[i].photo+');"><div class="cup_list_item_title">'+q.data.coupons[i].title+'</div><div class="cup_list_item_body">'+q.data.coupons[i].coupons_body+'</div><div class="cup_list_item_button" data-link="1" data-params="'+ kupparams +'">Активировать</div></div>');

              }
                

            }

        }

    });

    jQuery(".menublock").toggleClass("menuexit");
    jQuery(".menucont").toggleClass("dnone");

});

// активировать купон
jQuery(".allblock").on('click', '.cup_list_item_button', function(){

    urlforkupactivation = JSON.parse( jQuery(this).attr('data-params').replace(/\'/gi, "\"").replace(/\&/gi, "\%26") );

  set_post = true;    
  set_coupon_id = urlforkupactivation.id;

    repostparams = urlforkupactivation.url+'&&'+url+urlforkupactivation.photo+'&&'+urlforkupactivation.coupons_body+'&&'+urlforkupactivation.fullurl;
    
    repostparams = Base64.encode(repostparams).replace(/\+/gi, "\-");

    if( jQuery(this).attr('data-link') == '1' ){

      cordova.InAppBrowser.open( urlforkupactivation.url, '_system', 'location=no');

    }else{

      urlforkupactivation = 'http://gg.geekks.com/social/posttovk.php?llbappkey=1%26repostparams='+repostparams;
      jQuery(".allblock").prepend('<div id="reposttosoc_button"><div id="reposttosoc_title">Выберите социальную сеть:</div><div id="reposttosoc_vk">ВКонтакте</div><div id="reposttosoc_fb">Facebook</div><div id="reposttosoc_close">Вернуться к списку</div></div>');

    }


});

jQuery(".allblock").on('click', '#reposttosoc_close', function(){
    
    jQuery("#reposttosoc_button").remove();

});

jQuery(".allblock").on('click', '#reposttosoc_vk', function(){

  if(set_post){
      
      jQuery.getJSON(url+'/set-coupon-post', {token_key:G_token,coupon_id:set_coupon_id});

  }    
    
    cordova.InAppBrowser.open( 'https://oauth.vk.com/authorize?client_id=6385173&display=mobile&redirect_uri='+urlforkupactivation+'&scope=photos,wall&response_type=code', '_system', 'location=no');

});

jQuery(".allblock").on('click', '#reposttosoc_fb', function(){

  if(set_post){
      
      jQuery.getJSON(url+'/set-coupon-post', {token_key:G_token,coupon_id:set_coupon_id});

  }    
    
     cordova.InAppBrowser.open( 'http://gg.geekks.com/social/posttofb.php?llbappkey=1&repostparams='+repostparams, '_system', 'location=no');

});

/* Показать правила и контакты */

get_article_rules = function(token){


    jQuery('#lb_page_block').html('<h1>Правила:</h1><div id="list_kup_dost_kont"></div><div class="smallfont margintop" id="backbut">На главную</div>');
    jQuery('#list_kup_dost_kont').css({"height":jQuery(window).height()*.6});  

    jQuery.getJSON(url+'/get-article', {token_key:token, title:'rules'}, function( q ){

        if ( q.data.content.length != 0 ){

                jQuery('#list_kup_dost_kont').html(q.data.content);

        }

    });

    jQuery(".menublock").toggleClass("menuexit");
    jQuery(".menucont").toggleClass("dnone");

}

jQuery(".allblock").on('click', '#pravila_button', function(){

    get_article_rules(G_token);

});

get_article_contacts = function(token){


    jQuery('#lb_page_block').html('<h1>Контакты:</h1><div id="list_kup_dost_kont"></div><div class="smallfont margintop" id="backbut">На главную</div>');
    jQuery('#list_kup_dost_kont').css({"height":jQuery(window).height()*.6});  

    jQuery.getJSON(url+'/get-article', {token_key:token, title:'contacts'}, function( q ){

        if ( q.data.content.length != 0 ){

                jQuery('#list_kup_dost_kont').html(q.data.content);

        }

    });

    jQuery(".menublock").toggleClass("menuexit");
    jQuery(".menucont").toggleClass("dnone");

}

jQuery(".allblock").on('click', '#kontakti_button', function(){

    get_article_contacts(G_token);

});


// _____________ pushwoosh service
/*
function onPushwooshInitialized(pushNotification) {

    //if you need push token at a later time you can always get it from Pushwoosh plugin
    pushNotification.getPushToken(
        function(token) {
           //console.info('push token: ' + token);
        }
    );

    //and HWID if you want to communicate with Pushwoosh API
    pushNotification.getPushwooshHWID(
        function(token) {
            //console.info('Pushwoosh HWID: ' + token);
        }
    );

};

function initPushwoosh() {
    var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

    //set push notifications handler
    document.addEventListener('push-notification',
        function(event) {
            if (typeof(userData) != "undefined") {
                //console.warn('user data: ' + JSON.stringify(userData));
            }
        }
    );

    //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", appid : "PUSHWOOSH_APP_ID". This will trigger all pending push notifications on start.
    pushNotification.onDeviceReady({
        projectid: "722401588593",
        appid: "FDFE8-9AE20",
        serviceName: ""
    });

    //register for push notifications
    pushNotification.registerDevice(
        function(status) {
            //document.getElementById("pushToken").innerHTML = status.pushToken + "<p>";
            onPushwooshInitialized(pushNotification);
        },
        function(status) {
            //alert("failed to register: " + status);
            //console.warn(JSON.stringify(['failed to register ', status]));
        }
    );
};


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        initPushwoosh();
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
    }
};*/

// _____________ pushwoosh service


// авторизация

//window.open = cordova.InAppBrowser.open;

//var openAuthWindow = cordova.InAppBrowser.open( 'http://gg.geekks.com/bblauth.php?llbappkey=1', '_blank', 'location=no,zoom=no,toolbar=no' );

/*
openAuthWindow.addEventListener('loadstart', function(event){ 
    if (event.url.match("llbvkpost")) {
      //  cordova.InAppBrowser.open('http://eat.art-fill.ru/addwallpost.php?url='+event.url, '_system');
        //jQuery('#backtoapp').css({'display':'block'});
        //ref.close();
    }else{
        openAuthWindow.hide();
    }
});

openAuthWindow.addEventListener('loadstop', function(event) { 
    if (event.url.match("llbvkpost")) {
        //cordova.InAppBrowser.open('http://vk.com', '_system');
    }else{
        openAuthWindow.show(); 
    }      
    //alert(event);
    //if (event.url.match("mobile/close")) {
      //  ref.close();
    //}
});*/


jQuery(window).load(function() {

    //Работает со второго запуска эмулятора
    //allAlert( localStorage.getItem('registrationId') );

    var docemsize = jQuery(window).height()*.03;

    jQuery('.allblock').css({"font-size":  docemsize + "px"});
    jQuery('.container').css({"padding-top":jQuery(window).height()*.1});

    //app.initialize();


    jQuery.getJSON(url+'/test-connection', function( q ){

        if ( q.data.connection ){

            setTimeout(function() {
        
                jQuery('.preloader').fadeOut(0);
        
            }, 300);

            window.open = cordova.InAppBrowser.open;

            // get params for auth start
            //window.localStorage.setItem("app_token", "value2");

            var value_sst = window.localStorage.getItem("app_token");

            if( value_sst != null ){
                
                var first_q_get_with_params = url+'/social/bblauth.php?llbappkey=1&ttopas='+value_sst;
                
            }else{

                var first_q_get_with_params = url+'/social/bblauth.php?llbappkey=1';
            
            }
            // get params for auth end

            var ref = cordova.InAppBrowser.open( first_q_get_with_params, '_blank', 'location=no,zoom=no,toolbar=no' );

            ref.addEventListener('loadstart', function(event){ 
                
                if (event.url.match("token-was-received")) {
                    
                    G_token = event.url.substr(26);

                    window.localStorage.setItem("app_token", G_token);
                    
                    ref.close();

                    var app = {
                        // Application Constructor
                        initialize: function() {
                            this.bindEvents();
                        },
                        // Bind Event Listeners
                        //
                        // Bind any events that are required on startup. Common events are:
                        // 'load', 'deviceready', 'offline', and 'online'.
                        bindEvents: function() {
                            document.addEventListener('deviceready', this.onDeviceReady, false);
                        },
                        // deviceready Event Handler
                        //
                        // The scope of 'this' is the event. In order to call the 'receivedEvent'
                        // function, we must explicitly call 'app.receivedEvent(...);'
                        onDeviceReady: function() {
                            //alert('Received Device Ready Event');
                            //alert('calling setup push');
                            app.setupPush();
                        },
                        setupPush: function() {
                            //alert('calling push init');
                            var push = PushNotification.init({
                                "android": {
                                    "senderID": "427813495652"
                                },
                                "browser": {},
                                "ios": {
                                    "sound": true,
                                    "vibration": true,
                                    "badge": true
                                },
                                "windows": {}
                            });
                            //alert('after init');

                            push.on('registration', function(data) {
                                //alert('registration event: ' + data.registrationId);

                                //alert(token);

                                device_key_G = data.registrationId;
                                get_general_info(G_token);


                                var oldRegId = localStorage.getItem('registrationId');
                                if (oldRegId !== data.registrationId) {
                                    // Save new registration ID
                                    localStorage.setItem('registrationId', data.registrationId);
                                    // Post registrationId to your app server as the value has changed
                                }

                            });

                            push.on('error', function(e) {

                                device_key_G = 'error';
                                get_general_info(G_token);
                                //alert("push error = " + e.message);
                            });

                            push.on('notification', function(data) {
                              var test = 'test';
                                //alert('notification event');
                                /*navigator.notification.alert(
                                    data.message,         // message
                                    null,                 // callback
                                    data.title,           // title
                                    'Ok'                  // buttonName
                                );*/
                           });
                        }
                    };

                    app.initialize();

                }else{
                    ref.hide();
                }

            });

            ref.addEventListener('loadstop', function(event) { 
                
                if (event.url.match("token-was-received")) {
                    //cordova.InAppBrowser.open('http://vk.com', '_system', 'location=no');
                }else{
                    ref.show(); 
                }      

            });

        } else {

            allAlert('Сервер сейчас не доступен. Попробуйте позже!');

        }

    });

});
