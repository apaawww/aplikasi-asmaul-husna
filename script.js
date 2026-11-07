
// ============================================
// 1. KONFIGURASI API
// ============================================

const API_URL =
    "https://api.aladhan.com/v1/asmaAlHusna";


// ============================================
// 2. MENGAMBIL ELEMEN HTML
// ============================================

const asmaContainer =
    document.getElementById("asmaContainer");

const loading =
    document.getElementById("loading");

const errorMessage =
    document.getElementById("errorMessage");

const searchInput =
    document.getElementById("searchInput");

const clearSearch =
    document.getElementById("clearSearch");

const languageSelect =
    document.getElementById("languageSelect");

const detailModal =
    document.getElementById("detailModal");

const closeModal =
    document.getElementById("closeModal");

const prevButton =
    document.getElementById("prevButton");

const nextButton =
    document.getElementById("nextButton");

const retryButton =
    document.getElementById("retryButton");


// ============================================
// 3. VARIABEL PENYIMPANAN DATA
// ============================================

// Menyimpan seluruh data dari API
let asmaList = [];

// Menyimpan hasil pencarian
let filteredNames = [];

// Menyimpan posisi nama pada modal slide
let currentDetailIndex = 0;


// ============================================
// 4. TERJEMAHAN BAHASA INDONESIA
// ============================================

// Terjemahan disimpan berdasarkan nomor nama.
// Data ini merupakan padanan lokal,
// bukan data yang dikirim oleh API AlAdhan.

const artiIndonesia = {
    1: "Yang Maha Pengasih",
    2: "Yang Maha Penyayang",
    3: "Yang Maha Merajai",
    4: "Yang Maha Suci",
    5: "Yang Maha Memberi Keselamatan",
    6: "Yang Maha Memberi Keamanan",
    7: "Yang Maha Memelihara",
    8: "Yang Maha Perkasa",
    9: "Yang Maha Kuasa",
    10: "Yang Maha Memiliki Segala Keagungan",
    11: "Yang Maha Pencipta",
    12: "Yang Maha Mengadakan",
    13: "Yang Maha Membentuk Rupa",
    14: "Yang Maha Pengampun",
    15: "Yang Maha Menundukkan",
    16: "Yang Maha Pemberi Karunia",
    17: "Yang Maha Pemberi Rezeki",
    18: "Yang Maha Pembuka Rahmat",
    19: "Yang Maha Mengetahui",
    20: "Yang Maha Menyempitkan",
    21: "Yang Maha Melapangkan",
    22: "Yang Maha Merendahkan",
    23: "Yang Maha Meninggikan",
    24: "Yang Maha Memuliakan",
    25: "Yang Maha Menghinakan",
    26: "Yang Maha Mendengar",
    27: "Yang Maha Melihat",
    28: "Yang Maha Menetapkan",
    29: "Yang Maha Adil",
    30: "Yang Maha Lembut",
    31: "Yang Maha Mengetahui Segala Rahasia",
    32: "Yang Maha Penyantun",
    33: "Yang Maha Agung",
    34: "Yang Maha Pengampun",
    35: "Yang Maha Membalas Kebaikan",
    36: "Yang Maha Tinggi",
    37: "Yang Maha Besar",
    38: "Yang Maha Memelihara",
    39: "Yang Maha Pemberi Kecukupan",
    40: "Yang Maha Membuat Perhitungan",
    41: "Yang Maha Luhur",
    42: "Yang Maha Pemurah",
    43: "Yang Maha Mengawasi",
    44: "Yang Maha Mengabulkan",
    45: "Yang Maha Luas",
    46: "Yang Maha Bijaksana",
    47: "Yang Maha Mengasihi",
    48: "Yang Maha Mulia",
    49: "Yang Maha Membangkitkan",
    50: "Yang Maha Menyaksikan",
    51: "Yang Maha Benar",
    52: "Yang Maha Memelihara",
    53: "Yang Maha Kuat",
    54: "Yang Maha Kokoh",
    55: "Yang Maha Melindungi",
    56: "Yang Maha Terpuji",
    57: "Yang Maha Menghitung",
    58: "Yang Maha Memulai",
    59: "Yang Maha Mengembalikan",
    60: "Yang Maha Menghidupkan",
    61: "Yang Maha Mematikan",
    62: "Yang Maha Hidup",
    63: "Yang Maha Mandiri",
    64: "Yang Maha Menemukan",
    65: "Yang Maha Mulia",
    66: "Yang Maha Esa",
    67: "Yang Maha Tunggal",
    68: "Yang Maha Dibutuhkan",
    69: "Yang Maha Berkuasa",
    70: "Yang Maha Menentukan",
    71: "Yang Maha Mendahulukan",
    72: "Yang Maha Mengakhirkan",
    73: "Yang Maha Awal",
    74: "Yang Maha Akhir",
    75: "Yang Maha Nyata",
    76: "Yang Maha Tersembunyi",
    77: "Yang Maha Memerintah",
    78: "Yang Maha Tinggi",
    79: "Yang Maha Berbuat Baik",
    80: "Yang Maha Penerima Tobat",
    81: "Yang Maha Pemberi Balasan",
    82: "Yang Maha Pemaaf",
    83: "Yang Maha Pengasih",
    84: "Yang Maha Pemilik Kerajaan",
    85: "Yang Maha Pemilik Kebesaran dan Kemuliaan",
    86: "Yang Maha Adil",
    87: "Yang Maha Mengumpulkan",
    88: "Yang Maha Kaya",
    89: "Yang Maha Pemberi Kekayaan",
    90: "Yang Maha Mencegah",
    91: "Yang Maha Memberi Mudharat",
    92: "Yang Maha Memberi Manfaat",
    93: "Yang Maha Bercahaya",
    94: "Yang Maha Pemberi Petunjuk",
    95: "Yang Maha Pencipta Keindahan",
    96: "Yang Maha Kekal",
    97: "Yang Maha Mewarisi",
    98: "Yang Maha Membimbing",
    99: "Yang Maha Sabar"
};


// ============================================
// 5. MENGAMBIL ARTI SESUAI BAHASA
// ============================================

function getMeaning(asma) {

    const language = languageSelect.value;

    if (language === "id") {

        return artiIndonesia[asma.number] ||
            "Terjemahan belum tersedia";

    }

    return asma.en.meaning;
}


// ============================================
// 6. MENGAMBIL DATA DARI API
// ============================================

async function getAsmaulHusna() {

    loading.hidden = false;
    errorMessage.hidden = true;

    asmaContainer.innerHTML = "";

    document.getElementById("apiStatus")
        .textContent = "Menghubungkan API...";

    try {

        // Mengirim permintaan ke API AlAdhan
        const response = await fetch(API_URL);

        // Memeriksa respons server
        if (!response.ok) {
            throw new Error("Respons server tidak berhasil");
        }

        // Mengubah respons menjadi JSON
        const result = await response.json();

        // Memastikan data tersedia
        if (
            result.code !== 200 ||
            !Array.isArray(result.data)
        ) {
            throw new Error("Format data API tidak sesuai");
        }

        // Menyimpan data Asmaul Husna
        asmaList = result.data;

        // Mengurutkan data berdasarkan nomor
        asmaList.sort((a, b) => a.number - b.number);

        // Memastikan setiap data memiliki informasi yang dibutuhkan
        if (
            asmaList.length === 0 ||
            asmaList.some(asma =>
                !Number.isFinite(asma.number) ||
                typeof asma.name !== "string" ||
                typeof asma.transliteration !== "string" ||
                typeof asma.en?.meaning !== "string"
            )
        ) {
            throw new Error("Data Asmaul Husna tidak lengkap");
        }

        // Menyimpan data untuk ditampilkan
        filteredNames = [...asmaList];

        // Menampilkan jumlah data
        document.getElementById("totalData")
            .textContent = asmaList.length;

        // Menampilkan status API
        document.getElementById("apiStatus")
            .textContent = "API Terhubung";

        // Menampilkan seluruh nama
        displayAsma(filteredNames);

    } catch (error) {

        console.error("Kesalahan API:", error);

        errorMessage.hidden = false;

        document.getElementById("apiStatus")
            .textContent = "API Tidak Terhubung";

    } finally {

        loading.hidden = true;

    }

}


// ============================================
// 7. MENAMPILKAN GRID ASMAUL HUSNA
// ============================================

function displayAsma(data) {

    // Menghapus tampilan sebelumnya
    asmaContainer.innerHTML = "";

    // Memperbarui jumlah hasil
    document.getElementById("resultCount")
        .textContent =
        `Menampilkan ${data.length} dari ${asmaList.length} nama`;

    // Jika data kosong
    if (data.length === 0) {

        const emptyMessage =
            document.createElement("p");

        emptyMessage.className = "empty-message";

        emptyMessage.textContent =
            "Nama Asmaul Husna tidak ditemukan.";

        asmaContainer.appendChild(emptyMessage);

        return;
    }


    // Membuat kartu untuk setiap nama
    data.forEach((asma, index) => {

        const card =
            document.createElement("button");

        card.type = "button";

        card.className = "asma-card";

        card.setAttribute(
            "aria-label",
            `Lihat detail ${asma.transliteration}`
        );


        // Bagian atas kartu
        const cardTop =
            document.createElement("div");

        cardTop.className = "card-top";


        const number =
            document.createElement("span");

        number.className = "card-number";

        number.textContent = asma.number;


        const symbol =
            document.createElement("span");

        symbol.className = "card-symbol";

        symbol.textContent = "✦";


        cardTop.append(number, symbol);


        // Tulisan Arab
        const arabic =
            document.createElement("div");

        arabic.className = "card-arabic";

        arabic.textContent = asma.name;


        // Tulisan latin
        const latin =
            document.createElement("div");

        latin.className = "card-latin";

        latin.textContent = asma.transliteration;


        // Arti sesuai bahasa
        const meaning =
            document.createElement("div");

        meaning.className = "card-meaning";

        meaning.textContent = getMeaning(asma);


        // Keterangan detail
        const detail =
            document.createElement("div");

        detail.className = "card-detail";

        detail.textContent = "Lihat detail →";


        // Menggabungkan semua elemen
        card.append(
            cardTop,
            arabic,
            latin,
            meaning,
            detail
        );


        // Membuka modal ketika kartu diklik
        card.addEventListener("click", () => {

            // Menyimpan hasil pencarian sebagai daftar slide
            filteredNames = data;

            openDetail(index);

        });


        asmaContainer.appendChild(card);

    });

}


// ============================================
// 8. FITUR PENCARIAN
// ============================================

function searchAsma() {

    const keyword =
        searchInput.value.trim().toLowerCase();


    // Mencari berdasarkan nomor, Arab, latin,
    // arti Indonesia, dan arti Inggris
    filteredNames = asmaList.filter(asma => {

        const number =
            asma.number.toString();

        const arabic =
            asma.name.toLowerCase();

        const latin =
            asma.transliteration.toLowerCase();

        const english =
            asma.en.meaning.toLowerCase();

        const indonesia =
            (artiIndonesia[asma.number] || "")
                .toLowerCase();


        return (
            number.includes(keyword) ||
            arabic.includes(keyword) ||
            latin.includes(keyword) ||
            english.includes(keyword) ||
            indonesia.includes(keyword)
        );

    });


    // Menampilkan hasil pencarian
    displayAsma(filteredNames);

}


// ============================================
// 9. MEMBUKA DETAIL / SLIDE
// ============================================

function openDetail(index) {

    if (
        index < 0 ||
        index >= filteredNames.length
    ) {
        return;
    }

    currentDetailIndex = index;

    renderDetail();

    // Menampilkan modal
    detailModal.hidden = false;

    // Mengunci scroll halaman di belakang modal
    document.body.style.overflow = "hidden";

    closeModal.focus();

}


// ============================================
// 10. MENAMPILKAN ISI DETAIL
// ============================================

function renderDetail() {

    const asma =
        filteredNames[currentDetailIndex];

    if (!asma) {
        return;
    }


    // Nomor nama
    document.getElementById("detailNumber")
        .textContent =
        `NAMA KE-${String(asma.number).padStart(2, "0")}`;


    // Tulisan Arab
    document.getElementById("detailArabic")
        .textContent = asma.name;


    // Transliterasi
    document.getElementById("detailLatin")
        .textContent = asma.transliteration;


    // Arti sesuai pilihan bahasa
    document.getElementById("detailMeaning")
        .textContent = getMeaning(asma);


    // Keterangan bahasa
    document.getElementById("detailLanguage")
        .textContent =
        languageSelect.value === "id"
            ? "Bahasa Indonesia"
            : "English";


    // Nomor posisi slide
    document.getElementById("slideNumber")
        .textContent =
        `${currentDetailIndex + 1} / ${filteredNames.length}`;


    // Mengatur tombol sebelumnya
    prevButton.disabled =
        currentDetailIndex === 0;


    // Mengatur tombol selanjutnya
    nextButton.disabled =
        currentDetailIndex === filteredNames.length - 1;

}


// ============================================
// 11. SLIDE SELANJUTNYA
// ============================================

function nextSlide() {

    if (
        currentDetailIndex <
        filteredNames.length - 1
    ) {

        currentDetailIndex++;

        renderDetail();

    }

}


// ============================================
// 12. SLIDE SEBELUMNYA
// ============================================

function prevSlide() {

    if (currentDetailIndex > 0) {

        currentDetailIndex--;

        renderDetail();

    }

}


// ============================================
// 13. MENUTUP MODAL
// ============================================

function closeDetail() {

    detailModal.hidden = true;

    // Mengembalikan scroll halaman
    document.body.style.overflow = "";

}


// ============================================
// 14. MENGGANTI BAHASA
// ============================================

function changeLanguage() {

    // Memperbarui seluruh kartu
    displayAsma(filteredNames);

    // Jika modal sedang terbuka,
    // arti pada detail juga diperbarui
    if (!detailModal.hidden) {

        renderDetail();

    }

}


// ============================================
// 15. EVENT LISTENER
// ============================================


// Pencarian ketika pengguna mengetik
searchInput.addEventListener(
    "input",
    searchAsma
);


// Menghapus pencarian
clearSearch.addEventListener("click", () => {

    searchInput.value = "";

    searchAsma();

    searchInput.focus();

});


// Mengganti bahasa
languageSelect.addEventListener(
    "change",
    changeLanguage
);


// Tombol slide selanjutnya
nextButton.addEventListener(
    "click",
    nextSlide
);


// Tombol slide sebelumnya
prevButton.addEventListener(
    "click",
    prevSlide
);


// Tombol tutup modal
closeModal.addEventListener(
    "click",
    closeDetail
);


// Menutup modal ketika area luar diklik
detailModal.addEventListener("click", event => {

    if (event.target === detailModal) {

        closeDetail();

    }

});


// Navigasi menggunakan keyboard
document.addEventListener("keydown", event => {

    if (detailModal.hidden) {
        return;
    }

    if (event.key === "Escape") {
        closeDetail();
    }

    if (event.key === "ArrowRight") {
        nextSlide();
    }

    if (event.key === "ArrowLeft") {
        prevSlide();
    }

});


// Tombol mencoba kembali jika API gagal
retryButton.addEventListener(
    "click",
    getAsmaulHusna
);


// ============================================
// 16. MENJALANKAN APLIKASI
// ============================================

// Mengambil data ketika halaman dibuka
getAsmaulHusna();
