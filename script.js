/**
 * Initializes chat button functionality for multiple buttons.
 */
document.addEventListener("DOMContentLoaded", function() {
  // Select all chat buttons using their data attribute
  const chatButtons = document.querySelectorAll('[data-chat="open"]');

  // Iterate over each chat button and add click event listener to open chat
  chatButtons.forEach(function(chatButton) {
    chatButton.addEventListener('click', function(event) {
      event.preventDefault(); // Prevent default action of the event
      SaySimpleMessengerNew.open(); // Open the chat messenger
    });
  });
});

/**
 * Determines the next opening time of customer service.
 * @returns {Date} The next opening date and time.
 */
function getNextOpeningTime() {
  const now = new Date();
  let nextOpening = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 8, 30);

  // Adjust for closing time and weekends
  if (now.getHours() >= 17 || now.getDay() === 0 || now.getDay() === 6) {
    // Set to Monday if it's Friday, otherwise next day
    nextOpening.setDate(now.getDate() + (now.getDay() === 5 ? 3 : 1));
    nextOpening.setHours(8, 30); // Reset time to opening hour
  }

  return nextOpening;
}

/**
 * Checks if customer service is currently closed.
 * @returns {boolean} True if customer service is closed, otherwise false.
 */
function isCustomerServiceClosed() {
  const now = new Date();
  return now.getHours() >= 17 || now.getHours() < 8 || now.getDay() === 0 || now.getDay() === 6;
}

/**
 * Updates the display of customer service status on the webpage.
 */
function updateCustomerServiceStatus() {
  const statusElement = document.querySelector('[data-klantenservice="open"]');
  const statusIndicator = document.querySelector('.open-status');

  if (isCustomerServiceClosed()) {
    const nextOpeningTime = getNextOpeningTime();
    const dayNames = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
    const dayName = dayNames[nextOpeningTime.getDay()];
    statusElement.textContent = `Open ${dayName} vanaf 08:30`;
    statusIndicator.classList.add('closed');
  } else {
    statusElement.textContent = 'Wij zijn open tot 17:00';
    statusIndicator.classList.remove('closed');
  }
}

// Update customer service status when page content is fully loaded
document.addEventListener('DOMContentLoaded', updateCustomerServiceStatus);

// Optionally update the status every minute to keep it current
setInterval(updateCustomerServiceStatus, 60000);
