// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

  // Pages
  const homePage = document.getElementById("homePage");
  const loginPage = document.getElementById("loginPage");
  const signupPage = document.getElementById("signupPage");

  // Buttons
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const backBtns = document.querySelectorAll(".backBtn");

  // Page navigation
  loginBtn.addEventListener("click", () => {
    homePage.classList.remove("active");
    loginPage.classList.add("active");
  });

  signupBtn.addEventListener("click", () => {
    homePage.classList.remove("active");
    signupPage.classList.add("active");
  });

  backBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      loginPage.classList.remove("active");
      signupPage.classList.remove("active");
      homePage.classList.add("active");
    });
  });

  // --- Signup ---
  document.getElementById("submitSignup").addEventListener("click", async () => {
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      const userCred = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log("✅ User created:", userCred.user.uid);

      await firebase.firestore().collection("users").doc(userCred.user.uid).set({
        email,
        createdAt: new Date().toISOString()
      });

      alert("Signup successful!");
      signupPage.classList.remove("active");
      homePage.classList.add("active");
    } catch (err) {
      console.error("❌ Signup failed:", err);
      alert("Error: " + err.message);
    }
  });

  // --- Login ---
  document.getElementById("submitLogin").addEventListener("click", async () => {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      const userCred = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("✅ Logged in:", userCred.user.uid);
      alert("Login successful!");

      loginPage.classList.remove("active");
      homePage.classList.add("active");
    } catch (err) {
      console.error("❌ Login failed:", err);
      alert("Error: " + err.message);
    }
  });

  // --- Auth state observer ---
  firebase.auth().onAuthStateChanged(user => {
    const userStatusEl = document.getElementById("userStatus");
    if (user) {
      console.log("👤 Logged in as:", user.email);
      userStatusEl.innerText = "Logged in as " + user.email;
    } else {
      console.log("🚪 No user logged in");
      userStatusEl.innerText = "";
    }
  });

});
