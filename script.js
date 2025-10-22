const saveBtn = document.getElementById('saveBtn');
const messageBox = document.getElementById('message');
const unlockDateTimeInput = document.getElementById('unlockDateTime');
const messagesDiv = document.getElementById('messages');

function loadMessages() {
  const stored = JSON.parse(localStorage.getItem('timeCapsule')) || [];
  const now = new Date();
  messagesDiv.innerHTML = '';

  const unlocked = stored.filter(item => new Date(item.unlockDateTime) <= now);

  if (unlocked.length === 0) {
    messagesDiv.innerHTML = '<p>No messages unlocked yet ⏳</p>';
  } else {
    unlocked.forEach(item => {
      const card = document.createElement('div');
      card.className = 'message-card';
      card.innerHTML = `
        <h3>Unlock Time: ${new Date(item.unlockDateTime).toLocaleString()}</h3>
        <p>${item.message}</p>
        <small>Created on: ${item.createdOn}</small>
      `;
      messagesDiv.appendChild(card);
    });
  }
}

saveBtn.addEventListener('click', () => {
  const message = messageBox.value.trim();
  const unlockDateTime = unlockDateTimeInput.value;

  if (!message || !unlockDateTime) {
    alert('Please enter both message and unlock date/time!');
    return;
  }

  const newEntry = {
    message,
    unlockDateTime,
    createdOn: new Date().toLocaleString()
  };

  const stored = JSON.parse(localStorage.getItem('timeCapsule')) || [];
  stored.push(newEntry);
  localStorage.setItem('timeCapsule', JSON.stringify(stored));

  messageBox.value = '';
  unlockDateTimeInput.value = '';
  alert(`✅ Message saved! It will unlock on ${new Date(unlockDateTime).toLocaleString()}`);
  loadMessages();
});

window.addEventListener('load', loadMessages);
