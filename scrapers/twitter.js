const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const { v4: uuidv4 } = require("uuid");

const scrapeTwitterTrends = async () => {
  let chromeOptions = new chrome.Options();
  // Uncomment the following line if you want to run in headless mode
  // chromeOptions.addArguments("--headless=new");

  let driverPath = "./chromedriver.exe";
  const service = new chrome.ServiceBuilder(driverPath);
  const driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(chromeOptions)
    .setChromeService(service)
    .build();

  try {
    await driver.get("https://x.com/i/flow/login");

    // Add your login logic here
    // Example: await loginToTwitter(driver, twitterUsername, twitterPassword);
    await driver.wait(until.urlIs("https://x.com/home"), 60000);

    await driver.wait(
      until.elementLocated(By.css('div[aria-label="Timeline: Trending now"]')),
      30000
    );

    const trendElements = await driver.findElements(
      By.xpath(
        '//div[@aria-label="Timeline: Trending now"]//span[contains(@class, "css-1jxf684") and not(contains(text(), "posts"))]'
      )
    );

    const trends = [];
    for (const element of trendElements) {
      const text = await driver.executeScript(
        "return arguments[0].innerText;",
        element
      );
      trends.push(text);
    }

    // Select specific trends based on their index (3, 5, 7, 9)
    const selectedTrends = [];
    const indicesToSelect = [2, 4, 6, 8]; // Adjusted for zero-based index
    indicesToSelect.forEach((index) => {
      if (index < trends.length) {
        selectedTrends.push(trends[index]);
      }
    });

    const now = new Date();
    const trendData = {
      _id: uuidv4(),
      trend1: selectedTrends[0] || null,
      trend2: selectedTrends[1] || null,
      trend3: selectedTrends[2] || null,
      trend4: selectedTrends[3] || null,
      dateTime: now,
      ipAddress: "no proxy",
      __v: 0, // Assuming you want to include this field as well
    };

    return trendData;
  } catch (error) {
    console.error("Error during scraping:", error);
    return null;
  } finally {
    console.log("Quitting the driver");
    await driver.quit();
  }
};

// Uncomment and implement this function to handle Twitter login
// const loginToTwitter = async (driver, username, password) => {
//   // Your login logic here
// };

module.exports = { scrapeTwitterTrends };
