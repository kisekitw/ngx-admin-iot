const express = require('express');
const checkAuth = require('./../middleware/check-auth');
const extractFile = require("../middleware/file");

const MeetingroomController = require('./../controllers/meetingroom');

const router = express.Router();

router.post('', checkAuth, extractFile, MeetingroomController.createMeetingroom);

router.put('/:id', checkAuth, extractFile, MeetingroomController.updateMeetingroom);

router.get('', MeetingroomController.getAllMeetingrooms);

router.get('/:id', MeetingroomController.getMeetingroomById);

router.delete("/:id", checkAuth, MeetingroomController.deleteMeetingroom);

module.exports = router;