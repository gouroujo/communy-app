const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // server.use((req, res, next) => {
  //   res.setHeader('charset', 'utf-8')
  //   res.setHeader('Vary', 'User-Agent')
  //   next()
  // });

  server.get('/communities/create', (req, res) => {
    return app.render(req, res, '/community-create', req.query)
  })

  server.get('/communities/:communityId', (req, res) => {
    return app.render(req, res, '/community', Object.assign(req.query, {
      communityId: req.params.communityId
    }))
  })


  server.get('/communities/:communityId/events', (req, res) => {
    return app.render(req, res, '/community-events', Object.assign(req.query, {
      communityId: req.params.communityId
    }))
  })
  server.get('/communities/:communityId/events/create', (req, res) => {
    return app.render(req, res, '/community-event-create', Object.assign(req.query, {
      communityId: req.params.communityId
    }))
  })
  server.get('/communities/:communityId/events/:eventId', (req, res) => {
    return app.render(req, res, '/community-event', Object.assign(req.query, {
      communityId: req.params.communityId,
      eventId: req.params.eventId,
    }))
  })
  server.get('/communities/:communityId/events/:eventId/participants', (req, res) => {
    return app.render(req, res, '/community-event-participants', Object.assign(req.query, {
      communityId: req.params.communityId,
      eventId: req.params.eventId,
    }))
  })

  server.get('/communities/:communityId/users', (req, res) => {
    return app.render(req, res, '/community-registrations', Object.assign(req.query, {
      communityId: req.params.communityId
    }))
  })
  server.get('/communities/:communityId/users/invite', (req, res) => {
    return app.render(req, res, '/community-registration-add', Object.assign(req.query, {
      communityId: req.params.communityId
    }))
  })

  server.get('/communities/:communityId/users/:userId', (req, res) => {
    return app.render(req, res, '/community-registration', Object.assign(req.query, {
      communityId: req.params.communityId,
      userId: req.params.userId,
    }))
  })

  server.get('/communities/:communityId/mailings', (req, res) => {
    return app.render(req, res, '/community-mailings', Object.assign(req.query, {
      communityId: req.params.communityId
    }))
  })

  server.get('/communities/:communityId/edit', (req, res) => {
    return app.render(req, res, '/community-edit', Object.assign(req.query, {
      communityId: req.params.communityId
    }))
  })



  server.get('*', (req, res) => {
    handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
