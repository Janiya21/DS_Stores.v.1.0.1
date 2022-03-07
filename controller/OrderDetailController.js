function loadAllOrderHistoryToTable(){
    $("#tblOrderDetail-body").empty();
    for(const i in orderHistory) {
        let row = `<tr><td>${orderHistory[i].orderId}</td><td>${orderHistory[i].customerID}</td><td>${orderHistory[i].date}</td>
                    <td>${orderHistory[i].discount}</td><td>${orderHistory[i].totalAmount}</td></tr>`;
        $("#tblOrderDetail").append(row);
    }
}

function loadSearchedOrderToOrderTable(){
    $("#tblOrderDetail-body").empty();
    let id = $("#searchID").val();

    for(const i in orderHistory) {

        if(orderHistory[i].orderId===id){
            let row = `<tr><td>${orderHistory[i].orderId}</td><td>${orderHistory[i].customerID}</td><td>${orderHistory[i].date}</td>
                    <td>${orderHistory[i].discount}</td><td>${orderHistory[i].totalAmount}</td></tr>`;
            $("#tblOrderDetail").append(row);
        }
    }
}

$("#orderHistory").click(function (){
    loadAllOrderHistoryToTable();

    $("#tblOrderDetail-body > tr").click(function (){

        $("#tblItemDetail-body").empty();
        let oId = $(this).children(":eq(0)").text();

        console.log(oId + " oId");

        for (let i=0; i< orderDetails.length; i++) {
            console.log(i + " i");

            if(orderDetails[i].orderID === oId){

                console.log( orderDetails[i].orderID + "  /  " + oId);

                let row = `<tr><td>${orderDetails[i].itemID}</td><td>${orderDetails[i].itemName}</td><td>${orderDetails[i].units}</td><td>${orderDetails[i].unitPrice}</td>
                            <td>${orderDetails[i].total}</td></tr>`;
                $("#tblItemDetail").append(row);
            }
        }
    });
});

$("#btnSearchOrder").click(function (){
    console.log("hello");
    loadSearchedOrderToOrderTable();
});
