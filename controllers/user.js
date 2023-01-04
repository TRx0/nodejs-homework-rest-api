const { User } = require("../models/userModel");
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');



const updateSubscription = async (req, res) => {
  const { subscription, _id } = req.user;
  const user = await User.findByIdAndUpdate(
    _id,
    { ...req.body },
    { new: true }
  );

  if (subscription === req.body.subscription) {
    res.json({
      status: "succes",
      code: 200,
      message: `your subscription is already equal to - '${req.body.subscription}'`,
    });
  }

  res.json({
    status: "succes",
    code: 200,
    user,
  });
};


const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
  
    res.json({
        status: "succes",
        code: 200,
        user: {
            email,
            subscription,
        },
    });
}

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');
  
    const updateAvatar = async (req, res) => {
  const {path: tmpUpload, originalname} = req.file;
  const {_id: id} = req.user;
  const imageName = `${id}_${originalname}`;

  try {
    const resultUpload = path.join(avatarsDir, imageName);

    jimp
        .read(tmpUpload)
        .then((image) => image.resize(250, 250).write(resultUpload))
        .catch((error) => console.log(error));

    fs.unlink(tmpUpload);

    const avatarURL = path.join('avatars', imageName);
    await User.findByIdAndUpdate(id, {avatarURL});
    res.json({avatarURL});
  } catch (error) {
    fs.unlink(tmpUpload);
    throw error;
  }
};

    module.exports = {
        getCurrent,
        updateSubscription,
        updateAvatar,
    }
