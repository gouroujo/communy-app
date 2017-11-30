export default ({ community = {} }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: community.description ||'Aucune description',
    }}/>
)
