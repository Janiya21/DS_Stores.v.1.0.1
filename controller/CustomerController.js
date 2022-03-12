function afterManipulateCustomerDOM(){
    $("#customer-body>tr").off();

    $("#customer-body>tr").click(function (){
        loadCustomersToTextFields(this);
    });

    $("#customer-body>tr").dblclick(function (){
        removeTblCustomers(this);
    });
}

function addNewCustomerToTable(){

    const code = $("#txtCustomerId").val();
    const customerName = $("#txtCustomerName").val();
    const email = $("#txtEmail").val();
    const tel = $("#txtTelNo").val();

    let customerArray = new CustomerDTO(code,customerName,email,tel);

    if( ($("#req-txtCusId").text() === '') && (code !== "") && ($("#req-txtCusName").text() === '') && (customerName !=="")
        && ($("#req-txtCusAddress").text() === '') && (email !=="") && ($("#req-txtCusTel").text() === '') && (tel !=="")){

        let isExist = false;

        for (const i in customers) {
            if(customers[i].getCustomerID() === code){
                isExist = true;
            }
        }

        if(isExist){
            alert("This ID is already taken");
        }else{

            customers.push(customerArray);

            let i = customers.length -1;

            let row = `<tr><td>${customers[i].getCustomerID()}</td><td>${customers[i].getCustomerName()}</td><td>${customers[i].getEmail()}</td>
                        <td>${customers[i].getTelephone()}</td></tr>`;
            $("#customerTable").append(row);
        }

    }else{
        alert("Please check all inputs in Customer form");
    }
}

function loadAllCustomersToTable(){
    $("#customer-body").empty();
    for(const i in customers) {
        let row = `<tr><td>${customers[i].getCustomerID()}</td><td>${customers[i].getCustomerName()}</td><td>${customers[i].getEmail()}</td>
                        <td>${customers[i].getTelephone()}</td></tr>`;
        $("#customerTable").append(row);
    }
}

function removeTblCustomers(row){
    if($("#txtCustomerId").val() !== ""){
        $(row).remove();
        deleteCustomer();
    }
}

function loadCustomersToTextFields(row){
    let cusID = $(row).children(":eq(0)").text();
    let cusName = $(row).children(":eq(1)").text();
    let email = $(row).children(":eq(2)").text();
    let telNo = $(row).children(":eq(3)").text();

    console.log(cusID, cusName, email, telNo);

    $("#txtCustomerId").val(cusID);
    $("#txtCustomerName").val(cusName);
    $("#txtEmail").val(email);
    $("#txtTelNo").val(telNo);
}

function searchCustomer(){
    let id = $("#txtSearchCustomer").val();
    if(id === ""){
        alert("Please insert a search-value");
    }else{
        let value = null;
        value = customers.find(function (e){
            if(e.getCustomerID() === id){
                return e;
            }
        });

        if(value != null){
            $("#txtCustomerId").val(value.getCustomerID());
            $("#txtCustomerName").val(value.getCustomerName());
            $("#txtEmail").val(value.getEmail());
            $("#txtTelNo").val(value.getTelephone());
        }else{
            $("#txtCustomerId").val(null);
            $("#txtCustomerName").val(null);
            $("#txtEmail").val(null);
            $("#txtTelNo").val(null);
            alert("Nothing here like this");
        }
    }
}

function deleteCustomer(){

    let id = $("#txtCustomerId").val();
    let index=0;
    for (let i = 0; i < customers.length; i++) {
        if(customers[i].getCustomerID() === id){
            index =  i;
        }
    }

    customers.splice(index,1);

    $("#txtCustomerId").val(null);
    $("#txtCustomerName").val(null);
    $("#txtEmail").val(null);
    $("#txtTelNo").val(null);
}

function updateCustomer(){

    const code = $("#txtCustomerId").val();
    const customerName = $("#txtCustomerName").val();
    const email = $("#txtEmail").val();
    const tel = $("#txtTelNo").val();

    let customerArray = new CustomerDTO(code,customerName,email,tel);

    if(code!=='' && customerName!=='' && email!=='' && tel!==''){
        let index=0;
        for (let i = 0; i < customers.length; i++) {
            if(customers[i].getCustomerID() === code){
                index =  i;
            }
        }

        customers[index] = customerArray;
        loadAllCustomersToTable();
    }else{
        alert("Please fill th fields Before Update");
    }
}

$("#btnGenerateCustomerId").click(function (){
    $("#txtCustomerId").val(generateCustomerId());
    console.log("clicked");
    $("#txtCustomerName").focus();
});

function generateCustomerId(){
    if(customers.length === 0){
        return "C00-001";
    }else{
        let getId = customers[customers.length-1].getCustomerID();
        let number = Number(getId.substr(4,7));
        let nextNum = number + 1;

        let nextId;

        if(nextNum<10){
            nextId = "C00-00"+nextNum;
        }else if(nextNum<100){
            nextId = "C00-0"+nextNum;
        }else{
            nextId = "C00-100";
        }

        console.log(nextId + " Id");
        return nextId;
    }
}

function validate(regEx,textField,req){

    $(textField).keyup(function (){
        let word = $(textField).val();
        console.log("typed : "+word);
        let correct = regEx.test(word);

        if(correct){
            $(textField).css('border','1px solid green');
            $(req).text("");

        }else{
            $(textField).css('border','1px solid red');
            $(req).text("valid input required");
        }
    });
}

function navigateToNext(from,to,req){
    $(from).keyup(function (event){
        if(event.key == "Enter"){
            if($(req).text() === '') {
                $(to).focus();
            }
        }
    });
}

$("#addNewCustomer").click(function (){

    addNewCustomerToTable();

    afterManipulateCustomerDOM();
});

$("#customer-body>tr").click(function (){
    loadCustomersToTextFields(this);
});

$("#btnSrchCustomer").click(function (){
    searchCustomer();
});

$("#clearCusFields").click(function (){
    $("#txtCustomerId").val(null);
    $("#txtCustomerName").val(null);
    $("#txtEmail").val(null);
    $("#txtTelNo").val(null);
});

$("#clearCusFields").click(function (){
    $("#txtCustomerId").val(null);
    $("#txtCustomerName").val(null);
    $("#txtEmail").val(null);
    $("#txtTelNo").val(null);

    afterManipulateCustomerDOM();
});

$("#updateCustomer").click(function (){
    updateCustomer();

    afterManipulateCustomerDOM();
});

validate(/^(C00-)[0-9]{3,4}$/,"#txtCustomerId","#req-txtCusId");
validate(/^[a-zA-Z]{2,15}$/,"#txtCustomerName","#req-txtCusName");
validate(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"#txtEmail","#req-txtCusAddress");
validate(/^[0-9]{10}$/,"#txtTelNo","#req-txtCusTel");

/*validate(/^(C00-)[0-9]{3,4}$/,"#txtCustomerId","#req-txtCusId");
validate(/^[a-zA-Z]{2,15}$/,"#txtCustomerName","#req-txtCusName");
validate(/^[a-zA-Z]{2,15}$/,"#txtEmail","#req-txtCusAddress");
validate(/^[0-9]{4,10}$/,"#txtTelNo","#req-txtCusTel");*/

navigateToNext("#txtCustomerId","#txtCustomerName","#req-txtCusId");
navigateToNext("#txtCustomerName","#txtEmail","#req-txtCusName");
navigateToNext("#txtEmail","#txtTelNo","#req-txtCusAddress");
navigateToNext("#txtTelNo","#addNewCustomer","#req-txtCusTel");