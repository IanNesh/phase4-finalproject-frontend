import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../theme";
import styled from "@emotion/styled";

const FooterContainer = styled(Box)`
  margin-top: 70px;
  padding: 40px 0;
  background-color: ${(props) => props.theme.palette.neutral.light};
`;

const ContentWrapper = styled(Box)`
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 30px;
  column-gap: clamp(20px, 30px, 40px);
`;

const Column = styled(Box)`
  width: clamp(20%, 30%, 40%);
`;

const Title = styled(Typography)`
  font-weight: bold;
  color: ${shades.primary[500]};
`;

const Description = styled(Typography)`
  color: ${shades.secondary[700]};
`;

const FooterLink = styled(Typography)`
  margin-bottom: 30px;
  cursor: pointer;
  color: ${shades.secondary[500]};
  transition: color 0.2s;

  &:hover {
    text-decoration: underline;
    color: ${shades.secondary[700]};
  }
`;

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <FooterContainer>
      <ContentWrapper>
        <Column>
          <Title variant="h4" mb="30px">
            Narnia-Library
          </Title>
          <Description variant="body1">
            Narnia Library is a book app designed to cater to book lovers who
            want to explore different genres and authors. The app offers an
            extensive collection of books ranging from classic literature to
            modern-day bestsellers. With Inkwell Library, users can easily
            search for books by author, title, or genre, and save their favorite
            titles to personalized reading lists. The app also features book
            recommendations and reviews from other readers, providing a
            community-driven experience. With a simple and user-friendly
            interface, Inkwell Library makes reading and discovering new books
            easy and accessible. Whether you're a casual reader or a bookworm,
            Narnia Library has something for everyone.
          </Description>
        </Column>

        <Column> </Column>

        <Column>
          <Title variant="h4" mb="30px">
            About Us
          </Title>
          <FooterLink variant="body1" mb="30px">
            Careers
          </FooterLink>
          <FooterLink variant="body1" mb="30px">
            Our Stores
          </FooterLink>
          <FooterLink variant="body1" mb="30px">
            Terms & Conditions
          </FooterLink>
          <FooterLink variant="body1" mb="30px">
            Privacy Policy
          </FooterLink>
        </Column>

        <Column>
          <Title variant="h4" mb="30px">
            Customer Care
          </Title>
          <FooterLink variant="body1" mb="30px">
            Help Center
          </FooterLink>
          <FooterLink variant="body1" mb="30px">
            Frequently Asked Questions
          </FooterLink>
          <FooterLink variant="body1" mb="30px">
            Complaints
          </FooterLink>
          <FooterLink variant="body1" mb="30px">
            Track Your Order
          </FooterLink>
          <FooterLink variant="body1" mb="30px">
            Corporate & Bulk Purchasing
          </FooterLink>
          <FooterLink variant="body1" mb="30px">
            Partner With Us
          </FooterLink>
          <FooterLink variant="body1" mb="30px">
            Returns & Refunds
          </FooterLink>
        </Column>

        <Column>
          <Title variant="h4" mb="30px">
            Contact Us
          </Title>
          <Description mb="30px">
            Office Address: Ngong Lane Plaza, Ngong Road
          </Description>
          <Description mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: support@narnialibrary.com
          </Description>
          <Description mb="30px">+254-706-736-619</Description>
        </Column>
      </ContentWrapper>
    </FooterContainer>
  );
}

export default Footer;

