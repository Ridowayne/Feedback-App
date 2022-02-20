const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const ErrorResponse = require('./../utils/errorResponse');
const User = require('./../models/userModel');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // remove the password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// signup login, forgot password, resetpassword, protect, updatepassword and update me
exports.signup = catchAsync(async (req, res) => {
  const newUser = User.create({
    name: req.body.name,
    bfreeMail: req.body.bfreeMail,
    bfreeOrStaffId: req.body.bfreeOrStaffId,
    jobTitle: req.body.jobTitle,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    team: req.body.team,
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { password, bfreeMail } = req.body;

  if (!password || !bfreeMail) {
    return next(new ErrorResponse('kindly eneter your bfreemail nad password'));
  }
  const returningUser = User.findone({ email }).select('+password');
  if (
    !returningUser ||
    !(await returningUser.correctPassword(password, returningUser.password))
  ) {
    return next(new ErrorResponse('incorrect email or password', 401));
  }
});
exports.forgotpassword = catchAsync(async (req, res, next) => {
  const userEmail = User.findOne({ email: req.body.email });

  if (!userEmail) {
    return next(
      new ErrorResponse(
        'Incorrect Email, kindly provide correct mail adrees',
        404
      )
    );
  }

  // 2) Generate the random reset token
  const ressetToken = User.createPasswordResetToken();
  await User.save({ validateBeforeSave: false });
});
exports.resetpassword;
exports.protect;
exports.updatepassword, exports.updateme;
exports.restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    // roles ['admin', 'lead-guide',]. role = 'user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have Permission to perform this task', 403)
      );
    }
  });
  next();
};
