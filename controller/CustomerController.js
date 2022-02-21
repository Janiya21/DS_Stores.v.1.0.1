function afterManipulateDOM(){
    $("#customer-body>tr").off();

    $("#customer-body>tr").click(function (){
        loadCustomersToTextFields(this);
    });

    $("#customer-body>tr").dblclick(function (){
        removeTblCustomers(this);
    });
}

$("#clearCusFields").click(function (){
    $("#txtItemCode").val(null);
    $("#txtItemName").val(null);
    $("#txtUnitPrice").val(null);
    $("#txtQty").val(null);
});

function addNewCustomerToTable(){

    const code = $("#txtCustomerId").val();
    const customerName = $("#txtCustomerNamee").val();
    const email = $("#txtEmail").val();
    const tel = $("#txtTelNo").val();

    let customerArray = {
        customerCode:code,
        customerName:customerName,
        email:email,
        telNo:tel
    };

    customers.push(customerArray);

    if( ($("#req-txtCusId").text() === '') && (code !== "") && ($("#req-txtCusName").text() === '') && (customerName !=="")
        && ($("#req-txtCusAddress").text() === '') && (email !=="") && ($("#req-txtCusTel").text() === '') && (tel !=="")){

        let i = customers.length -1;

        let row = `<tr><td>${customers[i].customerCode}</td><td>${customers[i].customerName}</td><td>${customers[i].email}</td><td>${customers[i].telNo}</td></tr>`;
        $("#customerTable").append(row);

    }else{
        alert("Please check all inputs in Customer form");
    }
}

function loadAllCustomersToTable(){
    $("#customer-body").empty();
    for(const i in customers) {
        let row = `<tr><td>${customers[i].customerCode}</td><td>${customers[i].customerName}</td><td>${customers[i].email}</td><td>${customers[i].telNo}</td></tr>`;
        $("#customerTable").append(row);
    }
}

function removeTblCustomer(row){
    if($("#txtCustomerId").val() !== ""){
        $(row).remove();
        deleteCustomer();
    }
}

function deleteCustomer(){
    let id = $("#txtCustomerId").val();
    let index=0;
    for (let i = 0; i < customers.length; i++) {
        if(customers[i].customerCode === id){
            index =  i;
        }
    }

    items.splice(index,1);

    $("#txtCustomerId").val(null);
    $("#txtCustomerName").val(null);
    $("#txtEmail").val(null);
    $("#txtTelNo").val(null);
}

function updateCustomer(){

    const code = $("#txtCustomerId").val();
    const customerName = $("#txtCustomerNamee").val();
    const email = $("#txtEmail").val();
    const tel = $("#txtTelNo").val();

    let customerArray = {
        customerCode:code,
        customerName:customerName,
        email:email,
        telNo:tel
    };

    let index=0;
    for (let i = 0; i < customers.length; i++) {
        if(customers[i].customerCode === code){
            index =  i;
        }
    }

    customers[index] = customerArray;
    loadAllCustomersToTable();
}