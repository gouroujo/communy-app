export default ({ value, children }) => (
  <div className="communy-menu">
    {children}
    <style jsx global>{`
      .communy-menu {
        z-index: 10;
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        display: flex;
        height: 60px;
        background-color: rgba(50, 50, 50, 1);
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        color: white;
        /*transition: linear 250ms all;*/
      }
      .communy-menu > img {
        height: 40px;
        width: auto;
        margin: 20px;
      }
      @media only screen and (min-width: 576px) {
        .communy-menu {
          height: ${100 - (value * 40) }px;
          background-color: rgba(50, 50, 50, ${value});
        }
        .communy-menu > img {
          height: ${80 - (value * 40) }px;
        }
      }
    `}</style>
  </div>
)
