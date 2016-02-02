;jQuery.fn.extend({
    paginate: function(obj) {
        if(obj==undefined){ obj = { 'target':'#pages', 'limit':20, 'curPageNum':1, 'nlinks':5 }; }
        obj['target'] = (obj['target']==undefined)? '#pages':obj['target'];
        obj['limit'] = (obj['limit']==undefined)? 20:obj['limit'];
        obj['curPageNum'] = (obj['curPageNum']==undefined)? 1:obj['curPageNum']; /* current Page number */
        obj['nlinks'] = (obj['nlinks']==undefined)? 5:obj['nlinks'];  /* Number of visible clickable links in pagination */
        obj['filterOnClass'] = (obj['filterOnClass']==undefined)? '':obj['filterOnClass'];
        return this.each(function(){
            obj['atags'] = $(this).children();
            if(obj['filterOnClass']!=''){
                var filterArr = [];
                for(var i=0; i < obj['atags'].length; i++){
                    if( $(obj['atags'][i]).hasClass(obj['filterOnClass']) ){
                        filterArr.push( obj.atags[i] );
                    }
                }
                obj['atags'] = filterArr;
            }
            __init(obj);
        });
        function __init(obj){
            var limit = obj.limit;
            var target = obj.target;
            var noOfPages = Math.ceil(obj.atags.length/limit);
            var cntr = document.createElement('center'),
                table = $(document.createElement('table')).appendTo(cntr),
                tr = $(document.createElement('tr')).appendTo(table);
            $(table).attr('class','pagination unselectable');
            var td = $(document.createElement('td')).appendTo(tr).append('First').click(function(){  obj.curPageNum=1; __init(obj); });
            if(obj.curPageNum==1 || noOfPages==0){ $(td).addClass('freeze'); }
            var td = $(document.createElement('td')).appendTo(tr).append("&lt;").click(function(){ if(obj.curPageNum > 1){ obj.curPageNum--; __init(obj); } });
            if(obj.curPageNum==1 || noOfPages==0){ $(td).addClass('freeze'); }
            if(noOfPages>obj.nlinks && obj.curPageNum!=1){ $(document.createElement('td')).appendTo(tr).append("..").addClass('freeze'); }
            obj.nlinks = (obj.nlinks>noOfPages || obj.nlinks <= 0)? noOfPages:obj.nlinks;
            var a = obj.curPageNum - Math.floor(obj.nlinks/2);
            var b = obj.curPageNum + Math.ceil(obj.nlinks/2) - 1;
            if(a < 1){ b = b - a + 1; a = 1; }
            if(b > noOfPages){ a = a - (b-noOfPages); b = noOfPages; }
            for(i=1; i <= noOfPages; i++){
                if(i >= a && i <= b){
                    $(document.createElement('td')).appendTo(tr).append(i).click(function(){  obj.curPageNum=parseInt($(this).text()); __init(obj); });
                }
            }
            if(noOfPages>obj.nlinks && obj.curPageNum != noOfPages){ $(document.createElement('td')).appendTo(tr).append("..").addClass('freeze'); }
            var td = $(document.createElement('td')).appendTo(tr).append("&gt;").click(function(){ if(obj.curPageNum < noOfPages){ obj.curPageNum++; __init(obj); } });
            if(obj.curPageNum==noOfPages || noOfPages==0){ $(td).addClass('freeze'); }
            var td = $(document.createElement('td')).appendTo(tr).append('Last').click(function(){  obj.curPageNum=noOfPages; __init(obj); });
            if(obj.curPageNum==noOfPages || noOfPages==0){ $(td).addClass('freeze'); }
            $(target).find('.pagination').each(function(){ $(this).parent().remove(); });
            $(target).append(cntr);
            loadPage(obj);
        }
        function loadPage(obj){
            var limit = obj.limit;
            var target = obj.target;
            var pageNum = obj.curPageNum;
            var pageNum = ($.isNumeric(pageNum))? Math.ceil(pageNum):1;
            var start = (limit*(pageNum-1))+1;
            var end = ((start+limit-1)>obj.atags.length)? obj.atags.length:(start+limit-1);
            for(i=0; i <obj.atags.length; i++){
                if( (i+1) >= start && (i+1) <= end){
                    $( obj.atags[i] ).css('display','');
                }else{
                    $( obj.atags[i] ).css('display','none');
                }
            }
            var tds = $(target).find('td');
            for(i=0; i <tds.length; i++){
                if( Math.ceil($(tds[i]).html()) == pageNum ){
                    $(tds[i]).addClass('current');
                }else{
                    $(tds[i]).removeClass('current');
                }
            }
            obj.curPageNum = pageNum;
        }
    },
    filterOn: function(obj) {
        obj['value'] = (obj['value']==undefined)? '':obj['value'];
        obj['setClass'] = (obj['setClass']==undefined)? '':obj['setClass'];
        return this.each(function(){
            obj['atags'] = $(this).children();
            applyFilter(obj);
        });
        function applyFilter(obj){
            for(var i=0; i < obj['atags'].length; i++){
                if( $(obj['atags'][i]).text().toLowerCase().indexOf(obj['value'].toLowerCase()) !==-1 ){
                    $(obj['atags'][i]).css('display','');
                    if(obj['setClass'] != ''){ $(obj['atags'][i]).addClass(obj['setClass']); }
                }else{
                    $(obj['atags'][i]).css('display','none');
                    if(obj['setClass'] != ''){ $(obj['atags'][i]).removeClass(obj['setClass']); }
                }
            }
        }
    }
});
