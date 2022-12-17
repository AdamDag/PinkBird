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
  "QSsjGsRa+d0YYozwgRa7XyTQKiNlid" +
  "A4T8YBcg2/KDx92YpbdOGHT+JO6cei" +
  "FA19I8elbD8+EX6MEnc6ZnvK6+dVRx" +
  "5JQPQ39FL5fDyUaSzzBRDLWCtlbAH3" +
  "DH9Mn1JMcarI4gLoM6FZkTV2uUOXzJ" +
  "HUXfyFp0rclK+QhDKttB8GwscophuY" +
  "REI43+Rx3HlqhjkgQEsY5PLobUP3me" +
  "QlbbV9UAsJdiDldaqHKC8J4Tmk6LPp" +
  "FGZ94rBjNWn7YYbtN1Kjobow1h+bo2" +
  "k22FD+EHXx6mtnVdhj5KQs05aNwuB4" +
  "PH2v74B91FAageRfLfQYKo2YPL8QAV" +
  "SfsAEXP+j7JQ==\nU2NhbmJvdFNESw" +
  "psb2NhbGhvc3R8cGlua2JpcmQtYXBw" +
  "Lm5ldGxpZnkuYXBwCjE2NzE5MjYzOT" +
  "kKODM4ODYwNwo4\n";
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
