$(document).ready(function () {

    var vendingSpot = $('#vending');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/items',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.name
                var price = item.price;
                var quantity = item.quantity;
                var id = item.id;

                var img = '<a onclick="showID(' + id +' )"><img src="images/' +id + '.png"></a>';
               
                vendingSpot.append(img);
            });
            
        }
    });
   
   
});// end ready function

function showID(id) {
    console.log(id);
}






