const express = require("express");


const {getCurrent, updateSubscription, updateAvatar, recheckVerifyEmail, verifyEmail}  = require("../../controllers/user")
const { subscriptionJoinSchema, emailJoiSchema } = require("../../models/userModel");
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
router.post(
    "/verify",
    validation(emailJoiSchema),
    ctrlWrapper(recheckVerifyEmail)
  );
  
  router.get("/verify/:verificationToken", ctrlWrapper(verifyEmail));

module.exports = router;