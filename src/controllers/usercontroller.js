import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { successResponse, errorResponse } from '../helper';

export const register = async (req, res) => {
  const {
    email, password, firstName, lastName,
  } = req.body;
  try {
    const user = await User.scope('withSecretColumns').findOne({
      where: { email },
    });
    if (user) {
      const err = new Error();
      err.message = 'User already exists with same email!';
      err.code = 409;
      throw err; // new Error('User already exists with same email');
    }
  } catch (error) {
    return errorResponse(req, res, error.message, error.code);
  }
  const reqPass = crypto.createHash('md5').update(password).digest('hex');
  const payload = {
    firstName,
    lastName,
    email,
    password: reqPass,
    isVerified: false,
    // verifyToken: uniqueId(),
  };
  try {
    const newUser = await User.create(payload);
    delete newUser.dataValues.password;
    return successResponse(req, res, { newUser });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.scope('withSecretColumns').findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      throw new Error('Incorrect Email Id/Password');
    }

    const reqPass = crypto
      .createHash('md5')
      .update(req.body.password || '')
      .digest('hex');
    if (reqPass !== user.password) {
      throw new Error('Incorrect Email Id/Password');
    }
    const token = jwt.sign(
      {
        user: {
          userId: user.id,
          email: user.email,
          createdAt: new Date(),
        },
      },
      process.env.SECRET,
    );
    delete user.dataValues.password;
    return successResponse(req, res, { user, token });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const profile = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findOne({ where: { id: userId } });
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const changePassword = async (req, res) => {
  const { userId } = req.user;
  let user;
  try {
    user = await User.scope('withSecretColumns').findOne(
      { where: { id: userId } },
    );
    const reqPass = crypto
      .createHash('md5')
      .update(req.body.oldPassword)
      .digest('hex');

    if (reqPass !== user.password) {
      throw new Error('Old password is not correct');
    }
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
  const newPass = crypto
    .createHash('md5')
    .update(req.body.newPassword)
    .digest('hex');

  try {
    await User.update({ password: newPass }, { where: { id: user.id } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const allUsers = async (req, res) => {
  try {
    const page = req.params.page || 1;
    const limit = 2;
    const users = await User.scope('withSecretColumns').findAndCountAll({
      order: [['createdAt', 'DESC'], ['firstName', 'ASC']],
      offset: (page - 1) * limit,
      limit,
    });
    return successResponse(req, res, { users });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
