const catchAsync = require('../../utils/catchAsync');

const checkServerHealth = catchAsync(async (req, res) => {
  res.send({
    success: true,
    data: {
      message: 'API service is running.',
    },
  });
});

module.exports = {
  checkServerHealth,
};
