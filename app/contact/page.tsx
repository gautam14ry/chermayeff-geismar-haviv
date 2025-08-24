import Image from "next/image"
import ContatImage from '../../public/contact-collage.jpg'
import './page.css'

const ContactPage = () => {
    return (
        <main id="contact" className="pageType-page">
            <div className="content--container contact--container js-fade__slow">
                <div className="row">
                    <div className="columns columns--4 columns--12--small">
                        <h1>Contact</h1>
                        <p><strong>Work Inquiries</strong><br /><a href="mailto:info@cghnyc.com" rel="noopener" target="_blank">info@cghnyc.com</a><br />212.532.4595</p>
                        <p><strong>Press Inquiries</strong><br />Christopher Nutter<br />917.770.0350<br /><a href="mailto:press@cghnyc.com" rel="noopener" target="_blank">press@cghnyc.com</a></p>
                        <p><strong>Chermayeff &amp; Geismar &amp; Haviv</strong><br />27 West 24th Street, Suite 900<br />New York, NY 10010<br /></p>
                        <p><a href="https://twitter.com/cghnyc" rel="noopener" target="_blank">Twitter</a><br /><a href="https://www.instagram.com/chermayeff_geismar_haviv/" rel="noopener" target="_blank">Instagram</a><br /><a href="https://www.facebook.com/cghnyc" rel="noopener" target="_blank">Facebook</a></p>
                    </div>
                    <div className="columns columns--8 columns--12--small">
                        <Image src={ContatImage} alt="Ivan Chermayeff - Il Furioso" />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ContactPage