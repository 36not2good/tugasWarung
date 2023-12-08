import React, { Component } from 'react';
import './footer.css'

class Footer extends Component {
  render() {

    const instagramUrl ='https://www.instagram.com/instagram/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA=='
    return (
      <footer>
        <div className="footer-container">
          <div className="content-footer">
          <h2>Canteen</h2>
          
          <div className='instagram'>
          <img src="/image/instagram.png" alt="" />
          <a href={instagramUrl}>
          <h4>instagram</h4>
          <h3>@canteen</h3>
          </a>
          </div>

          <div className='pin-map'>
          <img src="/image/pin.png" alt="" />
          <div className='alamat'>
          <h4>
            Alamat
          </h4>
          <h3>Jl. A. Yani No.239, Merdeka, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40113</h3>
          </div>
          </div>
          </div>
          <hr/>
          <div className="copyright">
          <span>&copy; Created by Melati Gusti Hidayah and Rika Kurnia. Copyright since 2023</span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
