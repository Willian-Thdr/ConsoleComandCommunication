async function getData() {
    const response = await fetch("http://localhost:3000/api/user-infos");

    const nameShow = document.getElementById("nameUser");
    const data = await response.json();
    
    let uName = "null";
    
    uName = data.name;
    nameShow.textContent = uName;
}

getData();