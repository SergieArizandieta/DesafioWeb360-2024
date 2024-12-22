const authService = require('../services/authService.js');
const authUtil = require('../utils/authUtil.js');

exports.login = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    try{
      authUtil.verifyRefreshToken(refreshToken);
      return res.status(400).json({ message: 'User already logged in'});
    } catch (error) {
      console.error('Session Expired:');
    }
  }
    
  const { email, password } = req.body;

  try {
    const {AccJwt, RefJwt} = await authService.login(email, password);

    res.cookie('refreshToken', RefJwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    message = 'Login successful';

    res.status(200).json({ AccJwt, message });
  } catch (error) {
    console.error('Error in login:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;
  const authHeader = req.headers.authorization;

  if (!refreshToken && !authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try{
    // const accessToken = authHeader.split(" ")[1];
    const {AccJwt,RefJwt} = await authService.refreshTokens(refreshToken);

    res.cookie('refreshToken', RefJwt, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    message = 'Refresh token successful';
    res.status(200).json({ AccJwt, message });
  }catch (error) {
    console.error('Error in refreshToken 2:', error);
    res.status(500).json({ message: error.message });
  }

};

exports.logout = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) return res.status(400).json({ message: 'User not logged in' });

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  });

  res.status(200).json({ message: 'Logout successful' });
}