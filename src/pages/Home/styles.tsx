import styled from "styled-components";

export const HomePage = styled.div`
  width: 100%;
  height: 100%;

  gap: 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const HomeSection = styled.section<{ heightProps?: string; paddingProps?: string; backgroundProps?: string }>`
  width: 100%;
  height: 100%;
  max-height: ${({ heightProps }) => heightProps || "auto"};
  padding: ${({ paddingProps }) => paddingProps || "0px"};
  background-color: ${({ backgroundProps }) => backgroundProps || "transparent"};

  display: flex;
`;

export const BannerImage = styled.img`
  width: 100%;
  height: 100%;
  max-width: 600px;
  object-fit: contain;
`;
