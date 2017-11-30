import { Icon } from 'semantic-ui-react'
import Link from 'components/web/misc/ActiveLink'

const HEIGHT = 150
const SCALE = 1.2

export default ({ communities = []}) => (
  <div className="container">
    <div className="scroll">
      <div className="list">
        {communities.map(community => (
          <Link
            key={community.id}
            href={`/community?communityId=${community.id}`}
            as={`/communities/${community.id}`}
            >
            <div className="item" style={{
              backgroundImage: `url(${community.cover})`
            }}>
              <div className="backdrop" />
              <div className="logo" style={{
                backgroundImage: `url(${community.logo})`
              }}/>
              <div className="title">
                {community.title}
              </div>
            </div>
          </Link>
        ))}
        <Link href="/communities" as="/communities">
          <div className="item add">
            <div className="logo">
              <Icon name='add' size="huge"/>
            </div>
            <div className="title">Rejoindre une communauté</div>
          </div>
        </Link>


    </div>

    </div>

    <style jsx>{`
      .container {
        overflow: hidden;
        height: ${(HEIGHT * SCALE)}px;
        margin: 10px 0;
      }
      .scroll {
        overflow-X: scroll;
        overflow-Y: hidden;
      }
      .list {
        display: flex;
        flex-wrap: nowrap;
        justify-content: left;
        align-items: center;
        margin: ${HEIGHT*(SCALE - 1)*0.5}px 0;
      }
      .item {
        flex: 1 0 25%;
        position: relative;
        height: ${HEIGHT}px;
        max-width: 350px;
        min-width: 200px;
        margin: 1px;
        cursor: pointer;
        transition: 450ms all;
        transform-origin: center center;
        background-color: rgba(255, 255, 255, 0.5);
        background-position: center;
        background-size: cover;
        border-radius: 7px;
      }
      .item.add {
        background-color: rgba(255, 255, 255, 0.2);
        border: 2px rgba(255, 255, 255, 0.5) solid;
      }
      .item:first-child {
        transform-origin: center left;
        margin-left: 50px;
      }
      .list:hover .item {
        transform: translate3d(-${(SCALE-1)/0.02}%, 0, 0);
        opacity: .5;
      }
      .item:hover ~ .item {
        opacity: .5;
        transform: translate3d(${(SCALE-1)/0.02}%, 0, 0);
      }
      .list .item:hover {
        opacity: 1;
        transform: scale(${SCALE});
      }
      .item:first-child:hover ~ .item {
        transform: translate3d(${(SCALE-1) * 100}%, 0, 0);
      }
      .logo {
        transform: translate(-50%,-50%);
        position: absolute;
        z-index: 4;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        border: 2px solid rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        background-position: center;
        background-size: cover;
        transition: 450ms all;
        line-height: 100px;
        text-align: center;
        padding-left: 5px;
        color: #ffffff;
      }
      .item.add .logo {
        background: none;
        border: none;
      }
      .title {
        opacity: 0;
        padding: 5px;
        font-size: 1.2em;
        position: absolute;
        color: white;
        bottom: 0;
        right: 0;
        left: 0;
        text-align: center;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        transition: 450ms opacity;
      }
      .item:hover .title {
        opacity: 1;
      }
      .item.add .title {
        opacity: 1;
      }
      .backdrop {
        opacity: 0;
        transition: 450ms opacity;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0) 100%);
      }
      .item:hover .backdrop {
        opacity: 1;
      }
    `}</style>
  </div>
)
