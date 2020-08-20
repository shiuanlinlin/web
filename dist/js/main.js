$(function(){
    $('.works_list li').each(function(i){
        var $this = $(this);
        setTimeout(function(){
            $this.addClass('loadanimate');
        },130*i)
    });

    $('.menu').click(function(){

        $('.black_left_box').addClass('active');
        $('body').addClass('active');
        return false
    });

    $('.close_b a').click(function(){
          $('.black_left_box').removeClass('active');
          $('body').removeClass('active');			  
          return false
        });

    $('.open_show').click(function(){
         $('.passboxlink').addClass('active');
         $('.black_left_box').removeClass('active');
        $('body').addClass('active');
        return false  				 
        });

    $('.top_close').click(function(){
         $('.passboxlink').removeClass('active');
        $('body').removeClass('active');
        });

});