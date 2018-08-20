const express = require('express');
const router = express.Router();
const members = require('../members/members');

router.get('/', function(req, res, next) {
    res.render('meettheteam.hbs', {teamMembers: members.teamMembers});
});

router.get('/:id', function(req, res, next) {
    res.render('member.hbs', {teamMember: members.findMemberById(req.params.id)});
});

module.exports = router;