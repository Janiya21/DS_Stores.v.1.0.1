function CustomerDTO(customerID, name, email, telephone){
    var _customerID = customerID;
    var _customerName = name;
    var _email = email;
    var _telephone = telephone;

    this.getCustomerID = function (){
        return _customerID;
    }

    this.getCustomerName = function (){
        return _customerName;
    }

    this.getEmail = function (){
        return _email;
    }

    this.getTelephone = function (){
        return _telephone;
    }

    this.setCustomerID = function (customerID){
        _customerID = customerID;
    }

    this.setCustomerName = function (customerName){
        _customerName = customerName;
    }

    this.setCustomerMail = function (email){
        _email = email;
    }

    this.stCustomerTel = function (tel){
        _telephone = tel;
    }
}
