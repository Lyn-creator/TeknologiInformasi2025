function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Username dan password wajib diisi!");
        return;
    }

    if (username === "admin" && password === "123") {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("role", "admin");
        window.location.href = "index.html"; // ✅ FIX
    } 
    else if (username === "user" && password === "123") {
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("role", "user");
        window.location.href = "index.html"; // ✅ FIX
    } 
    else {
        alert("Username atau password salah!");
    }
}
