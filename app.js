//THIS SCRIPT IS FOR TAMPER MONKEY
//YOU MUST INSTALL tampermonkey first before you use this script
// ==UserScript==
// @name         Mining data film IMDB
// @namespace    http://dekbeta.web.id/
// @version      0.1
// @description  try to take over the world!
// @author       Beta Priyoko <beta.priyoko@students.amikom.ac.id>
// @match        http://www.imdb.com/search/title?count=500
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js
// ==/UserScript==

(function() {
    'use strict';
    jQuery(document).ready(function(){
       jQuery('.lister-item.mode-advanced').each(function(){
          var postData = {
             title : jQuery(this).find('.lister-item-header a').text().trim(),
             year  : parseInt(jQuery(this).find('.lister-item-year').text().substr(1,4)),
             category : jQuery(this).find('span.genre').text().trim(),
             rating : jQuery(this).find('.ratings-imdb-rating').data('value'),
             desc : jQuery(this).find('.lister-item-content p.text-muted:nth-child(4)').text().trim(),
             votes : jQuery(this).find('.sort-num_votes-visible span:nth-child(2)').data('value')
          };
           jQuery.ajax({
            url: "http://localhost:3000/insert/dbfilm",
            type: "POST",
            data: postData,
            async: false,
            success: function(data, textStatus, jqXHR) {},
            error: function(jqXHR, textStatus, errorThrown) {}
        });
       });
    });
})();