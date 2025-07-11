import { useState, useEffect, useRef } from "react";

function App() {
  const [customer, setCustomer] = useState("");
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [bills, setBills] = useState([]);
  const invoiceRef = useRef();

  // Load saved bills
  useEffect(() => {
    const saved = localStorage.getItem("bills");
    if (saved) {
      setBills(JSON.parse(saved));
    }
  }, []);

  // Save whenever bills change
  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(bills));
  }, [bills]);

  const addBill = () => {
    if (customer && item && price) {
      setBills([...bills, { customer, item, price: parseFloat(price) }]);
      setCustomer("");
      setItem("");
      setPrice("");
    }
  };

  const deleteBill = (i) => {
    const copy = [...bills];
    copy.splice(i, 1);
    setBills(copy);
  };

  const reset = () => {
    setBills([]);
    localStorage.removeItem("bills");
  };

  const total = bills.reduce((sum, b) => sum + b.price, 0);

  const printInvoice = () => {
    const printContent = invoiceRef.current.innerHTML;
    const win = window.open("", "Print Invoice", "width=600,height=600");
    win.document.write(`
      <html>
        <head>
          <title>Growora Invoice</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            h2 { text-align: center; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "600px", margin: "auto" }}>
      <h1>🧾 Growora Billing</h1>

      <input placeholder="Customer" value={customer} onChange={(e) => setCustomer(e.target.value)}

