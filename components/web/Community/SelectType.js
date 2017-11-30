import { Accordion, Icon, Message } from 'semantic-ui-react'

export default ({ value, onChange, ...props }) => (
  <Accordion {...props}>
    <Accordion.Title active={value === 'public'} name='type' value='public' onClick={onChange}>
      <Icon name={value === 'public' ? 'radio selected' : 'radio'} />
      Communauté publique
    </Accordion.Title>
    <Accordion.Content active={value === 'public'}>
      <Message
        icon='world'
        header='Communauté publique'
        content="Votre communauté est visible par tout le monde. N'importe qui peut rejoindre votre communauté. Les nouveaux membres sont automatiquement acceptés."
      />
    </Accordion.Content>

    <Accordion.Title active={value === 'private'} name='type' value='private' onClick={onChange}>
      <Icon name={value === 'private' ? 'radio selected' : 'radio'} />
      Communauté privée
    </Accordion.Title>
    <Accordion.Content active={value === 'private'}>
      <Message
        icon='privacy'
        header='Communauté privée'
        content="Votre communauté est visible par tout le monde. N'importe qui peut demander à rejoindre votre communauté. Les nouveaux membres doivent être validés par un responsable."
      />
    </Accordion.Content>

    <Accordion.Title active={value === 'secret'} name='type' value='secret' onClick={onChange}>
      <Icon name={value === 'secret' ? 'radio selected' : 'radio'} />
      Communauté secrète
    </Accordion.Title>
    <Accordion.Content active={value === 'secret'}>
      <Message
        icon='hide'
        header='Communauté secrète'
        content="Votre communauté est visible uniquement par ses membres. Personne ne peut rejoindre votre communauté sans invitation. Les nouveaux membres doivent être invités par un responsable."
      />
    </Accordion.Content>
  </Accordion>
)
