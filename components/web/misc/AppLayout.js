import Head from 'next/head'

export default ({ title, menu, children }) => (
  <div className="container">
    <Head>
      {title && <title>{title}</title>}
    </Head>
    <div className="menu">
      {menu}
    </div>
    <div className="content">
      {children}
    </div>
    <style jsx global>{`
      body {
        background-color: #e7e7e7 !important;
      }
    `}</style>
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        min-height: 100vh;
      }
      .menu {
        height: 54px;
      }
      .content {
        flex: 1;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
    `}</style>
  </div>
)
