export default ({ event = {} }) => (
  <p className="display-linebreak">
    {(event.description) ||'Aucune description'}
  </p>
)
