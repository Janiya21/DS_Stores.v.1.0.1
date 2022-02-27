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

function addOrderToTable(){
    const id = $("#itemID-selector").val();
    const name = $("#itemName").val();
    const price = $("#unitPrice").val();
    const qty = $("#orderQty").val();
    const customerId = $("#customerID-selector").val();

    const tot = price * qty;

    let orderID=generateOrderID();

    let orderArray = {
        orderID:orderID,
        customerID:customerId,
        itemID:id,
        itemName:name,
        units:qty,
        unitPrice:price,
        total:tot
    };

    console.log(orderArray);

    orders.push(orderArray);

    if(id !== '' && qty !=='' &&  customerId !== ''){

        let i = orders.length-1;

        let row = `<tr><td>${orders[i].itemID}</td><td>${orders[i].itemName}</td><td>${orders[i].units}</td><td>${orders[i].unitPrice}</td><td>${orders[i].total}</td></tr>`;
        $("#orderTable").append(row);

    }else{
        alert("Please check all inputs in item form");
    }
}

function generateOrderID(){
    return "D00-001";
}

function calculateTot(){
    let tot=0;
    for (const i in orders) {
        tot+=orders[i].total;
    }
    $("#txtPureTot").val(tot);
}

function loadToOrderDetail(){
    for (const i in orders) {
        orderDetails[i + (orderDetails.length-1)] = orders[i];
    }
}

function createBill(){
    let pureTot = $("#txtPureTot").val();
    let discount = $("#txtDiscount").val();

    let totBil = pureTot - (pureTot * discount)/100;
    $("#txtTotBil").val(totBil + " /=");

    loadToOrderDetail();

    let isExecuted = confirm("Are you sure to confirm this order?");
    if(isExecuted){
        $("#itemID-selector").val(null);
        $("#itemName").val(null);
        $("#unitPrice").val(null);
        $("#orderQty").val(null);
        $("#customName").val(null);
        $("#customAddress").val(null);
        $("#customTelNo").val(null);
        $("#txtPureTot").val(null);
        $("#txtDiscount").val(null);
        $("#txtTotBil").val(null);

        orders = [];
        $("#orderTable>tbody tr").remove();
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