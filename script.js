const userContainer = document.getElementById('userContainer');
const errorMsg = document.getElementById('errorMsg');
const reloadBtn = document.getElementById('reloadBtn');

async function fetchUserData() {
  userContainer.innerHTML = "<p>Loading user data...</p>";
  errorMsg.textContent = "";

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    
    // Simulate error if network fails
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();

    // Clear the container
    userContainer.innerHTML = "";

    // Loop through each user and display info
    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.classList.add('user-card');

      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;

      userContainer.appendChild(userCard);
    });

  } catch (error) {
    userContainer.innerHTML = "";
    errorMsg.textContent = "⚠️ Failed to fetch data. Please check your connection and try again.";
    console.error("Error fetching users:", error);
  }
}

// Reload button click event
reloadBtn.addEventListener('click', fetchUserData);

// Fetch data on page load
fetchUserData();
