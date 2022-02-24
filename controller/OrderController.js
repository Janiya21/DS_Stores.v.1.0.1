function loadCustomerIDs(){
    $("#customerID-selector").empty();
    for (const i in customers) {
        let data = `<option value="${customers[i].customerCode}">${customers[i].customerCode}</option>`;
        $("#customerID-selector").append(data);
    }
}

function loadItemIDs(){
    $("#itemID-selector").empty();
    for (const i in items) {
        let data = `<option value="${items[i].itemID}">${items[i].itemID}</option>`
        $("#itemID-selector").append(data);
    }
}

$("#placeOrder").click(function (){
    loadCustomerIDs();
    loadItemIDs();
});

$("#customerID-selector").click(function (){
    var customerID = $("#customerID-selector").val();
    let customer;
    for (const i in customers) {
        if(customers[i].customerCode === customerID){
            customer =  customers[i];
        }
    }

    $("#customName").val(customer.customerName);
    $("#customAddress").val(customer.email);
    $("#customTelNo").val(customer.telNo);
});

$("#itemID-selector").click(function (){
    var itemID = $("#itemID-selector").val();
    let item;
    for (const i in items) {
        if(items[i].itemID === itemID){
            item =  items[i];
        }
    }

    $("#itemName").val(item.itemName);
    $("#unitPrice").val(item.itemPrice);
    $("#itemQty").val(item.itemQty);
});