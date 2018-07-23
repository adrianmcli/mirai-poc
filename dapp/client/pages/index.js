import Link from 'next/link'
import { Modal, Header, Button, List, Icon } from 'semantic-ui-react'

import Layout from '../components/Layout'

export default () => (
  <Layout>
    <Header as="h1">Home Page</Header>
    
    <Link href="/products/sell"><Button>Sell Products</Button></Link>
    <Link href="/products/"><Button>Buy Products</Button></Link>

    <hr/>

    <Header as="h2">Example Semantic-UI elements</Header>

    <Modal trigger={<Button>Show Modal</Button>}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Default Profile Image</Header>
          <p>We have found the following gravatar image associated with your e-mail address.</p>
          <p>Is it okay to use this photo?</p>
        </Modal.Description>
      </Modal.Content>
    </Modal>

    <List relaxed>
      <List.Item>
        <List.Content>
          <List.Header as='a'>Next.js</List.Header>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header as='a'>React</List.Header>
        </List.Content>
      </List.Item>
      <List.Item>
        <List.Content>
          <List.Header as='a'>Vue.js</List.Header>
        </List.Content>
      </List.Item>
    </List>

    Hello <Icon name='world' />
  </Layout>
)
