const express = require('express');
const router = express.Router();
const members = require('../members/members');

router.get('/', function(req, res, next) {
    res.render('meettheteam.hbs', {teamMembers: members.findMembersByName(req.query.name)});
});

module.exports = router;