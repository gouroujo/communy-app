const express = require('express')
const helmet = require('helmet');
const next = require('next')
const fetch = require('isomorphic-unfetch')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  server.set('trust proxy', 1)
  server.use(helmet())

  server.use((req, res, next) => {
    res.setHeader('charset', 'utf-8')
    // res.setHeader('Vary', 'User-Agent')
    const promises = []
    if (req.query.confirm_token) {
      promises.push(
        fetch(`${process.env.SSR_ENDPOINT || 'http://localhost:3030'}/auth/confirm`, {
          method: 'POST',
          body: JSON.stringify({
            token: req.query.confirm_token
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        .then(user => {
          res.locals.confirm_token = user
        })
        .catch(e => {
          console.log(e.message)
          res.locals.confirm_token = false
        })
      )
    }

    if (req.query.join_token) {
      promises.push(
        fetch(`${process.env.SSR_ENDPOINT || 'http://localhost:3030'}/auth/join`, {
          method: 'POST',
          body: JSON.stringify({
            token: req.query.join_token
          }),
          headers: { 'Content-Type': 'application/json' },
        })
        .then(response => response.json())
        .then(({ token }) => {
          res.locals.token = token
          res.cookie('token', token, {
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            // maxAge: 0
          })
        })
        .catch(e => {
          console.log(e.message)
        })
      )
    }

    Promise.all(promises)
    .then(() => next())
    .catch(next)
  });

  server.get('/', (req, res) => {
    return app.render(req, res, process.env.INDEX_PAGE || '/index', Object.assign(req.query, res.locals))
  })

  server.get('/inbox', (req, res) => {
    return app.render(req, res, '/inbox', req.query)
  })

  server.get('/join', (req, res) => {
    return app.render(req, res, '/company-create', req.query)
  })

  server.get('/communities', (req, res) => {
    return app.render(req, res, '/communities', req.query)
  })

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

  server.get('/communities/:communityId/mailings/:mailingId', (req, res) => {
    return app.render(req, res, '/community-mailings', Object.assign(req.query, {
      communityId: req.params.communityId,
      mailingId: req.params.mailingId
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

process.on('SIGINT', () => {
  process.exit(0);
});
