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

    if(id !== '' && qty !=='' &&  customerId !== ''){

        let orQty = $("#itemQty").val();

        console.log(qty + " < > = " + orQty);

        if( Number(qty) < Number(orQty) ){

            let isExists=false;
            let index;
            let oldQty;
            let oldTot;

            if(orders.length === 0){
                isExists = false;
            }else{
                for (const i in orders) {
                    if(orders[i].itemID === id){
                        isExists = true;
                        index=i;
                        oldQty=orders[i].units;
                        oldTot=orders[i].total;
                    }
                }
            }

            if(isExists){
                orders[index].units = Number(oldQty) + Number(qty);
                orders[index].total = Number(tot) + Number(oldTot);

                loadAllItemsToOrderTable();

            }else{
                orders.push(orderArray);

                let i = orders.length-1;

                let row = `<tr><td>${orders[i].itemID}</td><td>${orders[i].itemName}</td><td>${orders[i].units}</td><td>${orders[i].unitPrice}</td><td>${orders[i].total}</td></tr>`;
                $("#orderTable").append(row);
            }
        }else{
            alert("Quantity not sufficient !!")
        }

    }else{
        alert("Please check all inputs in item form");
    }
}

function generateOrderID(){
    if(orderDetails.length === 0){
        return "D00-001";
    }else{
        let getId = orderDetails[orderDetails.length-1].orderID;
        let number = Number(getId.substr(4,7));
        let nextNum = number + 1;

        let nextId;

        if(nextNum<10){
            nextId = "D00-00"+nextNum;
        }else if(nextNum<100){
            nextId = "D00-0"+nextNum;
        }else{
            nextId = "D00-100";
        }

        console.log(nextId + " Id");
        return nextId;
    }
}

function calculateTot(){
    let tot=0;
    for (const i in orders) {
        tot+=orders[i].total;
    }
    $("#txtPureTot").val(tot);
}

function loadToOrderDetail(){
    for (let i = 0; i < orders.length; i++) {
        orderDetails[orderDetails.length] = orders[i];

        for (const j in items) {
            if(orders[i].itemID === items[j].itemID){
                items[j].itemQty = items[j].itemQty - orders[i].units;
            }
            console.log(items[j].itemQty + " : " + items[j].itemName);
        }
    }

}

function loadToOrderHistory(){
    const d = new Date();

    const month = d.getMonth() + 1;
    const day = d.getDate();

    const fullDate = d.getFullYear() + '/' +
        (month < 10 ? '0' : '') + month + '/' +
        (day < 10 ? '0' : '') + day;

    let dis = ($("#txtPureTot").val() * ($("#txtDiscount").val()/100));

    let historyArray = {
        orderId: orderDetails[orderDetails.length-1].orderID,
        customerID: orderDetails[orderDetails.length-1].customerID,
        date:fullDate,
        discount:dis,
        totalAmount: $("#txtTotBil").val()
    }

    orderHistory.push(historyArray);

    console.log(historyArray);
}

function setTotal(){
    let pureTot = $("#txtPureTot").val();
    let discount = $("#txtDiscount").val();

    let totBil = pureTot - (pureTot * discount)/100;
    console.log(totBil + " rs");
    $("#txtTotBil").val(totBil + " /=");
}

function loadAllItemsToOrderTable(){
    $("#order-body").empty();
    for(const i in orders) {
        let row = `<tr><td>${orders[i].itemID}</td><td>${orders[i].itemName}</td><td>${orders[i].units}</td><td>${orders[i].unitPrice}</td><td>${orders[i].total}</td></tr>`;
        $("#orderTable").append(row);
    }
}

function createBill(){

    loadToOrderDetail();
    loadToOrderHistory();

    let isExecuted = confirm("Are you sure to confirm this order?");
    if(isExecuted){
        $("#itemName").val(null);
        $("#unitPrice").val(null);
        $("#orderQty").val(null);
        $("#itemQty").val(null);
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

    console.log(customerID + " this is ID");

    let customer;
    for (const i in customers) {
        if(customers[i].customerCode === customerID){
            customer =  customers[i];
        }
    }

    if(customers.length !== 0){
        $("#customName").val(customer.customerName);
        $("#customAddress").val(customer.email);
        $("#customTelNo").val(customer.telNo);
    }
});

$("#itemID-selector").click(function (){
    var itemID = $("#itemID-selector").val();
    let item;
    for (const i in items) {
        if(items[i].itemID === itemID){
            item =  items[i];
        }
    }

    if(items.length !== 0){
        $("#itemName").val(item.itemName);
        $("#unitPrice").val(item.itemPrice);
        $("#itemQty").val(item.itemQty);
    }

});

$("#btnAddToCart").click(function (){
    addOrderToTable();
    calculateTot();
});

$("#btnCreateBill").click(function (){
    createBill();
});

$("#txtDiscount").keyup(function(){
    setTotal();
});