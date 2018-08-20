const express = require('express');
const router = express.Router();
const members = require('../members/members');

router.get('/', function(req, res, next) {
    res.render('putafacetothename.hbs', {members: members.findRandomMembers(6)});
});

module.exports = router;