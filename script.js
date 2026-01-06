// DATABASE MEMBER
const members = {
    'deka': {
        name: "Deka Sonjaya",
        photo: "foto-deka.jpg",
        wa: "6285524444037"
    },
    'ina': {
        name: "Ina Garnia",
        photo: "foto-ina.jpg",
        wa: "6282295683474"
    },
    'martin': {
        name: "Marthyn",
        photo: "foto-martin.jpg",
        wa: "6281394675623"
    },
    'omi': {
        name: "Tomi Irwandy",
        photo: "foto-omi.jpg",
        wa: "6283194535211"
    },
    'mey': {
        name: "Siti Meiniwati",
        photo: "foto-mey.jpg",
        wa: "628987085958"
    },
    'dani': {
        name: "M. Dhani Kurniawan",
        photo: "foto-dani.jpg",
        wa:"6281322730596"
    },
    'yan': {
        name: "Yana Daryana",
        photo: "foto-yan.jpg",
        wa: "6285656791002"
    },
    'dikdik': {
        name: "Dikdik Mulyana",
        photo: "foto-dikdik.jpg",
        wa: "6285282619898"
    },
    'pandu': {
        name: "Pandu Rinata",
        photo: "foto-pandu.jpg",
        wa: "6285797817050"
    },
    'fakhri': {
        name: "M. Fakhri Rizki",
        photo: "foto-fakhri.jpg",
        wa: "6285524444037"
    },
    'rexi': {
        name: "Rexi Gustiawan",
        photo: "foto-rexi.jpg",
        wa: "6281218878025"
    },
    'oki': {
        name: "Oki Hendrawan",
        photo: "foto-oki.jpg",
        wa: "6282115586827"
    },
    'anis': {
        name: "Anis Abiba",
        photo: "foto-anis.jpg",
        wa: "6282129169198"
    },
    'silma': {
        name: "Silma Almaida",
        photo: "foto-silma.jpg",
        wa: "6283169949205"
    },
    'zilla': {
        name: "Fazrilla NQ",
        photo: "foto-zilla.jpg",
        wa: "6285723419799"
    },
};

const defaultData = {
    name: "DV TEAM NP",
    photo: " ",
    wa: "6285524444037"
};

function loadMemberData() {
    // 1. Cek Link URL (Apakah ada ?ref=...)
    const urlParams = new URLSearchParams(window.location.search);
    let refCode = urlParams.get('ref');

    // 2. LOGIKA MEMORI (PENTING UNTUK APLIKASI)
    if (refCode) {
        // Jika link dibuka pakai ?ref=deka, SIMPAN ke memori HP
        localStorage.setItem('saved_member', refCode);
    } else {
        // Jika link dibuka polos (dari Aplikasi), AMBIL dari memori HP
        refCode = localStorage.getItem('saved_member');
    }
    
    // 3. Tampilkan Data
    let data = members[refCode] || defaultData;

    document.getElementById('member-name').textContent = data.name;
    
    const imgElement = document.getElementById('member-photo');
    imgElement.src = data.photo;
    imgElement.onerror = function() { this.src = 'logo.png'; };

    const message = `Halo Kak ${data.name}, saya tertarik info bisnis DV NP.`;
    document.getElementById('cta-wa').href = `https://wa.me/${data.wa}?text=${encodeURIComponent(message)}`;
    
    document.title = `${data.name} - Official Partner`;
}

function shareProfile() {
    // Saat share, pastikan linknya selalu lengkap dengan ref
    let refCode = localStorage.getItem('saved_member');
    let shareUrl = window.location.href.split('?')[0]; // Ambil link dasar
    
    if(refCode) {
        shareUrl += `?ref=${refCode}`;
    }

    if (navigator.share) {
        navigator.share({
            title: 'CardName Profile',
            text: 'Cek profil bisnis digital saya:',
            url: shareUrl
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(shareUrl).then(() => {
            const toast = document.getElementById("toast");
            toast.className = "toast show";
            setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
        });
    }
}

window.onload = loadMemberData;
