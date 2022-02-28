function loadAllOrderHistoryToTable(){
    $("#tblOrderDetail-body").empty();
    for(const i in orderHistory) {
        let row = `<tr><td>${orderHistory[i].orderId}</td><td>${orderHistory[i].customerID}</td><td>${orderHistory[i].date}</td><td>${orderHistory[i].time}</td>
                    <td>${orderHistory[i].totalAmount}</td></tr>`;
        $("#tblOrderDetail").append(row);
    }
}

$("#orderHistory").click(function (){
    console.log("fq");
    loadAllOrderHistoryToTable();

    $("")
});
