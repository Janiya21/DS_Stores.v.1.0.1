function loadAllOrderHistoryToTable(){
    $("#tblOrderDetail-body").empty();
    for(const i in orderHistory) {
        let row = `<tr><td>${orderHistory[i].orderId}</td><td>${orderHistory[i].customerID}</td><td>${orderHistory[i].date}</td>
                    <td>${orderHistory[i].discount}</td><td>${orderHistory[i].totalAmount}</td></tr>`;
        $("#tblOrderDetail").append(row);
    }
}

function loadSearchedOrderToOrderTable(){
    if($("#searchID").val() !== ""){
        $("#tblOrderDetail-body").empty();
        let id = $("#searchID").val();

        for(const i in orderHistory) {

            if(orderHistory[i].orderId===id){
                let row = `<tr><td>${orderHistory[i].orderId}</td><td>${orderHistory[i].customerID}</td><td>${orderHistory[i].date}</td>
                    <td>${orderHistory[i].discount}</td><td>${orderHistory[i].totalAmount}</td></tr>`;
                $("#tblOrderDetail").append(row);
            }
        }
    }else{
        alert("Please insert an ID");
    }

}

function loadSelectedRow(row){

    $("#tblItemDetail-body").empty();
    let oId = $(row).children(":eq(0)").text();

    console.log(oId + " oId");

    for (let i=0; i< orderDetails.length; i++) {
        console.log(orderDetails[i].getORDOrderId() + " i " + oId);

        if(orderDetails[i].getORDOrderId() === oId){

            console.log( orderDetails[i].getORDOrderId() + "  /  " + oId);

            let row = `<tr><td>${orderDetails[i].getORDItemId()}</td><td>${orderDetails[i].getORDItemName()}</td>
                        <td>${orderDetails[i].getORDUnits()}</td><td>${orderDetails[i].getORDUnitPrice()}</td>
                            <td>${orderDetails[i].getORDTotal()}</td></tr>`;
            $("#tblItemDetail").append(row);
        }
    }
}

$("#orderHistory").click(function (){
    loadAllOrderHistoryToTable();

    $("#tblOrderDetail-body > tr").click(function (){
        loadSelectedRow(this);
    });
});

$("#btnSearchOrder").click(function (){
    loadSearchedOrderToOrderTable();

    $("#tblItemDetail-body").empty();

    $("#tblOrderDetail-body > tr").click(function (){
        loadSelectedRow(this);
    });
});

$("#btnReload").click(function (){
    loadAllOrderHistoryToTable();

    $("#tblItemDetail-body").empty();

    $("#tblOrderDetail-body > tr").click(function (){
        loadSelectedRow(this);
    });
});



