import { Container } from "semantic-ui-react";

const FixedMenuLayout = ({ children }) => (
  <Container style={{ paddingTop: "7em", paddingBottom: "7em" }}>{children}</Container>
);

export default FixedMenuLayout;