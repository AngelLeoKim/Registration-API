document.addEventListener('DOMContentLoaded', () => {
    const regionSelect = document.getElementById('region');
    const provinceSelect = document.getElementById('province');
    const citySelect = document.getElementById('city');
    const barangaySelect = document.getElementById('barangay');
    const form = document.getElementById('registerForm');

    // Fetch and populate regions
    fetch('https://psgc.cloud/api/regions')
        .then(response => response.json())
        .then(data => {
            regionSelect.innerHTML = '<option value="">Select Region</option>';
            data.forEach(region => {
                regionSelect.innerHTML += `<option value="${region.code}">${region.name}</option>`;
            });
        });

    // Populate provinces when a region is selected
    regionSelect.addEventListener('change', () => {
        const regionCode = regionSelect.value;
        provinceSelect.innerHTML = '<option value="">Select Province</option>';
        citySelect.innerHTML = '<option value="">Select City/Municipality</option>';
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
        
        if (regionCode) {
            fetch(`https://psgc.cloud/api/regions/${regionCode}/provinces`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(province => {
                        provinceSelect.innerHTML += `<option value="${province.code}">${province.name}</option>`;
                    });
                });
        }
    });

    // Populate cities/municipalities when a province is selected
    provinceSelect.addEventListener('change', () => {
        const provinceCode = provinceSelect.value;
        citySelect.innerHTML = '<option value="">Select City/Municipality</option>';
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

        if (provinceCode) {
            fetch(`https://psgc.cloud/api/provinces/${provinceCode}/cities-municipalities`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(city => {
                        citySelect.innerHTML += `<option value="${city.code}">${city.name}</option>`;
                    });
                });
        }
    });

    // Populate barangays when a city/municipality is selected
    citySelect.addEventListener('change', () => {
        const cityCode = citySelect.value;
        barangaySelect.innerHTML = '<option value="">Select Barangay</option>';

        if (cityCode) {
            fetch(`https://psgc.cloud/api/cities/${cityCode}/barangays`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(barangay => {
                        barangaySelect.innerHTML += `<option value="${barangay.code}">${barangay.name}</option>`;
                    });
                });
        }
    });

    // Form validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
        } else if (form.checkValidity()) {
            alert('Registered Successfully.');
        } else {
            alert('Please fill out all required fields.');
        }
    });
});
