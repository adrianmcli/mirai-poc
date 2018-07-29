import Link from "next/link";
import { Modal, Header, Button, List, Icon, Form } from "semantic-ui-react";

import Layout from "../../components/Layout";

export default () => (
  <Layout>
    <Link href="/">
      <Button>Home</Button>
    </Link>

    <hr />

    <Header as="h1">My Products</Header>

    <p>You have not added any products, add one!</p>

    <Link href="/products/add">
      <Button>Add Product</Button>
    </Link>
  </Layout>
);