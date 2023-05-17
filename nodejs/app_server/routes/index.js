var express = require("express");
var router = express.Router();
var ctrlMekanlar = require("../controllers/mekanlar");

router.get("/", ctrlMekanlar.anaSayfa);
router.get("/mekan/:mekanid", ctrlMekanlar.mekanBilgisi);
module.exports = router;
