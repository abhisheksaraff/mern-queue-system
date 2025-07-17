import "./Footer.css";
import linkedinLogo from "../../assets/linkedin.webp";
import githubLogo from "../../assets/github.webp";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="container">
        <div className="left">© 2025 Abhishek Saraff</div>
        <div className="right">
          <a href="https://linkedin.com/in/abhisheksaraff" target="_blank">
            <img
              id="linkedin"
              src={linkedinLogo}
              alt=""
              width="25"
              height="25"
            />
          </a>
          <a href="https://github.com/abhisheksaraff" target="_blank">
            <img
              id="github"
              src={githubLogo}
              alt=""
              width="25"
              height="25"
            />
          </a>
        </div>
      </div>
      <div className="base-layer"></div>
    </div>
  );
};

export default Footer;
