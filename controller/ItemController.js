function afterManipulateDOM(){
    $("#item-body>tr").off();

    $("#item-body>tr").click(function (){
        loadItemsToTextFields(this);
    });

    $("#item-body>tr").dblclick(function (){
        removeTblItem(this);
    });
}

function addNewItemToTable(){

    const id = $("#txtItemCode").val();
    const name = $("#txtItemName").val();
    const price = $("#txtUnitPrice").val();
    const qty = $("#txtQty").val();

    let itemArray = {
        itemID:id,
        itemName:name,
        itemPrice:price,
        itemQty:qty
    };

    items.push(itemArray);

    if( ($("#req-txtItemCode").text() === '') && (id !== "") && ($("#req-txtItemName").text() === '') && (name !=="")
        && ($("#req-txtItemPrice").text() === '') && (price !=="") && ($("#req-txtItemQty").text() === '') && (qty !=="")){

        let i = items.length -1;

        let row = `<tr><td>${items[i].itemID}</td><td>${items[i].itemName}</td><td>${items[i].itemPrice}</td><td>${items[i].itemQty}</td></tr>`;
        $("#itemTable").append(row);

    }else{
        alert("Please check all inputs in item form");
    }
}

function loadAllItemsToTable(){
    $("#item-body").empty();
    for(const i in items) {
        let row = `<tr><td>${items[i].itemID}</td><td>${items[i].itemName}</td><td>${items[i].itemPrice}</td><td>${items[i].itemQty}</td></tr>`;
        $("#itemTable").append(row);
    }
}

function removeTblItem(row){
    if($("#txtItemCode").val() !== ""){
        $(row).remove();
        deleteItem();
    }
}

function loadItemsToTextFields(row){
    let itemID = $(row).children(":eq(0)").text();
    let itemName = $(row).children(":eq(1)").text();
    let itemPrice = $(row).children(":eq(2)").text();
    let itemQty = $(row).children(":eq(3)").text();

    console.log(itemID, itemName, itemPrice, itemQty);

    $("#txtItemCode").val(itemID);
    $("#txtItemName").val(itemName);
    $("#txtUnitPrice").val(itemPrice);
    $("#txtQty").val(itemQty);

}

function searchItem(){
    let id = $("#txtSearchItem").val();
    if(id === ""){
        alert("Please insert a search-value");
    }else{
        let value = null;
        value = items.find(function (e){
            if(e.itemID === id){
                return e;
            }
        });

        if(value != null){
            $("#txtItemCode").val(value.itemID);
            $("#txtItemName").val(value.itemName);
            $("#txtUnitPrice").val(value.itemPrice);
            $("#txtQty").val(value.itemQty);
        }else{
            $("#txtItemCode").val(null);
            $("#txtItemName").val(null);
            $("#txtUnitPrice").val(null);
            $("#txtQty").val(null);
            alert("Nothing here lik this");
        }
    }
}

function deleteItem(){
    let id = $("#txtItemCode").val();
    let index=0;
    for (let i = 0; i < items.length; i++) {
        if(items[i].itemID === id){
            index =  i;
        }
    }

    items.splice(index,1);

    $("#txtItemCode").val(null);
    $("#txtItemName").val(null);
    $("#txtUnitPrice").val(null);
    $("#txtQty").val(null);
}

function updateItem(){

    const id = $("#txtItemCode").val();
    const name = $("#txtItemName").val();
    const price = $("#txtUnitPrice").val();
    const qty = $("#txtQty").val();

    let itemArray = {
        itemID:id,
        itemName:name,
        itemPrice:price,
        itemQty:qty
    };

    let index=0;
    for (let i = 0; i < items.length; i++) {
        if(items[i].itemID === id){
            index =  i;
        }
    }

    items[index] = itemArray;
    loadAllItemsToTable();
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

$("#addNewItem").click(function (){

    addNewItemToTable();

    afterManipulateDOM();
});

$("#item-body>tr").click(function (){
    loadItemsToTextFields(this);
});

$("#btnSrchItem").click(function (){
    searchItem();
});

$("#clearItemFields").click(function (){
    $("#txtItemCode").val(null);
    $("#txtItemName").val(null);
    $("#txtUnitPrice").val(null);
    $("#txtQty").val(null);

    afterManipulateDOM();
});

$("#updateItem").click(function (){
    updateItem();

    afterManipulateDOM();
});

validate(/^(I00-)[0-9]{3,4}$/,"#txtItemCode","#req-txtItemCode");
validate(/^[a-zA-Z]{2,10}$/,"#txtItemName","#req-txtItemName");
validate(/^[0-9]{2,8}$/,"#txtUnitPrice","#req-txtItemPrice");
validate(/^[0-9]{1,5}$/,"#txtQty","#req-txtItemQty");

navigateToNext("#txtItemCode","#txtItemName","#req-txtItemCode");
navigateToNext("#txtItemName","#txtUnitPrice","#req-txtItemName");
navigateToNext("#txtUnitPrice","#txtQty","#req-txtItemPrice");
navigateToNext("#txtQty","#addNewItem","#req-txtItemQty");