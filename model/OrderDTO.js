function OrderDTO(orderID, customerID, itemID, itemName, units, unitPrice, total){
    var _orderID = orderID;
    var _customerID = customerID;
    var _itemID = itemID;
    var _itemName = itemName;
    var _units = units;
    var _unitPrice = unitPrice;
    var _total = total;

    this.getORDOrderId = function (){
        return _orderID;
    }
    this.getORDCustomerId = function (){
        return _customerID;
    }
    this.getORDItemId = function (){
        return _itemID;
    }
    this.getORDItemName = function (){
        return _itemName;
    }
    this.getORDUnits = function(){
        return _units;
    }
    this.getORDUnitPrice = function (){
        return _unitPrice;
    }
    this.getORDTotal = function (){
        return _total;
    }

    this.setORDOrderID = function (orderID){
        _orderID = orderID;
    }
    this.setORDCustomerID = function (customerID){
        _customerID = customerID;
    }
    this.setORDItemID = function (itemID){
        _itemID = itemID;
    }
    this.setItemName = function (itemName){
        _itemName = itemName;
    }
    this.setORDUnits = function (units){
        _units = units;
    }
    this.stORDUnitPrice = function (unitPrice){
        _unitPrice = unitPrice;
    }
    this.setORDTotal = function (total){
        _total = total;
    }

}