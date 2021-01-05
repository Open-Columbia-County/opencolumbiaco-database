const router = require('express').Router()
const Projects = require('./projectsModel')


// Base path /api/packages

// Get Requests
router.get('/', (req, res, next) => {
    Projects.findAll()
        .then(projects => res.status(200).json({data: projects}))
        .catch(err => next({ code: 500, message: 'Problems getting Projects', err}))
})
router.get('/current', (req, res, next) => {
    Projects.findAllProjectStats()
        .then(current => res.status(200).json({data: current}))
        .catch(err => next({ code: 500, message: 'Problems getting Current Status list', err}))
})

// Get By Requests
router.get('/:projectName', (req, res) => {
    Projects.findByName(req.params.projectName)
        .then(project => {
            if (project) {
                res.status(200).json({data: project})
            } else {
                res.status(404).json({ message: 'Project Name not found'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Trouble getting Project', err})
        })
})
router.get('/current/:currentStatus', (req, res) => {
    Projects.findByProjectStatus(req.params.currentStatus)
        .then(current => {
            if (current) {
                res.status(200).json({data: current})
            } else {
                res.status(404).json({message: 'current Status not found'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Trouble getting current Status', err})
        })
})

// Post Requests
router.post('/', (req, res) => {
    Projects.add(req.body)
        .then(project => {
            res.status(201).json({data: project})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Trouble adding to Projects'})
        })
})
router.post('/current', (req, res) => {
    Projects.addProjectStats(req.body)
    .then(current => {
        res.status(201).json({data: current})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Trouble adding to current Status List'})
    })
})

// Put Requests
router.put('/:projectName', (req, res) => {
    Projects.update(req.params.projectName, req.body)
    .then(project => {
        if (project) {
            res.status(200).json({data: project})
        } else {
            res.status(404).json({ message: 'Project Name not found' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Trouble updating Project' })
    })
})
router.put('/current/:currentStatus', (req, res) => {
    Projects.updateProjectStats(req.params.currentStatus, req.body)
    .then(current => {
        if (current) {
            res.status(200).json({data: current})
        } else {
            res.status(404).json({message: 'current Status not found'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'Trouble updating current Status'})
    })
})

// Delete Requests
router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'You removed that project' })
        } else {
            res.status(400).json({ message: 'Having trouble finding that ID' })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: 'Trouble removing Project' })
    })
})
router.delete('/current/:id', (req, res) => {
    Projects.removeProjectStats(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ message: 'You removed that current status'})
        } else {
            res.status(400).json({ message: 'Trouble finding that ID'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: 'Trouble removing that current status'})
    })
})

module.exports = router