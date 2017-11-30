export default ({ value, children }) => (
  <div className="communy-menu">
    {children}
    <style jsx global>{`
      .communy-menu {
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        z-index: 5;
        display: flex;
        height: ${100 - (value * 40) }px;
        background-color: rgba(50, 50, 50, ${value});
        padding: 10px;
        justify-content: space-between;
        align-items: center;
        color: white;
        /*transition: linear 250ms all;*/
      }
      .communy-menu > img {
        height: ${80 - (value * 40) }px;
        width: auto;
        margin: 20px;
      }
    `}</style>
  </div>
)
