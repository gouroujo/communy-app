export default ({ aside, children }) => (
  <div className="container">
    <div className="aside">
      {aside}
    </div>
    <div className="content">
      {children}
    </div>
    <style jsx>{`
      .container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: stretch;
      }
      .aside {
        margin: 0 10px 10px 0;
        flex: 1 0 auto;
        max-width: 400px;
        min-width: 300px;
      }
      .content {
        flex: 3 1 auto;
        margin: 0 0 10px 10px;
        min-width: 300px;
      }
    `}</style>
  </div>
)
