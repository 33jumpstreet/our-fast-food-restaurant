// var API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood';

// $(function() {
//   $('.fa-search').click(function() {
//     var searchKeyword = $('#txt-search').val();
//     search(1, 10, searchKeyword);
//   });

//   $('#txt-search').on('keypress', function(e){
//     if (e.keyCode === 13) {
//       $('.fa-search').trigger('click');
//     }
//   });   
// });

// function search(page, perPage, searchKeyword) {
//   if (typeof page !== 'number' || page < 1) 
//   page = 1;

//   if (typeof perPage !== 'number' || perPage <= 0)
//     perPage = 10;

//   $.get(API_URL, {
//     page: page,
//     perPage : perPage,
//     searchKeyword : searchKeyword
//   }, function(data) {
//     var list = data.list;
//     var total = data.total;
    
//     $('.total').html('총' + total + '개의 패스트푸드점을 찾았습니다.')
    
//     var $list = $('.list');

//     for (var i=0; i<list.length; i++) {
//       var item = list[i];

//       var $elem = $('#item-template')
//         .clone()
//         .removeAttr('id');
      
//       $elem.find('.item-no').html(i+1);
//       $elem.find('.item-name').html(item.name);
//       $elem.find('.item-addr').html(item.addr);

//       $list.append($elem);
//     }

//     $('div').remove('.title');
//     $('div').remove('.search');

//     showPaging(page);
//   });
// }

// function showPaging(page) {
//   var $paging = $('.paging').empty();

//   for (var i = 1; i <= 5; i++) {
//     var $elem = $('<a href="javascript:search('+i+')>' + i + '</a>');

//     if ( i === page) {
//       $elem.addClass('current');
//     }

//     $paging.append($elem);
//   }
// }

var API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood';

$(function() {
  $('.fa-search').click(function(){
    var searchKeyword = $('#txt-search').val();
    search(1, null, searchKeyword);
    });

    $('#txt-search').on('keypress', function(e){
      if (e.keyCode === 13) {
//        console.log('엔터가 입력되었습니다.');
        $('.fa-search').trigger('click');
      }
    });

    $('#txt-search').focus();
});

function search(page, perPage, searchKeyword) {
  if (typeof page !== 'number' || page < 1)
    page = 1;

  if (typeof perPage !== 'number' || perPage <= 0)
    perPage = 10;

  $.get(API_URL, {
    page: page,
    perPage : perPage,
    searchKeyword: searchKeyword
  }, function(data){
    var list = data.list;
    var total = data.total;

    $('.total').html('총 ' + total + '개의 페스트푸드점을 찾았습니다.' );

    var $list = $('.list').empty();

    for (var i =0; i <list.length; i++) {
      var item = list[i];

      // 1. 템플릿을 복제한다.
      var $elem = $('#item-template')
          .clone()
          .removeAttr('id');

      var no = (page -1) * perPage + i + 1;

      // 2. 복제한 템플릿에 데이터를 세팅한다.
          $elem.find('.item-no').html(no);
          $elem.find('.item-name').html(item.name); //  item 오브젝트의 name 속성
          $elem.find('.item-addr').html(item.addr); // item 오브젝트의 addr 속성

      // 3. 목록에 복제한 템플릿을 추가한다.
          $list.append($elem);
    }
    $('div').remove('.title');
    $('div').remove('.search');
    showPaging(page, perPage, total, searchKeyword);
  });
}

function showPaging(page, perPage, total, searchKeyword) {
  var $paging = $('.paging').empty();
  var numPages = 5;
  var pageStart = Math.floor((page - 1) / numPages) * numPages + 1;
  var pageEnd = pageStart + numPages - 1;
  var totalPages = Math.floor((total - 1) / perPage) + 1;

  if (pageEnd > totalPages)
    pageEnd = totalPages;

  var prevPage = pageStart - 1;

  if (prevPage < 1)
    prevPage = 1;

  var nextPage = pageEnd + 1;

  if (nextPage > totalPages)
    nextPage = totalPages;

  var $prevElem = $('<a href="javaScript:search(' + prevPage + ',' + perPage + ',\'' + searchKeyword + '\')">이전</a>');
  $prevElem.addClass('prev');
  $paging.append($prevElem);

  for (var i = pageStart; i <= pageEnd; i++) {
    var $elem = $('<a href="javascript:search(' + i + ',' + perPage + ',\'' + searchKeyword + '\')">' + i + '</a>');

    if ( i === page) {
      $elem.addClass('current');
    }

    $paging.append($elem);
  }

  var $nextElem = $('<a href="javascript:search(' + nextPage + ',' + perPage + ',\'' + searchKeyword + '\')">다음</a>' );
  $nextElem.addClass('next');
  $paging.append($nextElem);
}




