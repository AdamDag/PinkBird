function getAPIdata(barcode) {
    const proxyurl = "https://pinkbird.herokuapp.com/"; // Use a proxy to avoid CORS error
    const api_key = "vva9dg8tt9lljbuwsleah5ff4i2zdp";
    //CONCATENATE BARCODE WITH URL
   //const url = "https://api.barcodelookup.com/v2/products?barcode=" + barcode + "&formatted=y&key=" + api_key;
    const url = proxyurl + "https://api.barcodelookup.com/v3/products?barcode=077341125112&formatted=y&key=" + api_key;
    fetch(url)
            .then(response => response.json())
            .then((data) => {
           document.getElementById("BarcodeNumber").innerHTML = (data.products[0].barcode_number);
    document.getElementById("Title").innerHTML = (data.products[0].title);
    document.getElementById("EntireResponse").innerHTML = JSON.stringify(data, null,"<br/>");
            })
            .catch(err => { 
                throw err 
            });
}

//
