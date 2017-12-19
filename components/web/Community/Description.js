export default ({ community }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: (community && community.description) ||'Aucune description',
    }}/>
)
