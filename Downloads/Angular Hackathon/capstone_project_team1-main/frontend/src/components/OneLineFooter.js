import '../css/OneLineFooter.css';

export default function OneLineFooter() {
  return (
    <div className="footerContainer">
        <ul>
            <li><a title="Legal Info" href="#" target="_blank">Legal Info</a></li>
            <li><span>·</span></li>
    		    <li><a title="Security Centre"  href="#" target="_blank">Security Centre</a></li>
            <li><span>·</span></li>
            <li><a title="Privacy and Cookies" href="#" target="_blank">Privacy & Cookies</a></li>
            <li><span>·</span></li>
            <li><a title="Sitemap"  href="/sitemap">Sitemap</a></li>
            <li><span>·</span></li>
    		    <li><a title="Accessibility" href="#" target="_blank">Accessibility</a></li>
            <li><span>·</span></li>
    		    <li><span>© 2005-2023 National Westminster Bank plc</span></li>
        </ul>
    </div>
  )
}