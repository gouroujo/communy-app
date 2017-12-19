
export default ({ menu, children }) => (
  <div className="inbox">
    <div className="menu">
      {menu}
    </div>
    <div className="content">
      {children}
    </div>
    <style jsx>{`
       .content {
         padding-top: 60px;
         min-height: 100vh;
         z-index: 2;
       }
    `}</style>
  </div>
)
