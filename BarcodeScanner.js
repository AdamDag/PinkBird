import './App.css';
import React from 'react';
import ScanbotSDK from 'scanbot-web-sdk/webpack'


export default class App extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        lastBarcode: null,
      }
  }

  barcodes = [];

  async componentDidMount() {
    const LICENSE_KEY =
      "k2Hk8727EiJa5ajWK4Dgi3TSTFwmS/" +
      "Nuuzs5/5W7v6Vx+Nz56ehUDW9yXLhw" +
      "q/3O4xH0kqFFLW8GAUPbyLa6yneZA8" +
      "dDehjWluIkr3ouZodXpv0H/vIie49v" +
      "8ABpS0HmwisgMRkVdu+FyKT+vx9GtO" +
      "+C2KFkAin5qEYCUofBYJAOCrV6pfwk" +
      "+i/uwiHQ1RWb4wxkSZZjbTowGJV8aF" +
      "aD44u/0WmQKWuGhPZGdrCfNotb1fuX" +
      "BftpvmA188EmbbV7/IZ6zPArfuMEQY" +
      "6P4lirhX44Mkob18j8Y4NfuzlQlHe3" +
      "HDjqi183e7HfiUJMWgLKWROly/vnX4" +
      "8Gm8XIeuzNIw==\nU2NhbmJvdFNESw" +
      "psb2NhbGhvc3R8cGlua2JpcmQuaGVy" +
      "b2t1YXBwLmNvbQoxNjY5NzY2Mzk5Cj" +
      "gzODg2MDcKOA==\n";
    this.sdk = await ScanbotSDK.initialize({
      licenseKey: LICENSE_KEY,
      engine: "/",
    });

    const config = {
      onBarcodesDetected: this.onBarcodesDetected.bind(this),
      containerId: 'barcode-scanner-view',
    };


    this.barcodeScanner = await this.sdk.createBarcodeScanner(config);
  }

  async onBarcodesDetected(result) {
    this.barcodes.push(result);
    this.setState({
      lastBarcode: result
    });
  }

  render() {
    let barcodeText;
    if (!this.state.lastBarcode) {
      barcodeText = '';
    } else {
      const barcodes = this.state.lastBarcode.barcodes;
      barcodeText = JSON.stringify(
        barcodes.map((barcodes) => barcodes.text + " (" + barcodes.format + ") "));
    }
    return (
      <div>
        <div
          id='barcode-scanner-view'
          style={{ height: "70%", width: "70%" }}>
        </div>
        {barcodeText}
      </div>
    );
  }
}
