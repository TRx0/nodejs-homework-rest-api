const express = require("express");


const {getCurrent, updateSubscription, updateAvatar}  = require("../../controllers/user")
const { subscriptionJoinSchema } = require("../../models/userModel");
const { validation, ctrlWrapper,  auth} = require("../../middlewares/index");
const router = new express.Router();
const upload = require('../../middlewares/upload')
router.get("/current", auth, ctrlWrapper(getCurrent));
router.patch(
  "/subscription",
  auth,
  validation(subscriptionJoinSchema),
  ctrlWrapper(updateSubscription)
);

router.patch(
  '/avatars',
  auth,
  upload.single('avatar'),
  ctrlWrapper(updateAvatar),
);

module.exports = router;