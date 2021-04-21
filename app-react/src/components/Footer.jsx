import styled from "styled-components";

const FooterStyled = styled.footer`
    background: var(--main-b-color);
    padding: 10px 15px;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.07), 0 3px 10px 0 rgba(0, 0, 0, 0.07);
    color: white;
    font-size: 12px;
`;

const FooterContent = styled.div`
    a {
        color: white;
    }
`;

const Footer = () => {
    return (
        <FooterStyled className="footer">
            <FooterContent>
                Icons made by &nbsp;
                <a href="https://www.flaticon.com/authors/dighital" title="Dighital">
                    Dighital
                </a>
                &nbsp; from &nbsp;
                <a href="https://www.flaticon.com/" title="Flaticon">
                    www.flaticon.com
                </a>
            </FooterContent>
        </FooterStyled>
    );
};

export default Footer;
