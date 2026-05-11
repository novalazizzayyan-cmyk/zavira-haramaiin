/* ============================================
   SCRIPT.JS - Zavira Haramain
   ============================================
   JavaScript murni tanpa library.
   Kode disusun sederhana agar mudah dipelajari.
   ============================================ */


// ============================================
// Tunggu sampai seluruh HTML selesai dimuat
// ============================================
document.addEventListener("DOMContentLoaded", function () {


    // ============================================
    // 1. HAMBURGER MENU (Mobile)
    // Membuka dan menutup menu di tampilan mobile
    // ============================================
    var hamburger = document.getElementById("hamburger");
    var navLinks = document.getElementById("navLinks");
    var navOverlay = document.getElementById("navOverlay");

    // Fungsi buka/tutup menu
    function toggleMenu() {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
        navOverlay.classList.toggle("active");
        // Mencegah scroll saat menu terbuka
        if (navLinks.classList.contains("active")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }

    // Fungsi menutup menu
    function closeMenu() {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
        navOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    // Event: klik tombol hamburger
    hamburger.addEventListener("click", toggleMenu);

    // Event: klik overlay gelap untuk menutup
    navOverlay.addEventListener("click", closeMenu);

    // Event: klik link di menu, lalu tutup menu
    var semuaLink = navLinks.querySelectorAll("a");
    for (var i = 0; i < semuaLink.length; i++) {
        semuaLink[i].addEventListener("click", closeMenu);
    }


    // ============================================
    // 2. SMOOTH SCROLL
    // Scroll halus saat link navigasi diklik,
    // dengan memperhitungkan tinggi navbar
    // ============================================
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    for (var j = 0; j < anchorLinks.length; j++) {
        anchorLinks[j].addEventListener("click", function (e) {
            var tujuanId = this.getAttribute("href");
            if (tujuanId === "#") return;

            var tujuanElemen = document.querySelector(tujuanId);
            if (tujuanElemen) {
                e.preventDefault();
                var navbarTinggi = document.getElementById("navbar").offsetHeight;
                var posisi = tujuanElemen.offsetTop - navbarTinggi;

                window.scrollTo({
                    top: posisi,
                    behavior: "smooth"
                });
            }
        });
    }


    // ============================================
    // 3. NAVBAR SCROLL EFFECT
    // Menambahkan shadow saat halaman di-scroll
    // ============================================
    var navbar = document.getElementById("navbar");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });


    // ============================================
    // 4. ANIMASI SCROLL (Fade-in)
    // Menggunakan IntersectionObserver untuk
    // mendeteksi elemen yang masuk ke layar
    // ============================================
    var elemenAnimasi = document.querySelectorAll(".animasi-scroll");

    // IntersectionObserver memantau elemen yang terlihat
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Tambahkan class "tampil" untuk memicu animasi
                entry.target.classList.add("tampil");
                // Berhenti memantau setelah animasi dimainkan
                observer.unobserve(entry.target);
            }
        });
    }, {
        // Elemen dianggap terlihat jika 15% masuk layar
        threshold: 0.15
    });

    // Mulai memantau setiap elemen
    for (var k = 0; k < elemenAnimasi.length; k++) {
        observer.observe(elemenAnimasi[k]);
    }


    // ============================================
    // 5. ACTIVE LINK NAVBAR
    // Menandai link navbar sesuai section yang
    // sedang dilihat pengunjung
    // ============================================
    var semuaSection = document.querySelectorAll("section[id]");
    var navLinkItems = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", function () {
        var scrollPos = window.scrollY + 120;

        for (var m = 0; m < semuaSection.length; m++) {
            var sectionTop = semuaSection[m].offsetTop - 80;
            var sectionBottom = sectionTop + semuaSection[m].offsetHeight;
            var sectionId = semuaSection[m].getAttribute("id");

            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                for (var n = 0; n < navLinkItems.length; n++) {
                    navLinkItems[n].classList.remove("active");
                    if (navLinkItems[n].getAttribute("href") === "#" + sectionId) {
                        navLinkItems[n].classList.add("active");
                    }
                }
            }
        }
    });

}); // Akhir DOMContentLoaded


// ============================================
// 6. FALLBACK GAMBAR
// Dipanggil saat gambar gagal dimuat
// (ditempel di onerror pada tag <img>)
// ============================================
function handleImageError(img) {
    img.style.display = "none";
    var fallback = document.createElement("div");
    fallback.className = "img-fallback";
    fallback.innerHTML = '<span class="img-fallback-icon">&#128444;&#65039;</span>Gambar belum ditambahkan';
    img.parentNode.insertBefore(fallback, img);
}