const router = require("express").Router();
const { readUser } = require("../controllers/helpRequest");
const { helpRequest } = require("../controllers/helpRequest");
const { getHelpRequests } = require("../controllers/helpRequest");
const { deleteHelpRequest } = require("../controllers/helpRequest");
const { getRequestsByCity } = require("../controllers/helpRequest");
const { giveHelp } = require("../controllers/helpRequest");
const { updateHelp } = require("../controllers/helpRequest");

const requireLogin = require('../middleware/requireLogin');

router.get("/api/user", requireLogin, readUser);
router.post("/api/helprequest", requireLogin, helpRequest);
router.get("/api/helprequest", requireLogin, getHelpRequests);
router.delete("/api/helprequest/:_helprequestid", requireLogin, deleteHelpRequest);
router.get("/query/api/helprequest", requireLogin, getRequestsByCity);
router.post("/api/helprequest/:_helprequestid/help", requireLogin, giveHelp);
router.patch("/api/helprequest/:_id/help/:_helpid", requireLogin, updateHelp);

module.exports = router;