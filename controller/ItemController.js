function afterManipulateItemDOM(){
    $("#item-body>tr").off();

    $("#item-body>tr").click(function (){
        loadItemsToTextFields(this);
    });

    $("#item-body>tr").dblclick(function (){
        removeTblItem(this);
    });
}

$("#register").click(function (){
    $("#txtItemCode").val(null);
    $("#txtItemName").val(null);
    $("#txtUnitPrice").val(null);
    $("#txtQty").val(null);

    loadAllItemsToTable();
});

$("#btnGenerateItemId").click(function (){
    $("#txtItemCode").val(generateItemId());
    console.log("clicked");
});

function generateItemId(){
    if(items.length === 0){
        return "I00-001";
    }else{
        let getId = items[items.length-1].getItemCode();
        let number = Number(getId.substr(4,7));
        let nextNum = number + 1;

        let nextId;

        if(nextNum<10){
            nextId = "I00-00"+nextNum;
        }else if(nextNum<100){
            nextId = "I00-0"+nextNum;
        }else{
            nextId = "I00-100";
        }

        console.log(nextId + " Id");
        return nextId;
    }
}

function addNewItemToTable(){

    const id = $("#txtItemCode").val();
    const name = $("#txtItemName").val();
    const price = $("#txtUnitPrice").val();
    const qty = $("#txtQty").val();

    let itemArray = new ItemDTO(id,name,price,qty);

    if( ($("#req-txtItemCode").text() === '') && (id !== "") && ($("#req-txtItemName").text() === '') && (name !=="")
        && ($("#req-txtItemPrice").text() === '') && (price !=="") && ($("#req-txtItemQty").text() === '') && (qty !=="")){

        let isExist = false;

        for (const i in items) {
            if(items[i].getItemCode() === id){
                isExist = true;
            }
        }

        if(isExist){
            alert("This ID is already taken");
        }else{

            items.push(itemArray);

            let i = items.length -1;

            let row = `<tr><td>${items[i].getItemCode()}</td><td>${items[i].getItemName()}</td><td>${items[i].getUnitPrice()}</td><td>${items[i].getItemQty()}</td></tr>`;
            $("#itemTable").append(row);
        }

    }else{
        alert("Please check all inputs in item form");
    }
}

function loadAllItemsToTable(){
    $("#item-body").empty();
    for(const i in items) {
        let row = `<tr><td>${items[i].getItemCode()}</td><td>${items[i].getItemName()}</td><td>${items[i].getUnitPrice()}</td><td>${items[i].getItemQty()}</td></tr>`;
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
            if(e.getItemCode() === id){
                return e;
            }
        });

        if(value != null){
            $("#txtItemCode").val(value.getItemCode());
            $("#txtItemName").val(value.getItemName());
            $("#txtUnitPrice").val(value.getUnitPrice());
            $("#txtQty").val(value.getItemQty());
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
        if(items[i].getItemCode() === id){
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

    let itemArray = new ItemDTO(id,name,price,qty);

    let index=0;
    for (let i = 0; i < items.length; i++) {
        if(items[i].getItemCode() === id){
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

    afterManipulateItemDOM();
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

    afterManipulateItemDOM();
});

$("#updateItem").click(function (){
    updateItem();

    afterManipulateItemDOM();
});

validate(/^(I00-)[0-9]{3,4}$/,"#txtItemCode","#req-txtItemCode");
validate(/^[a-zA-Z]{2,10}$/,"#txtItemName","#req-txtItemName");
validate(/^[0-9]{2,8}$/,"#txtUnitPrice","#req-txtItemPrice");
validate(/^[0-9]{1,5}$/,"#txtQty","#req-txtItemQty");

navigateToNext("#txtItemCode","#txtItemName","#req-txtItemCode");
navigateToNext("#txtItemName","#txtUnitPrice","#req-txtItemName");
navigateToNext("#txtUnitPrice","#txtQty","#req-txtItemPrice");
navigateToNext("#txtQty","#addNewItem","#req-txtItemQty");