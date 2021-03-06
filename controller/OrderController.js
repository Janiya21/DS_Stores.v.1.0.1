function loadCustomerIDs(){
    $("#customerID-selector").empty();
    for (const i in customers) {
        let data = `<option value="${customers[i].getCustomerID()}">${customers[i].getCustomerID()}</option>`;
        $("#customerID-selector").append(data);
    }
}

function loadItemIDs(){
    $("#itemID-selector").empty();
    for (const i in items) {
        let data = `<option value="${items[i].getItemCode()}">${items[i].getItemCode()}</option>`
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

    let orderArray = new OrderDTO(orderID,customerId,id,name,qty,price,tot);

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
                    if(orders[i].getORDItemId() === id){
                        isExists = true;
                        index=i;
                        oldQty=orders[i].getORDUnits();
                        oldTot=orders[i].getORDTotal();
                    }
                }
            }

            if(isExists){
                orders[index].setORDUnits(Number(oldQty) + Number(qty));
                orders[index].setORDTotal(Number(tot) + Number(oldTot));

                loadAllItemsToOrderTable();

            }else{
                orders.push(orderArray);

                let i = orders.length-1;

                let row = `<tr><td>${orders[i].getORDItemId()}</td><td>${orders[i].getORDItemName()}</td><td>${orders[i].getORDUnits()}</td>
                            <td>${orders[i].getORDUnitPrice()}</td><td>${orders[i].getORDTotal()}</td></tr>`;
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
        let getId = orderDetails[orderDetails.length-1].getORDOrderId();
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
        tot+=orders[i].getORDTotal();
    }
    $("#txtPureTot").val(tot);
}

function loadToOrderDetail(){
    for (let i = 0; i < orders.length; i++) {
        orderDetails[orderDetails.length] = orders[i];

        for (const j in items) {
            if(orders[i].getORDItemId() === items[j].getItemCode()){
                items[j].setItemQty(items[j].getItemQty() - orders[i].getORDUnits());
            }
            console.log(items[j].getItemQty() + " : " + items[j].getItemName());
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
        orderId: orderDetails[orderDetails.length-1].getORDOrderId(),
        customerID: orderDetails[orderDetails.length-1].getORDCustomerId(),
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
        let row = `<tr><td>${orders[i].getORDItemId()}</td><td>${orders[i].getORDItemName()}</td><td>${orders[i].getORDUnits()}</td>
                    <td>${orders[i].getORDUnitPrice()}</td><td>${orders[i].getORDTotal()}</td></tr>`;
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
   if(customers.length !== 0){
       loadCustomerIDs();
   }
   if(items.length !== 0){
       loadItemIDs();
   }
});

$("#customerID-selector").click(function (){
    var customerID = $("#customerID-selector").val();

    console.log(customerID + " this is ID");

    let customer;
    for (const i in customers) {
        if(customers[i].getCustomerID() === customerID){
            customer =  customers[i];
        }
    }

    if(customers.length !== 0){
        $("#customName").val(customer.getCustomerName());
        $("#customAddress").val(customer.getEmail());
        $("#customTelNo").val(customer.getTelephone());
    }
});

$("#itemID-selector").click(function (){
    var itemID = $("#itemID-selector").val();
    let item;
    for (const i in items) {
        if(items[i].getItemCode() === itemID){
            item =  items[i];
        }
    }

    if(items.length !== 0){
        $("#itemName").val(item.getItemName());
        $("#unitPrice").val(item.getUnitPrice());
        $("#itemQty").val(item.getItemQty());
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