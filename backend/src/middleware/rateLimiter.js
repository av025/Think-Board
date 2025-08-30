import ratelimit from "../config/upStash.js";

const rateLimiter = async (_, response, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");

    if (!success) {
      return response
        .status(429)
        .json({
          success: false,
          message: "To Many Request Send, Please Try again Later",
        });
    }; 

    next();
  } catch (error) {
    console.error(`Error of Rate Limiting ${error.message}`);
    next(error);
  }
};

export default rateLimiter;
