export default ({ header, children, style }) => (
  <div className="app-title" style={style}>
    <div className="call">
      {header}
    </div>
    <div className="value">
      {children}
    </div>
    <style jsx>{`
      .app-title {
        height: 300px;
        width: 100%;
        color: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 10px;
      }
      .app-title .call {
        font-size: 2.5em;
        line-height: 1em;
        font-weight: lighter;
        margin: 1em 0;
      }
    `}</style>
  </div>
)
