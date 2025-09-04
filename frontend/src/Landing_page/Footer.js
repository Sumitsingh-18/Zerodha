import React, { useState} from "react";

function Footer() {

   const [hover, setHover] = useState(false);

  return (
    <footer style={{backgroundColor: "rgb(240, 240, 240)"}}>
    <div className="container border-top mt-5" >
      <div className="row mt-5 flex gap-5">
        <div className="col">
          <img src="images/logo.svg" alt="logo" style={{ width: "45%" }} />
          <p className="mt-2">
            &copy; 2010 - 2024, Not Zerodha Broking Ltd. All rights reserved.
          </p> <hr />  

          

        <div className="col">
          
          <a href="https://www.instagram.com/zerodhaonline/" className="custom-icon"><i class="fa-brands fa-instagram fa-lg"></i></a> &nbsp;&nbsp;&nbsp;
           
          <a href="https://www.facebook.com/zerodha.social" className="custom-icon"><i class="fa-brands fa-square-facebook fa-lg"></i></a>  &nbsp;&nbsp;&nbsp;
          
          <a href="https://www.linkedin.com/company/zerodha/" className="custom-icon"><i class="fa-brands fa-linkedin fa-lg"></i></a>  &nbsp;&nbsp;&nbsp;
         
          <a href="https://www.youtube.com/@zerodhaonline" className="custom-icon"><i class="fa-brands fa-youtube fa-lg"></i></a>  &nbsp;&nbsp;&nbsp;
          
          <a href="https://x.com/zerodhaonline" className="custom-icon"><i class="fa-brands fa-square-x-twitter fa-lg"></i></a>
          
          </div>
     
         </div>

        <div className="col">
          <p>Company</p>
          <div className="row flex gap-2">
          <a href="" className="custom-link">About</a>
        
          <a href="" className="custom-link">Products</a>
          
          <a href="" className="custom-link">Pricing</a>
          
          <a href="" className="custom-link">Referral programme </a>
          
          <a href="" className="custom-link">Careers</a>
                 
          <a href="" className="custom-link">Zerodha.tech</a>
          
          <a href="" className="custom-link">Press & media</a>
          
          <a href="" className="custom-link">Zerodha cares (CSR)</a>
          
          </div>
        </div>
        <div className="col">
          <p>Support</p>
          <div className="row flex gap-2">
          <a href="" className="custom-link">Contact</a>
          
          <a href="" className="custom-link">Support portal</a>
          
          <a href="" className="custom-link">Z-Connect blog</a>
          
          <a href="" className="custom-link">List of charges</a>
          
          <a href="" className="custom-link">Downloads & resources</a>
         
          </div>
        </div>
        <div className="col">
          <p>Account</p>
          <div className="row flex gap-2">

          <a href="" className="custom-link">Open an account</a>
          
          <a href="" className="custom-link">Fund transfer</a>
          
          <a href="" className="custom-link">60 day challenge</a>
        
          </div>
        </div>
        
      </div>

      <div className="mt-5 text-small text-muted" style={{ fontSize: "14px" }}>

      <p>
        Zerodha Broking Ltd.: Member of NSE, BSE​ &​ MCX – SEBI Registration
        no.: INZ000031633 CDSL/NSDL: Depository services through Zerodha Broking
        Ltd. – SEBI Registration no.: IN-DP-431-2019 Commodity Trading through
        Zerodha Commodities Pvt. Ltd. MCX: 46025; NSE-50001 – SEBI Registration
        no.: INZ000038238 Registered Address: Zerodha Broking Ltd., #153/154,
        4th Cross, Dollars Colony, Opp. Clarence Public School, J.P Nagar 4th
        Phase, Bengaluru - 560078, Karnataka, India. For any complaints
        pertaining to securities broking please write to complaints@zerodha.com,
        for DP related to dp@zerodha.com. Please ensure you carefully read the
        Risk Disclosure Document as prescribed by SEBI | ICF
      </p>

      <p>
        Procedure to file a complaint on SEBI SCORES: Register on SCORES portal.
        Mandatory details for filing complaints on SCORES: Name, PAN, Address,
        Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy
        redressal of the grievances
      </p>
      <p>
        Investments in securities market are subject to market risks; read all
        the related documents carefully before investing.
      </p>

      <p>
        Attention investors: 1) Stock brokers can accept securities as margins
        from clients only by way of pledge in the depository system w.e.f
        September 01, 2020. 2) Update your e-mail and phone number with your
        stock broker / depository participant and receive OTP directly from
        depository on your e-mail and/or mobile number to create pledge. 3)
        Check your securities / MF / bonds in the consolidated account statement
        issued by NSDL/CDSL every month.
      </p>

      <p>
      "Prevent unauthorised transactions in your account. Update your mobile
      numbers/email IDs with your stock brokers. Receive information of your
      transactions directly from Exchange on your mobile/email at the end of the
      day. Issued in the interest of investors. KYC is one time exercise while
      dealing in securities markets - once KYC is done through a SEBI registered
      intermediary (broker, DP, Mutual Fund etc.), you need not undergo the same
      process again when you approach another intermediary." Dear Investor, if
      you are subscribing to an IPO, there is no need to issue a cheque. Please
      write the Bank account number and sign the IPO application form to
      authorize your bank to make payment in case of allotment. In case of non
      allotment the funds will remain in your bank account. As a business we
      don't give stock tips, and have not authorized anyone to trade on behalf
      of others. If you find anyone claiming to be part of Zerodha and offering
      such services, please create a ticket here.
      </p> 

     </div>

    

    </div>


     <div className="footer">
       
       <div className="container footer-links">
      
        <a href="https://www.nseindia.com/">NSE</a>
        <a href="https://www.bseindia.com/">BSE</a>
        <a href="https://www.mcxindia.com/">MCX</a>
        <a href="">Terms & Conditions</a>
        <a href="">Policies & procedures</a>
        <a href="">Disclosure</a>
        <a href="">Privacy policy</a>
        <a href="">For investor's attention</a>
        <a href="">Investor charter</a>

        </div>

     </div>

   </footer> 
  );
}

export default Footer;
