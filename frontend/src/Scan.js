import Button from '@mui/material/Button';
import "./Scan.css";
import { Link } from 'react-router-dom';
import React from 'react';
import ScanbotSDK from 'scanbot-web-sdk/webpack';

export default class Scan extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        lastBarcode: null,
      }
  }
  barcodes = [];
    async componentDidMount() {
      const LICENSE_KEY =
      "NMykExAxSRnCYOKgWUt8FyzTXmw02I" +
      "BoffHT0H5JoM4C7+LENd9bN5X69xMv" +
      "Uwo47UCKSYLIXim3SQLrpZ7/hvRkb6" +
      "nRVMFkoataFiYaCguDfujNAMBeOAKq" +
      "n3D8fa05MPr0AxgtzBnA1dff2JoLTJ" +
      "dE+FfWLkEz5SlI9BWrZy96KOnd9OYb" +
      "Mu2SgYTQb77cBvztgaD+AkTYcDDYFQ" +
      "ms4FugqWl61Ug9j00hHthHJ+m7EjPO" +
      "8d8QXBcgyqMmr6UPm63Nviw3XIVTC9" +
      "NdIVpc9QlJSjTiSSH22Neji4ac3ub0" +
      "dDiyErpANQF7Weomn4XMwD/bqT2Rnv" +
      "NpaKdcDmDeWQ==\nU2NhbmJvdFNESw" +
      "psb2NhbGhvc3R8c3VidGxlLXB1ZGRp" +
      "bmctYTUzNzhkLm5ldGxpZnkuYXBwCj" +
      "E2NzA4ODk1OTkKODM4ODYwNwo4\n";
        this.sdk = await ScanbotSDK.initialize({
        licenseKey: LICENSE_KEY,
        engine: "/",
      });
      const config = {
        onBarcodesDetected: this.onBarcodesDetected.bind(this),
        containerId: 'barcode-scanner-view',
      };
      config.style = {
        window: { borderColor: "pink", aspectRatio: 1.7, width: "100%", left: "50%", top: "50%", paddingPropLeft: 0.5},
        text: { weight: 1000, color: "white", size: "1.1em"},
        hint: "Please align the barcode in the frame to scan it."
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
      barcodeText = barcodeText.replace('["', "");
      barcodeText = barcodeText.split(" ")[0];
      console.log("Barcode:" + barcodeText)

  return (
    <div className = "ScanPage">
      <div
        id='barcode-scanner-view'
        style={{ height: "400px", width: "500px", position: "absolute", left: "50%", top: "50%",
        transform: "translate(-50%, -50%)", border: "10px solid pink", borderRadius: "15px"}}>
      </div>
      <p>Item is ready when barcode appears: </p>
      <Button>
        <Link to = {'/Item/' + barcodeText}>
          <p>{barcodeText}</p>
        </Link>
      </Button>
    </div>
  );
}
}
