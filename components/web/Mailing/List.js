import { Item } from 'semantic-ui-react'

export default ({ mailings=[], onClick }) => (
  <Item.Group divided>
    {mailings.map(mailing => (
      <Item key={mailing.id} className="mailing-item" onClick={() => onClick(mailing.id)}>
        {/* <Item.Image size='tiny'>
          A b d sdz
        </Item.Image> */}

        <Item.Content>
          <Item.Header>{mailing.subject}</Item.Header>
          {mailing.nreceipients && (
            <Item.Meta>
              envoyé à {mailing.nreceipients} personne{mailing.nreceipients > 1 ? 's': ''}
            </Item.Meta>
          )}
          {mailing.from && (
            <Item.Meta>
              de {mailing.from.fullname}
            </Item.Meta>
          )}

          <Item.Description>
            {mailing.body}
          </Item.Description>
        </Item.Content>
      </Item>
    ))}
    <style jsx global>{`
      .mailing-item {
        padding: 0 !important;
        font-size: 0.8em !important;
        line-height: 0.8em !important;
        height: 7em;
        overflow: hidden;
        position:relative;
        transition: background-color 400ms linear;
        cursor: pointer;
      }
      .mailing-item:hover {
        background-color: #f0f0f0 !important;
      }
      .mailing-item:after {
        height: 2em !important;
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        visibility: visible!important;
        background: linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 60%, rgba(255,255,255,1) 100%);
      }
      .mailing-item:hover:after {
        background: linear-gradient(rgba(240,240,240,0) 0%, rgba(240,240,240,0.9) 60%, rgba(240,240,240,1) 100%);
      }
      .mailing-item > .content {
        margin: 0 5px !important;
        padding-top: 1em !important;
      }
    `}</style>
  </Item.Group>
)
