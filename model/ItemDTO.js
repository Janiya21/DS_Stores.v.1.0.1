function ItemDTO(itemCode,name,unitPrice,qty){

    var _itemCode = itemCode;
    var _itemName = name;
    var _unitPrice = unitPrice;
    var _itemQty = qty;

    this.getItemCode = function (){
        return _itemCode;
    }

    this.getItemName = function (){
        return _itemName;
    }

    this.getUnitPrice = function (){
        return _unitPrice;
    }

    this.getItemQty = function (){
        return _itemQty;
    }

    this.setItemCode = function (itemCode){
        _itemCode = itemCode;
    }

    this.setItemName = function (itemName){
        _itemName = itemName;
    }

    this.setUnitPrice = function (unitPrice){
        _unitPrice = unitPrice;
    }

    this.setItemQty = function (qty){
        _itemQty = qty;
    }
}

