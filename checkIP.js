const fs = require('fs');
const fetch = require('node-fetch'); // Menggunakan node-fetch untuk HTTP requests

async function checkIP(ip, port) {
    const proxyApiUrl = `https://p01--boiling-frame--kw6dd7bjv2nr.code.run/check?ip=${ip}&host=speed.cloudflare.com&port=${port}&tls=true`;

    try {
        const proxyApiResponse = await fetch(proxyApiUrl);
        const proxyApiData = await proxyApiResponse.json();
        const proxyStatus = proxyApiData.proxyip ? '✔ AKTIF ✔' : '✘ DEAD ✘';
        const warpStatus = proxyApiData.warp ? '✔ ON ✔' : '✘ OFF ✘';
        
        return { ip, port, proxyStatus, warpStatus };
    } catch (error) {
        console.error(`Failed to fetch status for IP ${ip}:${port}:`, error);
        return { ip, port, proxyStatus: '✘ DEAD ✘', warpStatus: '✘ OFF ✘' };
    }
}

async function processIPList() {
    const ipListFile = 'ip_list.txt';

    // Membaca file IP dan port
    fs.readFile(ipListFile, 'utf8', async (err, data) => {
        if (err) {
            console.error("Error reading IP list:", err);
            return;
        }

        const ipList = data.split('\n').filter(line => line.trim() !== '');
        for (const line of ipList) {
            const [ip, port] = line.split(':');
            const result = await checkIP(ip.trim(), port.trim());
            console.log(result);
        }
    });
}

processIPList();
