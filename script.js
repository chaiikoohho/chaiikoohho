// URL ของ Google Sheets API
var sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQhEKq2q6Y2HQYuzSvlzvKhzXY9H2w4-LH1C-P7rcX_UeZlbkBr1-sY11Q5g5LBkLK9XotnFLrx7jp2/pub?output=csv';

// ฟังก์ชันสำหรับดึงข้อมูลจาก Google Sheets
function fetchSeriesData() {
  fetch(sheetUrl)
    .then(response => response.text()) // แปลงเป็น text (CSV)
    .then(data => {
      var rows = data.split("\n"); // แยกแต่ละแถว
      var seriesList = document.getElementById('series-list'); // หาตัวแสดงผล

      // ลูปผ่านทุกแถวในข้อมูล
      rows.forEach(row => {
        var columns = row.split(","); // แยกข้อมูลในแต่ละคอลัมน์
        if(columns.length < 5) return; // ถ้าข้อมูลไม่ครบก็ข้ามแถวนี้

        var seriesName = columns[0];  // ชื่อซีรีส์
        var posterUrl = columns[1];   // URL ของโปสเตอร์
        var season = columns[2];      // ซีซั่น
        var episode = columns[3];     // ตอน
        var url = columns[4];         // URL สำหรับเปิดดูตอน

        // สร้าง HTML ของซีรีส์
        var seriesItem = document.createElement('div');
        seriesItem.classList.add('series-item');
        seriesItem.innerHTML = `
          <img src="${posterUrl}" alt="${seriesName}" />
          <h3>${seriesName}</h3>
          <a class="episode-button" href="${url}" target="_blank">
            Episode ${episode}
          </a>
        `;
        
        seriesList.appendChild(seriesItem); // เพิ่มรายการซีรีส์ใน container
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

// เรียกใช้ฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
window.onload = fetchSeriesData;
