import { useState } from 'react';

function App() {
  const [bills, setBills] = useState([]);
  const [form, setForm] = useState({ customer: '', item: '', price: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addBill = () => {
    if (form.customer && form.item && form.price) {
      setBills([...bills, { ...form, price: parseFloat(form.price) }]);
      setForm({ customer: '', item: '', price: '' });
    }
  };

  const getTotal = () =>
    bills.reduce((total, bill) => total + bill.price, 0);

  const resetBills = () => setBills([]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🧾 Growora Billing Software</h1>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          name="customer"
          placeholder="Customer Name"
          value={form.customer}
          onChange={handleChange}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="text"
          name="item"
          placeholder="Item"
          value={form.item}
          onChange={handleChange}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          style={{ marginRight: '0.5rem' }}
        />
        <button onClick={addBill}>Add Bill</button>
      </div>

      <table border="1" cellPadding="8" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Customer</th>
            <th>Item</th>
            <th>Price (₹)</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{bill.customer}</td>
              <td>{bill.item}</td>
              <td>{bill.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ marginTop: '1rem' }}>Total: ₹{getTotal().toFixed(2)}</h3>

      <button onClick={resetBills} style={{ marginTop: '1rem' }}>Reset</button>
    </div>
  );
}

export default App;


