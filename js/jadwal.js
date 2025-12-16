const urutanHari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const table = document.getElementById("jadwalTable");

function getJadwal() {
    return JSON.parse(localStorage.getItem("jadwal")) || [];
}

function renderJadwal() {
    table.innerHTML = "";
    let jadwal = getJadwal();

    jadwal.sort(
        (a, b) => urutanHari.indexOf(a.hari) - urutanHari.indexOf(b.hari)
    );

    if (jadwal.length === 0) {
        table.innerHTML = `<tr><td colspan="3">Belum ada jadwal</td></tr>`;
        return;
    }

    const hariCount = {};
    jadwal.forEach(j => {
        hariCount[j.hari] = (hariCount[j.hari] || 0) + 1;
    });

    let lastHari = "";

    jadwal.forEach(j => {
        const row = document.createElement("tr");

        if (j.hari !== lastHari) {
            const tdHari = document.createElement("td");
            tdHari.textContent = j.hari;
            tdHari.rowSpan = hariCount[j.hari];
            row.appendChild(tdHari);
            lastHari = j.hari;
        }

        row.innerHTML += `
            <td>${j.mapel}</td>
            <td>${j.jam}</td>
        `;

        table.appendChild(row);
    });
}

renderJadwal();

function renderDashboard() {
    const jadwal = getJadwal();

    const mapelSet = new Set();
    const hariSet = new Set();

    jadwal.forEach(j => {
        mapelSet.add(j.mapel);
        hariSet.add(j.hari);
    });

    document.getElementById("totalSiswa").textContent =
        document.querySelectorAll("#siswa ol li").length;

    document.getElementById("totalMapel").textContent = mapelSet.size;
    document.getElementById("totalHari").textContent = hariSet.size;
}

renderDashboard();
