document.getElementById("submitSignup").addEventListener("click", async () => {
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value;

  try {
    const userCred = await firebase.auth().createUserWithEmailAndPassword(email, password);
    alert("Signup successful!");
    document.getElementById("userStatus").innerText = "Signed up as " + userCred.user.email;
  } catch (err) {
    alert("Signup error: " + err.message);
  }
});

document.getElementById("submitLogin").addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;

  try {
    const userCred = await firebase.auth().signInWithEmailAndPassword(email, password);
    alert("Login successful!");
    document.getElementById("userStatus").innerText = "Logged in as " + userCred.user.email;
  } catch (err) {
    alert("Login error: " + err.message);
  }
});
