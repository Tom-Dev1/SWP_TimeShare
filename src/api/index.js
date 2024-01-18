// Định nghĩa URL của API
const apiUrl = "https://your-api-url.com";

// Hàm gửi yêu cầu GET đến API
async function fetchData() {
  try {
    const response = await fetch(`${apiUrl}/data`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Lỗi khi gửi yêu cầu API:", error);
    throw error;
  }
}

export { fetchData };
