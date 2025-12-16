const urutanHari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const form = document.getElementById("formJadwal");
const table = document.getElementById("jadwalTable");
const editIndexInput = document.getElementById("editIndex");

function getJadwal() {
    return JSON.parse(localStorage.getItem("jadwal")) || [];
}

function saveJadwal(data) {
    localStorage.setItem("jadwal", JSON.stringify(data));
}

function resetForm() {
    form.reset();
    editIndexInput.value = "";
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const hari = document.getElementById("hari").value;
    const mapel = document.getElementById("mapel").value;
    const jam = document.getElementById("jam").value;

    let jadwal = getJadwal();
    const editIndex = editIndexInput.value;

    if (editIndex === "") {
        jadwal.push({ hari, mapel, jam });
    } else {
        jadwal[editIndex] = { hari, mapel, jam };
    }

    saveJadwal(jadwal);
    resetForm();
    renderTable();
});

function editJadwal(index) {
    const j = getJadwal()[index];
    document.getElementById("hari").value = j.hari;
    document.getElementById("mapel").value = j.mapel;
    document.getElementById("jam").value = j.jam;
    editIndexInput.value = index;
}

function hapusJadwal(index) {
    let jadwal = getJadwal();
    jadwal.splice(index, 1);
    saveJadwal(jadwal);
    renderTable();
}

function renderTable() {
    table.innerHTML = "";
    let jadwal = getJadwal();

    jadwal.sort(
        (a, b) => urutanHari.indexOf(a.hari) - urutanHari.indexOf(b.hari)
    );

    if (jadwal.length === 0) {
        table.innerHTML = `<tr><td colspan="4">Belum ada jadwal</td></tr>`;
        return;
    }

    jadwal.forEach((j, i) => {
        table.innerHTML += `
        <tr>
            <td>${j.hari}</td>
            <td>${j.mapel}</td>
            <td>${j.jam}</td>
            <td>
                <button onclick="editJadwal(${i})">✏️</button>
                <button onclick="hapusJadwal(${i})" class="danger">🗑</button>
            </td>
        </tr>`;
    });
}

renderTable();
