var

url = 'http://gg.geekks.com',

pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i,

log_in = '',
pass_word = '',
place_str = [], // city ids
place_str2 = [], // food places ids
place_str3 = [], // eat ids

/**** ALERT ****/

allAlert = function(str){

    jQuery("#all_alert_text").text(str);
    jQuery("#all_alert").css({'display':'block'});

};

jQuery(".allblock").on('click', '#all_alert_ok', function(){

    jQuery("#all_alert").css({'display':'none'});

});

/**** ! ALERT ****/

jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
    return function( elem ) {
        return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
	};
});

var 

// -----------------------------------------------------------------------------------------------

add_auth_form = function(){
		
		jQuery('#lb_page_block').html('<div class="logo"><img src="img/logo.png" /></div>'+
			'<input id="logininput" name="uname" type="text"><input id="passinput" name="upass" type="text">'+
			'<div class="buttonlight" id="signin">Войти</div><div class="buttonlight" id="regbutton">Регистрация</div>'+
			'<div><div class="button1-3" id="vk">ВКонтакте</div><!--div class="button1-3" id="gp">Google+</div--><div class="button1-3" id="fb">Facebook</div></div>'+
			'<div class="smallcont"><div class="logincheckbox"><input id="termsforsignin" type="checkbox" name="option1" value="a1" checked>Я согласен (а) с условиями пользовательского соглашения</div><div class="smallfont" id="relread">Читать</div><div class="clear"></div></div>'+
			'<div class="smallfont" id="repass">Забыли пароль?</div>');

    

	if(log_memory){
	
	    jQuery( '#logininput' ).val(log_memory_is);
        jQuery( '#passinput' ).attr('type','password');
	    jQuery( '#passinput' ).val(pass_memory_is);
	    auths( jQuery( '#logininput' ).val(), jQuery( '#passinput' ).val() );
		
	}else{
	
	    jQuery( '#logininput' ).val("Логин");
	    jQuery( '#passinput' ).val("Пароль");

	}

    jQuery( '#logininput' ).on({
        'focus': function() {
            if( jQuery( this ).val() == 'Логин' ){
                jQuery( this ).val('');
            }
        },
        'blur': function() {
            if( jQuery( this ).val() == '' ){
                jQuery( this ).val("Логин");
            }
        }
    });

    jQuery( '#passinput' ).on({
        'focus': function() {
            if( jQuery( this ).val() == 'Пароль' ){
                jQuery( this ).val('');
                jQuery( this ).attr('type','password');
            }
        },
        'blur': function() {
            if( jQuery( this ).val() == '' ){
                jQuery( this ).val("Пароль");
            jQuery( this ).attr('type','text');
            }
        }
    });

},

// авторизация
auths = function( login, pass ){

    jQuery.getJSON(url+'/user-auth', {login:login, password:pass}, function( q ){

    	//alert( JSON.stringify(q) );

    	if ( q.error == false ) {

            jQuery('.preloader').fadeIn(0);
	        
	        document.location.href = 'token-was-received:'+q.data.token_key;

    	} else {

    		// регистрация
 			if ( q.error_data[0].code == "003" ){

				log_in = login,
				pass_word = pass;

	        	get_city();

 			}else{

    			allAlert("Ошибка входа!");

 			}

    	}

    });

},

// регистрация

// 1 список городов при регистрации
get_city = function(){

    jQuery.getJSON(url+'/get-cities', function( q ){

        city_str = '';

        for (var i = 0; i < q.data.cities.length; i++) {

            city_str = city_str + '<div class="reg_list_item single_chck" id="'+q.data.cities[i].id+'">'+q.data.cities[i].title+'</div>';

        }

        jQuery('#lb_page_block').html('<h1 id="reg_h1">'+q.data.title+'</h1>'+
            '<input autocomplete="off" type="text" id="add_your_item"><div id="search_advice_wrapper"><div id="close_wrap_button"></div><div id="search_advice_wrapper_content"></div></div><div id="firstlist_in_reg">'+
            city_str+'</div>'+
            '<div class="reg_button_lg" id="next_reg_button0"><span>Далее</span></div><div class="smallfont margintop" id="backbut">На главную</div>');

        jQuery('#add_your_item').val('Начните вводить название');

      	jQuery('#search_advice_wrapper').css({ top : (jQuery("#add_your_item").offset().top + jQuery("#add_your_item").outerHeight() ), left : jQuery("#add_your_item").offset().left, width:jQuery("#add_your_item").outerWidth() }); 

	    jQuery( '#add_your_item' ).on({

	        'focus': function() {
	            
	            if( jQuery( this ).val() == 'Начните вводить название' ){
	                jQuery( this ).val('');
	            }
	            jQuery( '#add_your_item' ).addClass('whitetext');

	        },
	        'blur': function() {

	            if( jQuery( this ).val() == '' ){
	                jQuery( this ).val("Начните вводить название");
	                 jQuery( '#add_your_item' ).removeClass('whitetext');
	            }

	        },
	        'keyup': function(){

	            jQuery('#search_advice_wrapper').css({display:"block"});
	            jQuery('#search_advice_wrapper_content').html('');

	            if( jQuery('.reg_list_item:Contains("'+ jQuery( '#add_your_item' ).val() +'")').length ){

	                jQuery('.reg_list_item:Contains("'+ jQuery( '#add_your_item' ).val() +'")').each(function () {

	                     jQuery("#search_advice_wrapper_content").append("<div class='reg-wrap-item'>"+jQuery( this ).text()+"</div>");

	                });

	            }else{

	                jQuery('#search_advice_wrapper_content').css({display:"block"}).html('<div id="reg-wrap-no-item">Значение в списке не найдено</div>');

	            }

	        }

	    });
        
	    jQuery('#firstlist_in_reg').css({"height":jQuery(window).height()*.4});

        setTimeout(function() {
    
            jQuery('.preloader').fadeOut(0);
    
        }, 300);

	});
    			
},

// 2 список ресторанов при регистрации
get_food_places = function(){

	jQuery.getJSON(url+'/get-food-places', function( q ){

		food_str = '';

        for (var i = 0; i < q.data.foods_places.length; i++) {

            food_str = food_str + '<div class="reg_list_item" id="'+q.data.foods_places[i].id+'">'+q.data.foods_places[i].title+'</div>';

        }

        jQuery("#reg_h1").text(q.data.title);
    	jQuery("#add_your_item").after('<div id="firstlist_in_reg">'+food_str+'</div>');
        
    	jQuery('#firstlist_in_reg').css({"height":jQuery(window).height()*.4});		

    });

},

// список блюд и напитков при регистрации
get_drinks = function(){

    jQuery.getJSON(url+'/get-drinks', function( q ){

		drink_str = '';

        for (var i = 0; i < q.data.drinks.length; i++) {

            drink_str = drink_str + '<div class="reg_list_item" id="'+q.data.drinks[i].id+'">'+q.data.drinks[i].title+'</div>';

        }
        
        jQuery("#reg_h1").text(q.data.title);
        jQuery("#add_your_item").after('<div id="firstlist_in_reg">'+drink_str+'</div>');
        
    	jQuery('#firstlist_in_reg').css({"height":jQuery(window).height()*.4});

    });

},

// отправка данных для регистрации
user_register = function(login,pass,food,eat,city){

	jQuery.getJSON(url+'/user-register', {login:login, password:pass, food_ids:food, eat_ids:eat, cities_ids:city}, function( q ){

		if( q.error ){

			for (var i = 0; i < q.error_data.length; i++) {

				if(q.error_data[i].code == '004'){
					
					jQuery('.allblock').prepend('<div id="otherlogin_cont">Пользователь '+login+' уже зарегистрирован. Введите другой логин:<br/><input type="text" id="otherlogin_input"><div id="otherlogin_button">Отправить</div></div>');
				
				}

				jQuery('#otherlogin_input').val('Введите другой адрес');

				jQuery( '#otherlogin_input' ).on({

					'focus': function() {

						if( jQuery( this ).val() == 'Введите другой адрес' ){
							jQuery( this ).val('');
						}

					},
					'blur': function() {

						if( jQuery( this ).val() == '' ){
							jQuery( this ).val("Введите другой адрес");
						}

					}

				});

			}

		}else{

	        document.location.href = 'token-was-received:'+q.data.token_key;

		}

	});

};


// -------------------------------------------------------------------------------------------------


// авторизация
jQuery("#lb_page_block").on('click', '#signin', function(){
	
	if ( jQuery("#termsforsignin").prop("checked") ){

		if( ( jQuery( '#logininput' ).val() != 'Логин' ) && ( jQuery( '#passinput' ).val() != 'Пароль' ) ){

			if( pattern.test( jQuery( '#logininput' ).val() ) ){

				auths( jQuery( '#logininput' ).val(), jQuery( '#passinput' ).val() );

			} else {

				allAlert('Email (Логин) введен не верно!');

			}

		}else{

			allAlert('Введите свои Логин и Пароль');

		}

	} else {

		allAlert('Для использования приложения вы должны согласиться с правилами');

	}

});


// регистрация
jQuery("#lb_page_block").on('click', '#regbutton', function(){

	if ( jQuery("#termsforsignin").prop("checked") ){

		if( ( jQuery( '#logininput' ).val() != 'Логин' ) && ( jQuery( '#passinput' ).val() != 'Пароль' ) ){

			if( pattern.test( jQuery( '#logininput' ).val() ) ){

				jQuery('.preloader').fadeIn(0);

				log_in = jQuery( '#logininput' ).val(),
				pass_word = jQuery( '#passinput' ).val();

	        	get_city();

			} else {

				allAlert('Email (Логин) введен не верно!');

			}

		}else{

			allAlert('Для начала регистрации введите Логин и Пароль');

		}

	} else {

		allAlert('Для использования приложения вы должны согласиться с правилами');

	}

});

// если нажать на пункт основного списка
jQuery("#lb_page_block").on('click', '.reg_list_item', function(){
    
    if (   jQuery(this).hasClass('single_chck') ) {

    	jQuery('.reg_list_item').removeClass('reg_chkd');
    	jQuery(this).addClass("reg_chkd");

    }else{

	    jQuery(this).toggleClass("reg_chkd");

    }

});

// если нажать на пункт из списка-подсказки
jQuery(".allblock").on('click', '.reg-wrap-item', function(){

	jQuery('#add_your_item').val( jQuery( this ).text() );

	jQuery('.reg_list_item:Contains("'+ jQuery( this ).text() +'")').each(function () {

		if (   jQuery(this).hasClass('single_chck') ) {

			jQuery('.reg_list_item').removeClass('reg_chkd');

		}

		jQuery(this).addClass("reg_chkd");

	});

	jQuery('#search_advice_wrapper').css({display:"none"});
	jQuery('#search_advice_wrapper_content').html('');

});

// закрыть спиок-подсказу при регистрации
jQuery(".allblock").on('click', '#close_wrap_button', function(){

	jQuery('#search_advice_wrapper').css({display:"none"});
	jQuery('#search_advice_wrapper_content').html('');

	jQuery('#add_your_item').val('');

});

// если город выбран
jQuery("#lb_page_block").on('click', '#next_reg_button0', function(){

	if( jQuery('.reg_chkd').length ){

		jQuery(this).attr("id","next_reg_button");

		jQuery('.reg_list_item.reg_chkd').each(function () {

			place_str.push( jQuery(this).attr('id') );

		});

		jQuery("#firstlist_in_reg").remove();

		jQuery('#add_your_item').val('Начните вводить название');
		jQuery('#add_your_item').removeClass('whitetext');

		get_food_places();

	}else{

		allAlert('Сначала выберите пункт из списка');

	}

});

// если рестораны выбраны
jQuery("#lb_page_block").on('click', '#next_reg_button', function(){

    if( jQuery('.reg_chkd').length ){

   		jQuery(this).attr("id","next_reg_button2");

		jQuery('.reg_list_item.reg_chkd').each(function () {

		  place_str2.push( jQuery(this).attr("id") );

		});

		jQuery("#firstlist_in_reg").remove();

        jQuery('#add_your_item').val('Начните вводить название');
        jQuery('#add_your_item').removeClass('whitetext');

        get_drinks();

    }else{

        allAlert('Выберите хотя бы 1 значение!');

    }

});

// если блюда и напитки выбраны
jQuery("#lb_page_block").on('click', '#next_reg_button2', function(){

	if( jQuery('.reg_chkd').length ){

		jQuery('.reg_list_item.reg_chkd').each(function () {

			place_str3.push( jQuery(this).attr("id") );

		});

		user_register(log_in,pass_word,place_str2,place_str3,place_str);

		//alert( log_in+' '+pass_word+' '+place_str2+' '+place_str3+' '+place_str );

	}else{

		allAlert('Выберите хотя бы 1 значение!');

	}

});

// отправить исправленный логин
jQuery(".allblock").on('click', '#otherlogin_button', function(){

    if( jQuery('#otherlogin_input').val()!='Введите другой адрес' ){

        if( pattern.test( jQuery('#otherlogin_input').val() ) ){

            user_register( jQuery('#otherlogin_input').val(), pass_word, place_str2, place_str3, place_str);
            jQuery('#otherlogin_cont').remove();
        
        } else {

            allAlert('Email (Логин) введен не верно!');
        
        }
            
    }

});

// регистация вконтакте
jQuery(".allblock").on('click', '#vk', function(){

	if ( jQuery("#termsforsignin").prop("checked") ){

		document.location.href = 'https://oauth.vk.com/authorize?client_id=6385173&redirect_uri=http://gg.geekks.com/social/bblauth.php?llbappkey=1&display=mobile';

	} else {

		allAlert('Для использования приложения вы должны согласиться с правилами');

	}

});

// регистация гугл плюс
jQuery(".allblock").on('click', '#gp', function(){

	if ( jQuery("#termsforsignin").prop("checked") ){

		document.location.href = gp_link;
		
	} else {

		allAlert('Для использования приложения вы должны согласиться с правилами');

	}

});

// регистация фэйсбук
jQuery(".allblock").on('click', '#fb', function(){

	if ( jQuery("#termsforsignin").prop("checked") ){

		document.location.href = fblink;
		
	} else {

		allAlert('Для использования приложения вы должны согласиться с правилами');

	}

});

// читать правила
jQuery(".allblock").on('click', '#relread', function(){

    jQuery.getJSON(url+'/get-terms', function(q){

        jQuery('#lb_page_block').html('<h1>Пользовательское соглашение:</h1><div id="list_kup_dost_kont"></div><div class="smallfont margintop" id="backbut">На главную</div>');
        jQuery('#list_kup_dost_kont').css({"height":jQuery(window).height()*.6});
        jQuery('#list_kup_dost_kont').html( q.data.terms_text );

    });

});

// восстановление пароля
jQuery(".allblock").on('click', '#repass', function(){

    allAlert( 'Восстановление пароля' );

/*
    jQuery.getJSON(url+'/password-recovery', {email:"gor.flash@yandex.ru"}, function( q ){

        jQuery("#hh").text( JSON.stringify(q) );        

    });
*/

});

// вернуться на главную
jQuery("#lb_page_block").on('click', '#backbut', function(){

	log_in = '';
	pass_word = '';
	place_str = []; // city ids
	place_str2 = []; // food places ids
	place_str3 = []; // eat ids

    add_auth_form();

});

// -------------------------------------------------------------------------------------------------

jQuery(window).load(function() {

    var docemsize = jQuery(window).height()*.03;

	jQuery('.allblock').css({"font-size":  docemsize+"px"});
    jQuery('.container').css({"padding-top":jQuery(window).height()*.1});

    if( userisinstagram == 'true' || userisinstagram2 == 'true' ){

	    if( userisinstagram == 'true' && userisinstagram2 == 'false' ){
	    	auths( "vk_"+userinstagram, "vk_"+userinstagram );
	    }
	    
	    if( userisinstagram == 'false' && userisinstagram2 == 'true' ){
	    	auths( "fb_"+userinstagram2, "fb_"+userinstagram2 );
	    }

    }else{

		setTimeout(function() {

			jQuery('.preloader').fadeOut(0);

		}, 300);

		add_auth_form();

    }

});