const axios = require("axios");

const getProxy = async () => {
  const proxy = {
    host: "open.proxymesh.com",
    port: 31280,
  };
  return proxy;
};

module.exports = { getProxy };
