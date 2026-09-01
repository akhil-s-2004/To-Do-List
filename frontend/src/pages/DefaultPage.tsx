import React from 'react'
import { Plus } from 'lucide-react'
import Button from '../components/atoms/Button/Button'
import Checkbox from '../components/atoms/Checkbox/Checkbox'
import ColorDot from '../components/atoms/ColorDot/ColorDot'
import Divider from '../components/atoms/Divider/Divider'
import IconButton from '../components/atoms/IconButton/IconButton'
import Input from '../components/atoms/Input/Input'
// import Logo from '../components/atoms/Logo/Logo'
const DefaultPage = () => {
  return (
    <main>
      <h1>Components</h1>
      <section>
        <h2>Atoms</h2>
        <div>
          <h4>Button</h4>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div>
          <h4>Checkbox</h4>
          <Checkbox></Checkbox>
          <Checkbox disabled></Checkbox>
        </div>
        <div>
          <h4>ColorDot</h4>
          <ColorDot color='#b91919'></ColorDot>
        </div>
        <div>
          <Divider></Divider>
        </div>
        <div>
          <h4>IconButton</h4>
            <IconButton><Plus /></IconButton>
        </div>
        <div>
          <h4>Input</h4>
          <Input placeholder = "football"label='hello'></Input>
        </div>
        {/* <div>
          <h4>Logo</h4>
          <Logo />
        </div> */}
      </section>
    </main>
  )
}

export default DefaultPage