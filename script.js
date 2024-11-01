document.getElementById('ageForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah refresh halaman

    const birthdate = new Date(document.getElementById('birthdate').value);
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    
    // Memastikan usia minimal 18 tahun
    if (age > 18 || (age === 18 && monthDiff >= 0)) {
        // Tampilkan konten utama jika usia memenuhi syarat
        document.getElementById('ageVerification').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
    } else {
        alert('Anda harus berusia 18 tahun atau lebih untuk mengakses situs ini.');
        // Redirect ke halaman lain atau tutup
        window.location.href = "https://www.google.com"; // Redirect ke Google atau halaman lain
    }
});
