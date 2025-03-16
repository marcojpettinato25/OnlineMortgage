import React, { useState } from 'react';
import './App.css';

export function App() {
  // State for the text fields
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [annualPropertyTaxes, setAnnualPropertyTaxes] = useState('');
  const [MonthlyBudget, setMonthlyBudget] = useState('');

  // Handle change function to update state
  const handleChange = (e, setField) => 
  {
    setField(e.target.value);
  };

  const formatDecimal = (number, decimals) => 
  {
    const factor = Math.pow(10, decimals);
    return (Math.round(number * factor) / factor).toLocaleString();
  };
  // Function to process field values, convert to numbers, and perform math operations
  const processFieldsAndCalculate = () => 
  {
    // Convert the field values to numbers (parseFloat for decimal numbers)
    const fields = [
      parseFloat(loanAmount) || 0, // Default to 0 if the value is NaN
      parseFloat(interestRate) || 0,
      parseFloat(annualPropertyTaxes) || 0,
      parseFloat(MonthlyBudget) || 0
    ];
    // Example: Summing the values
    let finalStatement = "";
		let interestRateForMath = fields[1] / 100;
		let monthlyPropertyTaxes = fields[2] / 12;
		let originalLoanAmount = fields[0];
    let floatingLoanAmount = fields[0];

    //Declare instances for while
    let finalPaymentAmount = 0;
    let totalPaymentsMade = 0;
    let intMonthsOfPayments = 0;
    let tippingPoint = 0;
    let monthlyInterest = 0
    let monthlyPaymentOutsideOfInterest = 0
  
    while(floatingLoanAmount > 0)
    {
      monthlyInterest = (floatingLoanAmount * interestRateForMath) / 12;
			monthlyPaymentOutsideOfInterest = fields[3] - monthlyInterest - monthlyPropertyTaxes;

      if (monthlyInterest < monthlyPaymentOutsideOfInterest && tippingPoint === 0)
      {
        tippingPoint = intMonthsOfPayments + 1;
      }
      if (floatingLoanAmount < fields[3])
      {
        finalPaymentAmount = floatingLoanAmount;
        totalPaymentsMade += floatingLoanAmount;
        intMonthsOfPayments += 1;
        floatingLoanAmount = 0;
      }
    
      else
      {
        floatingLoanAmount = floatingLoanAmount - monthlyPaymentOutsideOfInterest; //break condition
        totalPaymentsMade = totalPaymentsMade + monthlyPaymentOutsideOfInterest + monthlyInterest + monthlyPropertyTaxes;
        intMonthsOfPayments = intMonthsOfPayments + 1;
      }
  }
    // Create a pop-up window to display the result
    const popupWindow = 
    window.open(
      '', // Empty string to open a blank window
      'Results', // Name of the pop-up window
      'width=2000,height=1000' // Size of the pop-up window
    );

    // Add content to the pop-up window
    popupWindow.document.write(`
      <html>
        <head>
          <title>Results</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              background-color: #f4f4f4;
              color: #333;
            }
            h2 {
              color: #00bcd4;
            }
          </style>
        </head>
        <body>
          <h2>A real look at your loan</h2>
          <p>${finalStatement}</p>
          <p>Final Payment Amount: ${formatDecimal(finalPaymentAmount, 2)} </p>
          <p>Total Number of Payments: ${intMonthsOfPayments}</p>
          <p>Total Number of Years to pay back: ${formatDecimal(intMonthsOfPayments / 12, 2)}</p>
          <p>Month Principal Payments Overtake Interest: ${tippingPoint} </p>
          <p>Above in terms of years: ${formatDecimal((tippingPoint / 12), 2)}  </p>
          <p>Original Loan Amount: ${formatDecimal(originalLoanAmount,2)} </p>
          <p>Total amount paid in interest: ${formatDecimal((totalPaymentsMade - originalLoanAmount),2)}  </p>
          <p>Total Amount of Money paid: ${formatDecimal(totalPaymentsMade,2)} </p>
          <p>Total Payback percentage: ${formatDecimal((totalPaymentsMade / originalLoanAmount),2)}</p>
        </body>
      </html>
    `);

    popupWindow.document.close(); // Close the document to render content
  };

  // Function triggered when CTA button is clicked
  const handleCtaClick = () => {
    processFieldsAndCalculate(); // Call the function to process the fields and calculate math
  };

  return (
    <div className="App">
      <header className="App-header">
        <nav className="navbar">
          <div className="logo">My Home Budget</div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      
      <section id="home" className="hero-section">
        <h1>My Home Budget</h1>
        <p>Helping you understand the cost for the home of your dreams</p>
        
        {/* Text fields added to hero section */}
        <div className="hero-form">
          <label>
            Loan Amount:<br/> <br/>
            <input 
              type="float" 
              value={loanAmount} 
              onChange={(e) => handleChange(e, setLoanAmount)} 
              placeholder="Enter the loan amount you plan to take"
            />
          </label>
          <br />
          <label>
            Interest Rate:<br/> <br/>
            <input 
              type="float" 
              value={interestRate} 
              onChange={(e) => handleChange(e, setInterestRate)} 
              placeholder="Enter the interest rate of the loan"
            />
          </label>
          <br />
          <label>
            Annual Property Taxes:<br/> <br/>
            <input 
              type="float" 
              value={annualPropertyTaxes} 
              onChange={(e) => handleChange(e, setAnnualPropertyTaxes)} 
              placeholder="Enter the annual property taxes"
            />
          </label>
          <br />
          <label>
            Monthly Budget:<br/> <br/>
            <input 
              type="float" 
              value={MonthlyBudget} 
              onChange={(e) => handleChange(e, setMonthlyBudget)} 
              placeholder="Enter the budget you plan on spending per month"
            />
          </label>
        </div>

        <button className="cta-button" onClick={handleCtaClick}>
          Determine my true cost
        </button>
      </section>
      
      <section id="about" className="section-content">
        <h2>About Us</h2>
        <p>We help you understand what your mortgage will really cost you</p>
      </section>

      <section id="services" className="section-content">
        <h2>Our Services</h2>
        <p>We break the payments down in a way that no one else can</p>
      </section>

      <section id="contact" className="section-content">
        <h2>Contact Us</h2>
        <p>Get in touch with us before your big purchase!</p>
      </section>
      
      <footer className="App-footer">
        <p>&copy; 2025 HomeBudget. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
