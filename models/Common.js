exports.fetch_ids=function(data,val){
  var ids =[];
  for(var key in data) {
    ids.push(data[key][val+"_id"]);
  }
  return ids;
}

exports.paginate=function (record_count,current_page,page_size){
  total_pages = Math.ceil(record_count / page_size);
  last_page =  parseInt(total_pages);
  current_page = parseInt(current_page)+1 > parseInt(last_page) ? parseInt(last_page) : parseInt(current_page)+1;
  prev_page = parseInt(current_page)==1 ? null : parseInt(current_page) - 1;
  next_page = parseInt(current_page)==parseInt(last_page) ? null : parseInt(current_page) + 1;
  page = {"total_pages":total_pages,"last_page":last_page,"prev_page":prev_page,"next_page":next_page,"current_page":current_page}
  return page
}

exports.compute_offset=function(page)
{
  return parseInt(page)==1 ? 0 : 24*(page-1);
}
