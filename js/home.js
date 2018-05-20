

var vendingSpot = $('#vending');
var moneyIn = 0;

getSnacks();

function getSnacks() {

    vendingSpot.empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/items',
        success: function (data, status) {
            $.each(data, function (index, item) {
                var name = item.name
                var price = item.price;
                var quantity = item.quantity;
                var id = item.id;

                // if (index > 3){
                //     var div = vendingSpot.append('<div>')
                //     div.addClass('row');
                //     var div1 = div.append('<div>')
                //     div1.addClass('col-md-4');
                // }

                // var div = vendingSpot.addClass('row');
                // var div1 = vendingSpot.addClass('col-md-3');
                var snackName = '<p>' + name + '<p>'
                var snackPrice = '<p>' + price + '<p>'
                var snackQuantity = '<p>' + quantity + '<p>'
                var snackId = '<p>' + id + '<p>'
                var img = '<a onclick="showID(' + id + ' )"><img class="snickers" src="images/' + id + '.png"></a>';
                vendingSpot.append(snackName);
                vendingSpot.append('Cost:' + snackPrice);
                vendingSpot.append('Quantity Left:' + snackQuantity);
                vendingSpot.append('Item ID:' + snackId);
                vendingSpot.append(img);
            });
        }
    });
}
function showID(id) {
    $('#item').val(id);
    console.log(id);
}

$('#purchase').click(function () {
    var item = $('#item').val();
    var money = $('#money').val();
    console.log(item);
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/money/' + money + '/item/' + item,
        success: function (data, status) {
            console.log('Purchase Successful!');
            console.log(data);
            $('#message').val("Thank You!");
            var change = data.quarters + ' quarters    ' + data.dimes + ' dimes    ' + data.nickels + ' nickels ';
            $('#change').val(change);
            getSnacks();
        },
        error: function (data) {
            console.log(data.responseJSON.message);
            $('#message').val(data.responseJSON.message);
        }
    });
});

$('#dollar').on('click', addDollar);
$('#quarter').on('click', addQuarter);
$('#dime').on('click', addDime);
$('#nickel').on('click', addNickel);

function addDollar() {
    moneyIn++;
    $('#money').val(moneyIn);
}

function addQuarter() {
    moneyIn += 0.25;
    $('#money').val(moneyIn);
}

function addDime() {
    moneyIn += 0.1;
    $('#money').val(moneyIn);
}

function addNickel() {
    moneyIn += 0.05;
    $('#money').val(moneyIn);
}

$('#returnChange').click(function () {
    $('#money').val("");
    $('#change').val("");
    $('#item').val("");
    $('#message').val("Transaction Ended, Please Come Again");
});




