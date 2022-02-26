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

$("#btnAddToCart").click(function (){
    addOrderToTable();
    calculateTot();
});

$("#btnCreateBill").click(function (){
    createBill();
});

function addOrderToTable(){
    const id = $("#itemID-selector").val();
    const name = $("#itemName").val();
    const price = $("#unitPrice").val();
    const qty = $("#orderQty").val();
    const tot = price * qty;

    let orderArray = {
        itemID:id,
        itemName:name,
        units:qty,
        unitPrice:price,
        total:tot
    };

    console.log(orderArray);

    orders.push(orderArray);

    if(id !== '' && qty !=='' &&  $("#customerID-selector").val() !== ''){

        let i = orders.length -1;

        let row = `<tr><td>${orders[i].itemID}</td><td>${orders[i].itemName}</td><td>${orders[i].units}</td><td>${orders[i].unitPrice}</td><td>${orders[i].total}</td></tr>`;
        $("#orderTable").append(row);

    }else{
        alert("Please check all inputs in item form");
    }
}

function calculateTot(){
    let tot=0;
    for (const i in orders) {
        tot+=orders[i].total;
    }
    console.log(tot + " rs");
    $("#txtPureTot").val(tot);
}

function createBill(){
    let pureTot = $("#txtPureTot").val();
    let discount = $("#txtDiscount").val();

    let totBil = pureTot - (pureTot * discount)/100;
    $("#txtTotBil").val(totBil + " /=");


}